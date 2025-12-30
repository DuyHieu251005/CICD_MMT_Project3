# Video Configuration Script (Kịch bản quay video)

## 🎯 Mục tiêu
Đạt trọn vẹn điểm số dựa trên thang đánh giá của đồ án.
- Cấu hình Git (2đ)
- Cấu hình Github (1đ)
- Cấu hình Jenkins (2đ)
- Cấu hình Docker (2đ)
- Kết nối Jenkins & Docker (2đ)

---

## 🎬 Kịch bản chi tiết (Storyboard)

### Start Recording (Bắt đầu quay)

### **Phần 1: Giới thiệu & Môi trường (30s)**
1. Mở file `Readme.txt` đã điền đầy đủ thông tin nhóm.
2. Quay màn hình Desktop có folder `MMT_CICD`.
3. Mở Terminal (PowerShell/CMD) tại thư mục đó.
4. Gõ: `docker --version` để chứng minh đã cài Docker (**Điểm Docker**).
5. Gõ: `docker-compose -f jenkins-compose.yml ps` để show container đang chạy.

### **Phần 2: Git & GitHub (1 - 2 phút)**
1. Chuyển sang trình duyệt, mở Repository trên GitHub của bạn.
2. Show thấy code đã được push lên (có file Jenkinsfile, Dockerfile...) (**Điểm GitHub**).
3. Quay lại Terminal, gõ `git remote -v` để chứng minh đã link với repo đó (**Điểm Git**).
4. (Optional) Thực hiện một thay đổi nhỏ trong file `Readme.txt`, sau đó gõ `git add .`, `git commit`, `git push` để chứng minh kết nối hoạt động.

### **Phần 3: Cấu hình Jenkins (QUAN TRỌNG - Quay ngay lúc này)**
*Lưu ý: Đây là phần bạn đang làm dở, hãy quay lại quá trình này.*
1. **Lấy mật khẩu Admin (Chứng minh kỹ năng Docker)**:
    - Mở Terminal đang chạy.
    - Gõ lệnh: `docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword`
    - Copy dòng mã hash hiện ra (ví dụ: `d3c6...`).
2. Mở trình duyệt `localhost:8080`.
3. Paste mật khẩu vào ô Administrator password.
4. Chọn **"Install suggested plugins"** (đoạn này có thể tua nhanh khi edit video).
4. Quay cảnh tạo User Admin đầu tiên (đặt là MSSV).
5. Vào **Manage Jenkins** -> **Plugins** -> Cài đặt **Docker Pipeline** và **Blue Ocean** (rất quan trọng để demo đẹp).

### **Phần 4: Tạo Job & Kết nối (Điểm cao nhất)**
1. Bấm **New Item** -> Đặt tên `Maps_CICD` -> Chọn **Pipeline**.
2. Kéo xuống phần **Pipeline Definition**:
   - Chọn **Pipeline script from SCM**.
   - SCM: Chọn **Git**.
   - Dán URL: `https://github.com/DuyHieu251005/CICD_MMT_Project3.git`
   - (Quan trọng) Chỗ Credentials: Nhấn Add -> Jenkins -> Nhập Username/Password (hoặc Token) của GitHub -> Chọn nó -> Hết lỗi đỏ.
   - Script Path: `Jenkinsfile`.
3. Nhấn **Save**.

### **Phần 5: Demo chạy Pipeline (The Money Shot)**
1. Sau khi Save, nhấn nút **Open Blue Ocean** (bên menu trái) -> Giao diện sẽ đẹp hơn.
2. Nhấn **Run** (Play button).
3. Ngồi chờ và quay lại quá trình các Stage chạy:
   - **Checkout**: Xanh lá ✅
   - **Build**: Xanh lá ✅ (Chứng minh Docker build được image)
   - **Test**: Xanh lá ✅ (Chứng minh chạy test npm thành công)
   - **Deploy**: Xanh lá ✅ (Chứng minh deploy container xong)
4. Click vào stage **Deploy**, show log thấy dòng "Access at: http://localhost:3000".

### **Phần 6: Kết quả cuối cùng (30s)**
1. Mở tab mới: `http://localhost:3000`.
2. Show ra web app có dòng chữ "Hello from CI/CD Pipeline!".
3. Quay lại Terminal, gõ `docker ps` lần nữa, chỉ vào container `cicd-app-container` đang chạy.
4. **Kết thúc video.**

---

## 💡 Mẹo Edit Video
- Dùng **OBS Studio** hoặc **Xbox Game Bar** (Windows + G) để quay.
- Những đoạn chờ cài đặt (Plugins install) nên tua nhanh x4 hoặc cắt bỏ để video không quá dài.
- Nên bật Microphone vừa làm vừa thuyết minh: "Bây giờ em sẽ cấu hình..." -> Giáo viên rất thích điều này vì chứng tỏ chính chủ làm.
