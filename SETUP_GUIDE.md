# CI/CD Setup Guide - CSC11004

## 📋 Mục lục
1. [Tổng quan](#1-tổng-quan)
2. [Cấu hình Git](#2-cấu-hình-git)
3. [Cấu hình GitHub](#3-cấu-hình-github)
4. [Cấu hình Jenkins](#4-cấu-hình-jenkins)
5. [Cấu hình Docker](#5-cấu-hình-docker)
6. [Kết nối Jenkins & Docker](#6-kết-nối-jenkins--docker)

---

## 1. Tổng quan

Pipeline CI/CD này thực hiện:
```
Code Push → Jenkins Build → Test → Docker Deploy
```

**Công nghệ sử dụng:**
- **Git**: Version control
- **GitHub**: Remote repository
- **Jenkins**: CI/CD server (chạy trong Docker)
- **Docker**: Containerization

---

## 2. Cấu hình Git

### 2.1. Cài đặt Git
```bash
# Windows: Download từ https://git-scm.com/download/win
# Sau khi cài, mở terminal và kiểm tra:
git --version
```

### 2.2. Cấu hình user
```bash
# Thay MSSV bằng mã số sinh viên của bạn
git config --global user.name "MSSV"
git config --global user.email "MSSV@student.hcmus.edu.vn"
```

### 2.3. Khởi tạo repository
```bash
cd MMT_CICD
git init
git add .
git commit -m "Initial commit"
```

---

## 3. Cấu hình GitHub

### 3.1. Tạo repository
1. Đăng nhập GitHub với username là **MSSV**
2. Click **New repository**
3. Đặt tên: `MMT_CICD`
4. Chọn **Private**
5. Click **Create repository**

### 3.2. Push code lên GitHub
```bash
git remote add origin https://github.com/DuyHieu251005/CICD_MMT_Project3.git
git branch -M main
git push -u origin main
```

### 3.3. Tạo Personal Access Token (cho Jenkins)
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token (classic)**
3. Chọn scope: `repo` (full control)
4. Copy token và lưu lại để dùng trong Jenkins

---

## 4. Cấu hình Jenkins

### 4.1. Khởi động Jenkins
```bash
# Chạy trong thư mục project
docker-compose -f jenkins-compose.yml up -d
```

### 4.2. Lấy mật khẩu admin
```bash
docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword
```

### 4.3. Thiết lập Jenkins
1. Truy cập: `http://localhost:8080`
2. Nhập mật khẩu từ bước 4.2
3. Chọn **Install suggested plugins**
4. Tạo admin user với username là **MSSV**

### 4.4. Cài đặt plugins bổ sung
1. **Manage Jenkins** → **Plugins** → **Available plugins**
2. Tìm và cài đặt:
   - Docker Pipeline
   - GitHub Integration
   - Blue Ocean (optional - UI đẹp hơn)

### 4.5. Tạo Pipeline Job
1. **New Item** → Nhập tên: `MSSV-CICD-Pipeline`
2. Chọn **Pipeline** → OK
3. Trong phần **Pipeline**:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/DuyHieu251005/CICD_MMT_Project3.git`
   - Credentials: Thêm GitHub credentials (username + token)
   - Branch: `*/main`
4. Click **Save**

---

## 5. Cấu hình Docker

### 5.1. Kiểm tra Docker
```bash
docker --version
docker info
```

### 5.2. Build image thủ công (để test)
```bash
cd src
docker build -t cicd-demo-app:test .
```

### 5.3. Chạy container
```bash
docker run -d -p 3000:3000 --name test-app cicd-demo-app:test
```

### 5.4. Kiểm tra
```bash
# Truy cập http://localhost:3000
curl http://localhost:3000
```

### 5.5. Dọn dẹp
```bash
docker stop test-app && docker rm test-app
```

---

## 6. Kết nối Jenkins & Docker

### 6.1. Cấu hình Docker trong Jenkins
File `jenkins-compose.yml` đã mount Docker socket:
```yaml
volumes:
  - /var/run/docker.sock:/var/run/docker.sock
  - /usr/bin/docker:/usr/bin/docker
```

Điều này cho phép Jenkins container gọi Docker commands của host.

### 6.2. Chạy Pipeline
1. Trong Jenkins, vào job đã tạo
2. Click **Build Now**
3. Xem logs tại **Console Output**

### 6.3. Kiểm tra kết quả
Sau khi pipeline chạy thành công:
```bash
# Kiểm tra container đang chạy
docker ps

# Truy cập ứng dụng
curl http://localhost:3000
```

---

## 📝 Lưu ý quan trọng

> [!WARNING]
> **Trên Windows**, bạn cần dùng **Docker Desktop** và bật **WSL 2 integration**.

> [!TIP]
> Nếu gặp lỗi permission với Docker socket, chạy:
> ```bash
> docker exec -u root jenkins-cicd chmod 666 /var/run/docker.sock
> ```

---

## ✅ Checklist hoàn thành

- [ ] Git đã cấu hình với MSSV
- [ ] GitHub repo đã tạo và push code
- [ ] Jenkins đang chạy tại localhost:8080
- [ ] Pipeline job đã tạo và kết nối với GitHub
- [ ] Pipeline chạy thành công (Build → Test → Deploy)
- [ ] Ứng dụng truy cập được tại localhost:3000
