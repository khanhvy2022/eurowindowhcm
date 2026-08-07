# Download all images from eurowindow.biz for articles
$baseDir = "F:\Nextjs\eurowindowhcm\public\articles"

# Project images
$projectImages = @{
    "du-an/nha-quoc-hoi" = @(
        @{ url = "https://sudospaces.com/eurowindow/2022/07/mg-1220-large.jpg"; name = "hero.jpg" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/dsc5755.jpg.webp"; name = "detail-1.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/dsc5767.jpg.webp"; name = "detail-2.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/dsc5733.jpg.webp"; name = "detail-3.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/img-3596.jpg.webp"; name = "detail-4.webp" }
    )
    "du-an/tru-so-bo-ngoai-giao" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/20191030-tru-so-bo-ngoai-giao-0719.jpg.webp"; name = "hero.webp" }
    )
    "du-an/benh-vien-viet-phap-ha-noi" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/img-7105-medium.jpg.webp"; name = "hero.webp" }
    )
    "du-an/benh-vien-ung-buou-da-nang" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/benh-vien-ung-buou-da-nang-17-medium.jpg.webp"; name = "hero.webp" }
    )
    "du-an/benh-vien-nhi-dong-tp-ho-chi-minh" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/dji-0090-1-medium.jpg.webp"; name = "hero.webp" }
    )
    "du-an/cang-hang-khong-phu-bai-hue" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2025/02/viber-image-2025-02-05-13-33-24-065-medium.png.webp"; name = "hero.webp" }
    )
    "du-an/cang-hang-khong-quoc-te-can-tho" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/san-bay-can-tho.jpg.webp"; name = "hero.webp" }
    )
    "du-an/cang-hang-khong-quoc-te-van-don" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/san-bay-van-don.jpg.webp"; name = "hero.webp" }
    )
    "du-an/toa-nha-van-phong-chinh-phu" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/20190612-hanoi-cityscape-7928.jpg.webp"; name = "hero.webp" }
    )
    "du-an/tru-so-bo-cong-an" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/toa-nha-bo-cong-an.jpg.webp"; name = "hero.webp" }
    )
    "du-an/tru-so-van-phong-vksnd-toi-cao" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/w400/20191115-vien-kiem-soat-nhan-dan-toi-cao-0038.jpg.webp"; name = "hero.webp" }
    )
    "du-an/trung-tam-truyen-hinh-thong-tan-xa" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/img-7172-medium.jpg.webp"; name = "hero.webp" }
    )
}

# Product images - unique hero images per product
$productImages = @{
    "san-pham/cua-di-nhom" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2021/12/1-7-medium.jpg.webp"; name = "hero.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/04/3-medium.jpg.webp"; name = "detail-1.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/03/cuadi2canhmoquayngoai-medium.jpg.webp"; name = "detail-2.webp" }
    )
    "san-pham/cua-so-nhom" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2026/07/cua-so-nhom-eurowindow-ben-chac-khong-cong-venh-ben-mau-theo-thoi-gian-large.jpg.webp"; name = "hero.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2026/07/cua-so-nhom-co-cau-cach-nhiet-ket-hop-kinh-hop-cho-kha-nang-cach-am-tot-large.jpg.webp"; name = "detail-1.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2026/07/cua-so-nhom-cach-nhiet-giup-giam-tai-dieu-hoa-va-tiet-kiem-dien-large.jpg.webp"; name = "detail-2.webp" }
    )
    "san-pham/vach-kinh-nhom" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2021/12/vachstick-medium.jpg.webp"; name = "hero.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2021/12/vachnhom-medium.jpg.webp"; name = "detail-1.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2021/12/vachsemiunitized-medium.jpg.webp"; name = "detail-2.webp" }
    )
    "san-pham/cua-upvc" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/05/cuadinhua1-medium.jpg.webp"; name = "hero.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/05/cuanhua-medium.jpg.webp"; name = "detail-1.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/05/cuasonhua-medium.jpg.webp"; name = "detail-2.webp" }
    )
    "san-pham/cua-go-tu-nhien" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2024/10/untitled-1-13-medium.jpg.webp"; name = "hero.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2024/10/untitled-5-11.jpg.webp"; name = "detail-1.webp" },
        @{ url = "https://storage.sudospaces.com/eurowindow/2024/10/untitled-4-12.jpg.webp"; name = "detail-2.webp" }
    )
    "san-pham/cua-go-cong-nghiep" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2024/10/untitled-3-13.jpg.webp"; name = "hero.webp" }
    )
    "san-pham/cua-go-ghep-thanh" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2024/10/untitled-2-12.jpg.webp"; name = "hero.webp" }
    )
}

# News images (use homepage news section images)
$newsImages = @{
    "tin-tuc" = @(
        @{ url = "https://storage.sudospaces.com/eurowindow/2022/07/img-7105-medium.jpg.webp"; name = "default-news.webp" }
    )
}

function Download-Image {
    param($Url, $Path)
    try {
        $dir = Split-Path $Path -Parent
        if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
        if (!(Test-Path $Path)) {
            Invoke-WebRequest -Uri $Url -OutFile $Path -TimeoutSec 15 -ErrorAction Stop
            Write-Host "  Downloaded: $Path"
            return $true
        } else {
            Write-Host "  Exists: $Path"
            return $true
        }
    } catch {
        Write-Host "  FAILED: $Path - $($_.Exception.Message)"
        return $false
    }
}

$success = 0
$failed = 0

# Download project images
foreach ($folder in $projectImages.Keys) {
    Write-Host "`nProject: $folder"
    foreach ($img in $projectImages[$folder]) {
        $path = Join-Path $baseDir "$folder\$($img.name)"
        if (Download-Image -Url $img.url -Path $path) { $success++ } else { $failed++ }
    }
}

# Download product images
foreach ($folder in $productImages.Keys) {
    Write-Host "`nProduct: $folder"
    foreach ($img in $productImages[$folder]) {
        $path = Join-Path $baseDir "$folder\$($img.name)"
        if (Download-Image -Url $img.url -Path $path) { $success++ } else { $failed++ }
    }
}

Write-Host "`n========================================="
Write-Host "Downloaded: $success, Failed: $failed"
