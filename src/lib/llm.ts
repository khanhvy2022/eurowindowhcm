export type LlmProvider = {
  name: string;
  baseUrl: string;
  apiKey: string | undefined;
  model: string;
  headers?: Record<string, string>;
};

/**
 * 5 nhà cung cấp LLM miễn phí, quay vòng khi hết quota / rate-limit.
 * Thứ tự ưu tiên: Groq → Gemini → DeepSeek → Cloudflare AI → GitHub Models.
 */
export function getProviders(): LlmProvider[] {
  const providers: LlmProvider[] = [];

  if (process.env.GROQ_API_KEY) {
    providers.push({
      name: "groq",
      baseUrl: "https://api.groq.com/openai/v1/chat/completions",
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
    });
  }

  if (process.env.GEMINI_API_KEY) {
    providers.push({
      name: "gemini",
      baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-2.5-flash",
    });
  }

  if (process.env.DEEPSEEK_API_KEY) {
    providers.push({
      name: "deepseek",
      baseUrl: "https://api.deepseek.com/v1/chat/completions",
      apiKey: process.env.DEEPSEEK_API_KEY,
      model: "deepseek-chat",
    });
  }

  if (process.env.CLOUDFLARE_AI_KEY && process.env.CLOUDFLARE_ACCOUNT_ID) {
    providers.push({
      name: "cloudflare",
      baseUrl: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1/chat/completions`,
      apiKey: process.env.CLOUDFLARE_AI_KEY,
      model: "@cf/meta/llama-3.1-8b-instruct",
      headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_AI_KEY}` },
    });
  }

  if (process.env.GITHUB_TOKEN) {
    providers.push({
      name: "github",
      baseUrl: "https://models.github.ai/inference/v1/chat/completions",
      apiKey: process.env.GITHUB_TOKEN,
      model: "gpt-4o-mini",
    });
  }

  return providers;
}

async function callProvider(
  provider: LlmProvider,
  messages: { role: string; content: string }[],
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch(provider.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.apiKey}`,
        ...(provider.headers ?? {}),
      },
      body: JSON.stringify({
        model: provider.model,
        messages,
        temperature: 0.4,
        max_tokens: 700,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`[${provider.name}] HTTP ${res.status}`);
    }
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error(`[${provider.name}] empty response`);
    return String(content).trim();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Quay vòng qua các provider miễn phí. Nếu 1 cái lỗi (429/5xx/timeout)
 * thì thử cái kế tiếp. Trả về kết quả + tên provider đã dùng.
 */
export type ChatFn = (system: string, user: string) => Promise<{ content: string; provider: string | null }>;

/**
 * Quay vòng qua các provider miễn phí. Nếu 1 cái lỗi (429/5xx/timeout)
 * thì thử cái kế tiếp. Trả về kết quả + tên provider đã dùng.
 */
export async function chatWithRotation(
  system: string,
  user: string,
): Promise<{ content: string; provider: string | null }> {
  const providers = getProviders();
  if (providers.length === 0) {
    return { content: "", provider: null };
  }
  const errors: string[] = [];
  for (const provider of providers) {
    try {
      const content = await callProvider(provider, [
        { role: "system", content: system },
        { role: "user", content: user },
      ]);
      return { content, provider: provider.name };
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  return {
    content: `Không thể kết nối LLM (${errors.join(" | ")}).`,
    provider: null,
  };
}
