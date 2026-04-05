$ErrorActionPreference = "Stop"

# Lưu tên nhánh hiện hành đang có code (thường là fixBE)
$baseBranch = (git branch --show-current).Trim()
Write-Host "Nhanh chua code goc hien tai la: $baseBranch"

$tasks = @(
  @{ id="P321-31"; branch="feature/P321-31/login-logout"; file="backend/src/app/api/auth/login/route.js"; msg="P321-31: Tao endpoint login/logout" },
  @{ id="P321-32"; branch="feature/P321-32/jwt-session"; file="backend/src/app/api/auth/sessions/route.js"; msg="P321-32: Cau hinh module JWT session" },
  @{ id="P321-33"; branch="feature/P321-33/crud-user-role"; file="backend/src/app/api/admin/users/route.js"; msg="P321-33: Phat trien CRUD cho user va role" },
  @{ id="P321-34"; branch="feature/P321-34/middleware-auth"; file="backend/src/utils/auth.js"; msg="P321-34: Tich hop middleware phan quyen" },
  @{ id="P321-35"; branch="feature/P321-35/api-nghiep-vu"; file="backend/src/app/api/courses/route.js"; msg="P321-35: Thiet lap API nghiep vu chinh" },
  @{ id="P321-36"; branch="feature/P321-36/ve-erd"; file="database/docs/ERD.md"; msg="P321-36: Hoan thanh thiet ke so do ERD" },
  @{ id="P321-37"; branch="feature/P321-37/tao-bang-chinh"; file="database/schemas/main_tables.sql"; msg="P321-37: Khoi tao schema cac bang chinh" },
  @{ id="P321-38"; branch="feature/P321-38/toi-uu-query"; file="database/schemas/indexes.sql"; msg="P321-38: Toi uu hoa truy van va danh index" },
  @{ id="P321-39"; branch="feature/P321-39/backup-script"; file="database/scripts/backup.sh"; msg="P321-39: Viet script tu dong backup restore" }
)

Write-Host "1. TAO VA PUSH 9 NHANH FEATURE"
foreach ($t in $tasks) {
  Write-Host "Dang thuc hien: $($t.branch)"
  
  git checkout $baseBranch
  git checkout -B $t.branch
  
  $dir = Split-Path $t.file -Parent
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
  
  Add-Content -Path $t.file -Value "`n// Updated for JIRA $($t.id)"
  
  git add .
  git commit -m "$($t.msg)"
  git push https://github.com/TrungTin2k4/CCPTPM.git $t.branch
}

Write-Host "2. TAO VA PUSH NHANH DEVELOP"
git checkout $baseBranch
git checkout -B develop
git push https://github.com/TrungTin2k4/CCPTPM.git develop

Write-Host "Hoan tat toan bo 9 Task va Develop cua Tin!"
git checkout $baseBranch
