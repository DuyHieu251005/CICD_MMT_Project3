Video Configuration Script (Kịch bản quay video)
🎯 Mục tiêu
Đạt trọn vẹn điểm số dựa trên thang đánh giá của đồ án.

Cấu hình Git (2đ)
Cấu hình Github (1đ)
Cấu hình Jenkins (2đ)
Cấu hình Docker (2đ)
Kết nối Jenkins & Docker (2đ)
🎬 Kịch bản chi tiết (Storyboard)
Start Recording (Bắt đầu quay)
Phần 1: Giới thiệu & Môi trường (30s)
Mở file 
Readme.txt
 đã điền đầy đủ thông tin nhóm.
Quay màn hình Desktop có folder MMT_CICD.
Mở Terminal (PowerShell/CMD) tại thư mục đó.
Gõ: docker --version để chứng minh đã cài Docker (Điểm Docker).
Gõ: docker-compose -f jenkins-compose.yml ps để show container đang chạy.
Phần 2: Git & GitHub (1 - 2 phút)
Chuyển sang trình duyệt, mở Repository trên GitHub của bạn.
Show thấy code đã được push lên (có file Jenkinsfile, Dockerfile...) (Điểm GitHub).
Quay lại Terminal, gõ git remote -v để chứng minh đã link với repo đó (Điểm Git).
(Optional) Thực hiện một thay đổi nhỏ trong file 
Readme.txt
, sau đó gõ git add ., git commit, git push để chứng minh kết nối hoạt động.
Phần 3: Cấu hình Jenkins (QUAN TRỌNG - Quay ngay lúc này)
Lưu ý: Đây là phần bạn đang làm dở, hãy quay lại quá trình này.

Lấy mật khẩu Admin (Chứng minh kỹ năng Docker):
Mở Terminal đang chạy.
Gõ lệnh: docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword
Copy dòng mã hash hiện ra (ví dụ: d3c6...).
Mở trình duyệt localhost:8080.
Paste mật khẩu vào ô Administrator password.
Chọn "Install suggested plugins" (đoạn này có thể tua nhanh khi edit video).
Quay cảnh tạo User Admin đầu tiên (đặt là MSSV).
Vào Manage Jenkins -> Plugins -> Cài đặt Docker Pipeline và Blue Ocean (rất quan trọng để demo đẹp).
Phần 4: Tạo Job & Kết nối (Điểm cao nhất)
Bấm New Item -> Đặt tên Maps_CICD -> Chọn Pipeline.
Kéo xuống phần Pipeline Definition:
Chọn Pipeline script from SCM.
SCM: Chọn Git.
Dán URL: https://github.com/DuyHieu251005/CICD_MMT_Project3.git
(Quan trọng) Chỗ Credentials: Nhấn Add -> Jenkins -> Nhập Username/Password (hoặc Token) của GitHub -> Chọn nó -> Hết lỗi đỏ.
Script Path: 
Jenkinsfile
.
Nhấn Save.
Phần 5: Demo chạy Pipeline (The Money Shot)
Sau khi Save, nhấn nút Open Blue Ocean (bên menu trái) -> Giao diện sẽ đẹp hơn.
Nhấn Run (Play button).
Ngồi chờ và quay lại quá trình các Stage chạy:
Checkout: Xanh lá ✅
Build: Xanh lá ✅ (Chứng minh Docker build được image)
Test: Xanh lá ✅ (Chứng minh chạy test npm thành công)
Deploy: Xanh lá ✅ (Chứng minh deploy container xong)
Click vào stage Deploy, show log thấy dòng "Access at: http://localhost:3000".
Phần 6: Kết quả cuối cùng (30s)
Mở tab mới: http://localhost:3000.
Show ra web app có dòng chữ "Hello from CI/CD Pipeline!".
Quay lại Terminal, gõ docker ps lần nữa, chỉ vào container cicd-app-container đang chạy.
Kết thúc video.