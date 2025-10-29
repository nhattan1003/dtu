// database.js

// Dữ liệu tra cứu, đã bổ sung đầy đủ danh sách Facebook và Zalo
const qaData = [
    {
        keywords: ["xin chào", "hello", "chào", "tư vấn"],
        answer: "Chào bạn. Tôi có thể giúp gì cho bạn?"
    },
    {
        keywords: ["tuyển sinh", "ban tuyển sinh", "hotline", "email tuyển sinh", "trang tuyển sinh", "chuyên trang tuyển sinh"],
        answer: "<strong>Ban Tuyển sinh Đại học Duy Tân:</strong><br><br>" +
            "- Địa chỉ: 254 Nguyễn Văn Linh - TP Đà Nẵng<br><br>" +
            "- Email: tuyensinh@duytan.edu.vn<br><br>" +
            "- Điện thoại: 02363.650403 - 02363.653561<br><br>" +
            "- Hotline: 0905.294.390 - 0905.294.391 - 1900.2252<br><br>" +
            "- Trang Tuyển sinh chính thức: <a href='https://duytan.edu.vn/tuyen-sinh/Page/Home.aspx' target='_blank'>https://duytan.edu.vn/tuyen-sinh</a>"
    },
    {
        keywords: ["địa chỉ", "cơ sở", "ở đâu", "trường ở đâu", "địa điểm"],
        answer: "<strong>Đại học Duy Tân có nhiều cơ sở tại Đà Nẵng:</strong><br><br>" +
            "- 209 Phan Thanh, Thạc Gián, Thanh Khê<br><br>" +
            "- 254 Đ. Nguyễn Văn Linh, Thạc Gián, Thanh Khê<br><br>" +
            "- 137 Đ. Nguyễn Văn Linh, Phước Ninh, Hải Châu<br><br>" +
            "- 03 Quang Trung, Hải Châu<br><br>" +
            "- K7/25 Quang Trung, Hải Châu<br><br>" +
            "- 120 Hoàng Minh Thảo, Hoà Khánh Nam, Liên Chiểu<br><br>" +
            "- 78 Phan Văn Trị, Khuê Trung, Cẩm Lệ"
    },
    {
        keywords: ["thời gian học", "giờ học", "lịch học", "học mấy giờ", "học tối"],
        answer: "<strong>Thời gian học tập (Thứ 2 - Chủ Nhật):</strong><br><br>" +
            "- Sáng: 07h00 - 09h00, 07h00 - 10h15, 07h00 - 11h15, 09h15 - 11h15<br><br>" +
            "- Chiều: 13h00 - 15h00, 13h00 - 16h15, 13h00 - 17h15, 15h15 - 17h15<br><br>" +
            "- Tối: 17h45 - 21h00"
    },
    {
        keywords: ["học kỳ", "số kỳ", "một năm mấy kỳ", "học hè"],
        answer: "Một năm học có 3 kỳ:<br><br>" +
            "- 1 kỳ 4 tháng (bắt buộc)<br><br>" +
            "- 1 kỳ 4 tháng (bắt buộc)<br><br>" +
            "- 1 kỳ 2 tháng (tự nguyện)"
    },
    {
        keywords: ["phòng đào tạo", "pđt", "pdaotao"],
        answer: "<strong>Phòng đào tạo (PĐT):</strong> P202, K7/25 Quang Trung<br><br>" +
            "Website: <a href='https://pdaotao.duytan.edu.vn/home/Default.aspx?lang=VN' target='_blank'>https://pdaotao.duytan.edu.vn/home</a>"
    },
    {
        keywords: ["công tác sinh viên", "ctsv", "ban công tác sinh viên", "hssv"],
        answer: "<strong>Ban Công tác Sinh viên (CTSV):</strong> P214, K7/25 Quang Trung<br><br>" +
            "Website: <a href='https://hssv.duytan.edu.vn/' target='_blank'>https://hssv.duytan.edu.vn/</a>"
    },
    {
        keywords: ["phòng tài chính", "kế hoạch tài chính"],
        answer: "<strong>Phòng Kế hoạch Tài chính:</strong><br><br>Địa chỉ: 137 Nguyễn Văn Linh"
    },
    {
        keywords: ["giáo dục thể chất", "quốc phòng", "Trung tâm Giáo dục Thể Chất - Quốc phòng", "gdtcqp", "tt gdtc"],
        answer: "<strong>Trung tâm Giáo dục Thể Chất - Quốc phòng:</strong><br><br>" +
            "Địa chỉ: Hòa Khánh Nam<br><br>" +
            "Website: <a href='https://gdtcqp.duytan.edu.vn/' target='_blank'>https://gdtcqp.duytan.edu.vn/</a>"
    },
    {
        keywords: ["nhập học", "làm thủ tục nhập học", "nhập học ở đâu", "giờ nhập học"],
        answer: "Thí sinh đến nhập học trực tiếp tại 254 Đ. Nguyễn Văn Linh, Đà Nẵng.<br><br>" +
            "<strong>Thời gian làm việc:</strong><br><br>" +
            "- Sáng: 07g00 - 11g00 (Thứ 2 - Chủ Nhật)<br><br>" +
            "- Chiều: 13g00 - 17g00 (Thứ 2 - Chủ Nhật)"
    },
    {
        keywords: ["hồ sơ nhập học", "cần giấy tờ gì", "hồ sơ", "giấy tờ"],
        answer: "<strong>Hồ sơ nhập học cần chuẩn bị:</strong><br><br>" +
            "- Bản chính Giấy báo Trúng tuyển...<br><br>" +
            "- Bản chính Giấy chứng nhận kết quả thi THPT (nếu xét điểm thi)<br><br>" +
            "- 01 bản sao công chứng Học bạ THPT<br><br>" +
            "- Bản gốc Giấy chứng nhận tốt nghiệp tạm thời hoặc bản sao công chứng Bằng tốt nghiệp (nếu tốt nghiệp trước 2025)<br><br>" +
            "- 01 bản sao Giấy khai sinh<br><br>" +
            "- Giấy tờ ưu tiên (nếu có)<br><br>" +
            "- Giấy di chuyển nghĩa vụ quân sự (đối với Nam)"
    },
    {
        keywords: ["học phí", "nộp tiền", "chuyển khoản", "tài chính"],
        answer: "<strong>Cách nộp học phí (Chuyển khoản):</strong><br><br>" +
            "- Đơn vị thụ hưởng: <strong>ĐẠI HỌC DUY TÂN</strong><br><br>" +
            "- STK Vietinbank: <strong>118000181119</strong> - TMCP Công thương - CN Đà Nẵng<br><br>" +
            "- STK Vietcombank: <strong>6811111994</strong> - TMCP Ngoại thương - CN Đà Nẵng<br><br>" +
            "<strong>NỘI DUNG BẮT BUỘC:</strong> `Mã số sinh viên (ghi đầy đủ) + Họ và tên sinh viên + nộp học phí HK... năm học...`<br><br>" +
            "<strong>Ví dụ:</strong> `23211203870 Nguyễn Văn A nộp học phí HK 2 năm học 2024-2025`<br><br>" +
            "(Xem STK chính xác: <a href='https://t.me/Dai_Hoc_Duy_Tan/100' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/100</a>)"
    },
    {
        keywords: ["lưu ý học phí", "nộp nhầm", "nộp sai học phí", "sai nội dung", "lỗi chuyển khoản", "máy atm"],
        answer: "<strong>LƯU Ý NỘP HỌC PHÍ:</strong><br><br>" +
            "- Ghi sai MÃ SỐ SINH VIÊN sẽ không cập nhật được học phí, sinh viên vẫn bị báo nợ.<br><br>" +
            "- <strong>Không nộp học phí tại máy ATM</strong> vì không ghi được nội dung, sẽ bị báo nợ.<br><br>" +
            "- Nộp sai số tài khoản sẽ bị báo nợ.<br><br>" +
            "<strong>Xử lý nộp nhầm/sai:</strong> Liên hệ Phòng Kế hoạch tài chính (SĐT: 0236.381.6875 - 0236.381.6874) hoặc đến 137 Nguyễn Văn Linh."
    },
    {
        keywords: ["học online", "học zoom", "link zoom", "sakai", "elearning"],
        answer: "<strong>Hướng dẫn học Online:</strong><br><br>" +
            "- Sinh viên học online qua Zoom. Tự vào myDTU để lấy link học. Giảng viên không có trách nhiệm gửi link riêng. (Hướng dẫn: <a href='https://t.me/Dai_Hoc_Duy_Tan/147' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/147</a>)<br><br>" +
            "- Hướng dẫn đăng ký Zoom bằng email @dtu.edu.vn: <a href='https://t.me/Dai_Hoc_Duy_Tan/160' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/160</a><br><br>" +
            "- Hệ thống eLearning (nộp bài tập) là SAKAI. (Hướng dẫn: <a href='https://t.me/Dai_Hoc_Duy_Tan/36' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/36</a>)"
    },

    // --- CÁC MỤC MYDTU ĐÃ CHẺ NHỎ ---
    {
        keywords: ["mydtu", "cổng thông tin", "trang sinh viên", "đăng nhập mydtu", "signin"],
        answer: "<strong>Hệ thống myDTU:</strong><br><br>" +
            "- Trang myDTU (cổng thông tin sinh viên): <a href='https://mydtu.duytan.edu.vn/' target='_blank'>https://mydtu.duytan.edu.vn/</a>"
    },
    {
        keywords: ["hướng dẫn đăng nhập mydtu", "hd dang nhap mydtu"],
        answer: "<strong>Hướng dẫn Đăng nhập myDTU:</strong><br><br>" +
            "<a href='https://t.me/Dai_Hoc_Duy_Tan/31' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/31</a>"
    },
    {
        keywords: ["sinh hoạt đầu khóa", "hd xem lich sinh hoat dau khoa"],
        answer: "<strong>Hướng dẫn Xem lịch và Tham gia Lớp Sinh hoạt Đầu khóa:</strong><br><br>" +
            "<a href='https://t.me/Dai_Hoc_Duy_Tan/32' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/32</a>"
    },
    {
        keywords: ["xem lịch học", "lịch cá nhân", "hd xem lich hoc"],
        answer: "<strong>Hướng dẫn Xem Lịch học và Thao tác Lịch cá nhân:</strong><br><br>" +
            "<a href='https://t.me/Dai_Hoc_Duy_Tan/33' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/33</a>"
    },
    {
        keywords: ["xem chương trình học", "hd xem chuong trinh hoc"],
        answer: "<strong>Hướng dẫn Xem Chương trình học:</strong><br><br>" +
            "<a href='https://t.me/Dai_Hoc_Duy_Tan/34' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/34</a>"
    },
    {
        keywords: ["đăng ký môn học", "dang ky tin chi", "hd dang ky mon hoc"],
        answer: "<strong>Hướng dẫn Đăng ký Môn học qua myDTU:</strong><br><br>" +
            "<a href='https://t.me/Dai_Hoc_Duy_Tan/35' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/35</a>"
    },
    {
        keywords: ["lấy tài khoản mydtu", "lấy tài khoản zoom", "hd lay tai khoan"],
        answer: "<strong>Hướng dẫn Lấy tài khoản myDTU và ZOOM:</strong><br><br>" +
            "<a href='https://t.me/Dai_Hoc_Duy_Tan/38' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/38</a>"
    },
    {
        keywords: ["tài khoản k31", "mydtu k31"],
        answer: "<strong>Tài khoản K31 (MyDTU):</strong><br><br><a href='https://mydtu.duytan.edu.vn/k31/' target='_blank'>https://mydtu.duytan.edu.vn/k31/</a>"
    },
    // --- HẾT CÁC MỤC MYDTU ---

    {
        keywords: ["thư viện", "mượn sách", "đọc sách", "dtu e lib"],
        answer: "<strong>Thư viện DTU:</strong><br><br>" +
            "- Thư viện 1: Tầng 7, 03 Quang Trung, Hải Châu<br><br>" +
            "- Thư viện 2: Tầng 6, 209 Phan Thanh, Thanh Khê<br><br>" +
            "<strong>Lưu ý:</strong> Phải xuất trình Thẻ sinh viên, ăn mặc lịch sự và giữ im lặng.<br><br>" +
            "- Hướng dẫn mượn sách qua DTU e Lib: <a href='https://t.me/Dai_Hoc_Duy_Tan/37' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/37</a>"
    },
    {
        keywords: ["quên mật khẩu", "lấy lại pass", "mật khẩu gmail", "mật khẩu zoom"],
        answer: "<strong>Hướng dẫn khôi phục mật khẩu:</strong><br><br>" +
            "- Khôi phục mật khẩu GMAIL DTU: <a href='https://t.me/Dai_Hoc_Duy_Tan/365' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/365</a><br><br>" +
            "- Lấy lại password login ZOOM DTU: <a href='https://t.me/Dai_Hoc_Duy_Tan/366' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/366</a>"
    },
    {
        keywords: ["tra danh sách thi", "xem lịch thi", "phòng thi", "danh sách thi"],
        answer: "<strong>Tra cứu danh sách thi:</strong><br><br>" +
            "- Tra danh sách thi 1: <a href='https://pdaotao.duytan.edu.vn/Search/Default.aspx?lang=VN' target='_blank'>https://pdaotao.duytan.edu.vn/Search/Default.aspx</a><br><br>" +
            "- Tra danh sách thi 2: <a href='https://pdaotao.duytan.edu.vn/EXAM_LIST/Default.aspx?lang=VN' target='_blank'>https://pdaotao.duytan.edu.vn/EXAM_LIST/Default.aspx</a>"
    },
    {
        keywords: ["lịch thi google sheet"],
        answer: "<strong>Lịch thi (Google Sheet):</strong><br><br><a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vR82IjSr1ilXkONrDOZQ3FkXtaJ0b5n1dfBWs3iWZjKjStL13jXP0QpywwEjonUt8SDFmoBlkelgq3Y/pubhtml' target='_blank'>Xem Google Sheet</a>"
    },
    {
        keywords: ["tra môn học", "tìm môn học", "môn học", "đăng ký tín chỉ", "tìm kiếm môn học"],
        answer: "<strong>Tra/Tìm kiếm môn học:</strong><br><br>" +
            "<a href='https://courses.duytan.edu.vn/sites/Home_ChuongTrinhDaoTao.aspx?p=home_coursesearch' target='_blank'>https://courses.duytan.edu.vn</a>"
    },
    {
        keywords: ["tài liệu tham khảo", "tham khao", "studocu", "docx"],
        answer: "<strong>Tài liệu tham khảo:</strong><br><br>" +
            "- Tài liệu Studocu: <a href='https://www.studocu.vn/vn/institution/truong-dai-hoc-duy-tan/11203' target='_blank'>https://www.studocu.vn</a><br><br>" +
            "- Tài liệu Docx: <a href='https://docx.com.vn/dai-hoc-duy-tan' target='_blank'>https://docx.com.vn/dai-hoc-duy-tan</a>"
    },
    {
        keywords: ["khai báo ngoại trú", "tạm trú", "ngoại trú", "đánh giá rèn luyện", "điểm rèn luyện"],
        answer: "<strong>Hoạt động sinh viên:</strong><br><br>" +
            "- Hướng dẫn khai báo ngoại trú sinh viên: <a href='https://t.me/Dai_Hoc_Duy_Tan/176' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/176</a><br><br>" +
            "- Hướng dẫn đánh giá rèn luyện sinh viên: <a href='https://t.me/Dai_Hoc_Duy_Tan/181' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/181</a><br><br>" +
            "- Quy định Đánh giá rèn luyện: <a href='https://t.me/Dai_Hoc_Duy_Tan/186' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan/186</a>"
    },
    {
        keywords: ["số tài khoản", "stk", "tài khoản ngân hàng", "chuyển khoản", "học phí", "lệ phí", "bảo hiểm y tế", "bảo hiểm", "bhyt"],
        answer: "<strong>Danh sách tài khoản chính thức của Đại học Duy Tân:</strong><br><br>" +

            "<strong>1. Học phí, lệ phí:</strong><br>" +
            "  - Tên tài khoản: Đại học Duy Tân<br>" +
            "  - STK VietinBank: <strong>118000181119</strong><br>" +
            "  - STK Vietcombank: <strong>6811111994</strong><br><br>" +

            "<strong>2. Bảo hiểm y tế sinh viên:</strong><br>" +
            "  - Tên tài khoản: Đại học Duy Tân<br>" +
            "  - STK VietinBank: <strong>114615167979</strong><br><br>" +

            "<strong>3. Khoá học, lệ phí thi tại Trung tâm Tin học:</strong><br>" +
            "  - Tên tài khoản: Đại học Duy Tân<br>" +
            "  - STK VietinBank: <strong>117699499999</strong><br><br>" +

            "<strong>4. Khoá học, lệ phí thi tại Trung tâm LTC:</strong><br>" +
            "  - Tên tài khoản: Đại học Duy Tân<br>" +
            "  - STK VietinBank: <strong>119644775555</strong><br><br>" +

            "<strong style='color: red;'>CẢNH BÁO QUAN TRỌNG:</strong><br>" +
            "<strong>Tuyệt đối không chuyển tiền vào tài khoản cá nhân</strong> của bất kỳ cán bộ, giảng viên nào. Nhà trường không chịu trách nhiệm đối với các trường hợp sinh viên tự ý chuyển tiền vào tài khoản khác ngoài danh sách trên."
    },

    // --- CÁC MỤC TELEGRAM (ĐÃ CẬP NHẬT TỪ INDEX.HTML) ---

    {
        keywords: ["bản tin", "tin tức", "bản tin đại học duy tân", "thông báo", "tin tức dtu"],
        answer: "<strong>📣 Tin tức DTU (Telegram):</strong><br><br>" +
            "<a href='https://t.me/Dai_Hoc_Duy_Tan' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan</a><br><br>Kênh do admin hỗ trợ, cập nhật thông báo quan trọng, tin tức cho sinh viên."
    },
    {
        keywords: ["tài liệu dtu", "tài liệu môn học dtu", "tai lieu dtu"],
        answer: "<strong>📘 Tài liệu môn học DTU (Telegram):</strong><br><br>" +
            "<a href='https://t.me/tai_lieu_DTU' target='_blank'>https://t.me/tai_lieu_DTU</a><br><br>"
    },
    {
        keywords: ["chat", "kênh chat", "trò chuyện", "hỏi đáp", "giao lưu", "chém gió"],
        answer: "<strong>💬 Giao lưu (Telegram):</strong><br><br>" +
            "<a href='https://t.me/trochuyencungdtu' target='_blank'>https://t.me/trochuyencungdtu</a><br><br>Ngôi nhà chung của sinh viên DTU! Cùng nhau giao lưu, hỏi đáp và chia sẻ kinh nghiệm."
    },
    {
        keywords: ["hướng dẫn telegram", "hd telegram", "hướng dẫn sử dụng an toàn"],
        answer: "<strong>💡 Hướng dẫn sử dụng an toàn (Telegram):</strong><br><br>" +
            "<a href='https://t.me/huongdandungtelegram' target='_blank'>https://t.me/huongdandungtelegram</a>"
    },
    {
        keywords: ["tân", "admin", "liên hệ admin", "babyhaituoi", "ban quản trị", "bqt"],
        answer: "<strong>Ban Quản Trị (Tân):</strong><br><br>" +
            "<a href='https://t.me/babyhaituoi' target='_blank'>https://t.me/babyhaituoi</a><br><br>Gặp vướng mắc về trường, môn học, tài liệu, ôn thi hiệu quả?"
    },
    {
        keywords: ["việc làm", "thực tập", "job", "intern", "realjobs"],
        answer: "<strong>Trang Việc làm - Thực tập (RealJobs):</strong><br><br>" +
            "<a href='https://realjobs.vn/' target='_blank'>https://realjobs.vn/</a>"
    },
    {
        keywords: ["trang chủ dtu", "trang chủ đại học duy tân", "duytan.edu.vn"],
        answer: "<strong>Trang chủ Đại học Duy Tân:</strong><br><br><a href='https://duytan.edu.vn' target='_blank'>https://duytan.edu.vn</a>"
    },
    {
        keywords: ["facebook tuyển sinh", "tuyển sinh facebook", "facebook tuyensinhdtu"],
        answer: "<strong>Facebook Tuyển sinh Đại học Duy Tân:</strong><br><br><a href='https://www.facebook.com/tuyensinhDTU' target='_blank'>https://www.facebook.com/tuyensinhDTU</a>"
    },
    {
        keywords: ["tải telegram", "telegram windows", "cài đặt telegram"],
        answer: "<strong>Tải telegram về cho Windows:</strong><br><br><a href='https://telegram.org/dl/desktop/win64' target='_blank'>https://telegram.org/dl/desktop/win64</a>"
    },
    {
        keywords: ["telegram web", "telegram website"],
        answer: "<strong>Dùng bản Website telegram:</strong><br><br><a href='https://web.telegram.org/a/' target='_blank'>https://web.telegram.org/a/</a>"
    },
    {
        keywords: ["website nhattan28", "daihocduytan", "website cộng đồng"],
        answer: "<strong>Website Cộng đồng (nhattan28):</strong><br><br><a href='https://nhattan28.github.io/daihocduytan' target='_blank'>https://nhattan28.github.io/daihocduytan</a>"
    },
    {
        keywords: ["dtu nhattan", "nhattan1003"],
        answer: "<strong>Trang DTU (NhatTan1003):</strong><br><br>" +
            "<a href='https://nhattan1003.github.io/dtu/' target='_blank'>https://nhattan1003.github.io/dtu/</a>"
    },
    {
        keywords: ["nhận xét giảng viên", "review giảng viên", "đánh giá gv"],
        answer: "<strong>Nhận xét giảng viên (Google Sheet):</strong><br><br><a href='https://docs.google.com/spreadsheets/d/1XSEGx49YiOg-8oi2QFZux6e5RyULRtkB9yuRPCQZKr4/edit?usp=sharing' target='_blank'>Xem Google Sheet</a>"
    },
    {
        keywords: ["chống lừa đảo", "chong luu dao"],
        answer: "<strong>Chống lừa đảo:</strong><br><br><a href='https://chongluadao.vn/' target='_blank'>https://chongluadao.vn/</a>"
    },
    {
        keywords: ["camera", "camera đà nẵng", "camera da nang"],
        answer: "<strong>Camera Đà Nẵng:</strong><br><br><a href='https://nhattan28.github.io/cameraDaNang/' target='_blank'>https://nhattan28.github.io/cameraDaNang/</a>"
    },
    {
        keywords: ["gửi file", "transfer.it", "gửi file lớn"],
        answer: "<strong>Gửi file (Transfer.it):</strong><br><br><a href='https://transfer.it/start' target='_blank'>https://transfer.it/start</a>"
    },
    {
        keywords: ["code", "onecompiler", "lập trình online", "compiler"],
        answer: "<strong>Code Online (OneCompiler):</strong><br><br><a href='https://onecompiler.com/' target='_blank'>https://onecompiler.com/</a>"
    },
    {
        keywords: ["chu kỳ", "tính chu kỳ", "chu ky kinh nguyet"],
        answer: "<strong>Tính chu kỳ:</strong><br><br><a href='https://nhattan28.github.io/chukykinhnguyet/' target='_blank'>https://nhattan28.github.io/chukykinhnguyet/</a>"
    },
    {
        keywords: ["rút gọn link", "by.com.vn", "rut gon"],
        answer: "<strong>Rút gọn link (by.com.vn):</strong><br><br><a href='https://by.com.vn/' target='_blank'>https://by.com.vn/</a>"
    },
    {
        keywords: ["tải tiktok", "download tiktok", "tiktok không logo"],
        answer: "<strong>Tải Tiktok (Không logo):</strong><br><br><a href='https://tcc-agency.com/tiktok-download/' target='_blank'>https://tcc-agency.com/tiktok-download/</a>"
    },
    {
        keywords: ["giá cà phê", "gia ca phe"],
        answer: "<strong>Giá cà phê:</strong><br><br><a href='https://giacaphe.com/gia-ca-phe-dak-nong/' target='_blank'>https://giacaphe.com/gia-ca-phe-dak-nong/</a>"
    },
    {
        keywords: ["giá tiêu", "gia tieu"],
        answer: "<strong>Giá tiêu:</strong><br><br><a href='https://giacaphe.com/gia-tieu-hom-nay/' target='_blank'>https://giacaphe.com/gia-tieu-hom-nay/</a>"
    },
    {
        keywords: ["game nối chữ", "noi chu"],
        answer: "<strong>Game nối chữ:</strong><br><br><a href='https://docs.google.com/spreadsheets/d/18dw8kwvXfVeR0MnPEAk9lLAYmzYk-13eRuXbg5S7Fyg/edit?usp=sharing' target='_blank'>Xem Google Sheet</a>"
    },
    {
        keywords: ["khoa cntt", "khoa công nghệ thông tin", "kcntt"],
        answer: "<strong>Khoa CNTT:</strong><br><br><a href='https://kcntt.duytan.edu.vn/' target='_blank'>https://kcntt.duytan.edu.vn/</a>"
    },
    {
        keywords: ["thông báo lhss", "lhss", "thong bao"],
        answer: "<strong>Thông báo (LHSS):</strong><br><br><a href='https://lhss.duytan.edu.vn/announcements' target='_blank'>https://lhss.duytan.edu.vn/announcements</a>"
    },

    // --- DANH SÁCH FACEBOOK DTU (TỪ FACEBOOKDTU.HTML) ---
    {
        keywords: ["fb đại học duy tân", "facebook dai hoc duy tan"],
        answer: "<strong>Facebook Đại học Duy Tân:</strong><br><br><a href='https://www.facebook.com/daihocduytan.dtu' target='_blank'>https://www.facebook.com/daihocduytan.dtu</a>"
    },
    {
        keywords: ["fb duy tan university", "facebook duy tan university"],
        answer: "<strong>Facebook Duy Tan University:</strong><br><br><a href='https://www.facebook.com/Duy.Tan.University' target='_blank'>https://www.facebook.com/Duy.Tan.University</a>"
    },
    {
        keywords: ["fb ltc", "facebook ltc", "learning & testing center"],
        answer: "<strong>Facebook LTC - Learning & Testing Center:</strong><br><br><a href='https://www.facebook.com/ltcdtu' target='_blank'>https://www.facebook.com/ltcdtu</a>"
    },
    {
        keywords: ["fb tuổi trẻ đại học duy tân", "facebook tuoi tre dtu"],
        answer: "<strong>Facebook Tuổi trẻ Đại học Duy Tân:</strong><br><br><a href='https://www.facebook.com/tuoitreDTU' target='_blank'>https://www.facebook.com/tuoitreDTU</a>"
    },
    {
        keywords: ["fb trường đào tạo quốc tế", "facebook truong dao tao quoc te"],
        answer: "<strong>Facebook Trường Đào tạo Quốc tế:</strong><br><br><a href='https://www.facebook.com/DTU.InternationalSchool' target='_blank'>https://www.facebook.com/DTU.InternationalSchool</a>"
    },
    {
        keywords: ["fb trường du lịch", "facebook truong du lich", "duytanhti"],
        answer: "<strong>Facebook Trường Du Lịch:</strong><br><br><a href='https://www.facebook.com/DuyTanHTi' target='_blank'>https://www.facebook.com/DuyTanHTi</a>"
    },
    {
        keywords: ["fb khoa khoa học xã hội và nhân văn", "facebook khxhvn"],
        answer: "<strong>Facebook Khoa Khoa học Xã hội và Nhân văn:</strong><br><br><a href='https://www.facebook.com/KhoaKhoaHocXaHoiVaNhanVanDaiHocDuyTan' target='_blank'>https://www.facebook.com/KhoaKhoaHocXaHoiVaNhanVanDaiHocDuyTan</a>"
    },
    {
        keywords: ["fb tuổi trẻ trường khoa học máy tính", "facebook tuoi tre scs", "cntt.dtu"],
        answer: "<strong>Facebook Tuổi Trẻ Trường Khoa Học Máy Tính:</strong><br><br><a href='https://www.facebook.com/CNTT.DTU' target='_blank'>https://www.facebook.com/CNTT.DTU</a>"
    },
    {
        keywords: ["fb khoa tiếng trung", "facebook khoa tieng trung"],
        answer: "<strong>Facebook Khoa Tiếng Trung:</strong><br><br><a href='https://www.facebook.com/KHOATRUNGDTU' target='_blank'>https://www.facebook.com/KHOATRUNGDTU</a>"
    },
    {
        keywords: ["fb trung tâm ngoại ngữ", "facebook trung tam ngoai ngu"],
        answer: "<strong>Facebook Trung Tâm Ngoại Ngữ Duy Tân:</strong><br><br><a href='https://www.facebook.com/duytan.luyenthi.toeic.toefl.Danang' target='_blank'>https://www.facebook.com/duytan.luyenthi.toeic.toefl.Danang</a>"
    },
    {
        keywords: ["fb trung tâm tin học", "facebook trung tam tin hoc"],
        answer: "<strong>Facebook Trung Tâm Tin Học Duy Tân (Group):</strong><br><br><a href='https://www.facebook.com/groups/189204667249513' target='_blank'>https://www.facebook.com/groups/189204667249513</a>"
    },
    {
        keywords: ["fb khoa quản lý kinh tế việt mỹ psu", "facebook psu"],
        answer: "<strong>Facebook Khoa Quản lý kinh tế Việt Mỹ- PSU:</strong><br><br><a href='https://www.facebook.com/QuanlykinhteVietMyPSU' target='_blank'>https://www.facebook.com/QuanlykinhteVietMyPSU</a>"
    },
    {
        keywords: ["fb tuổi trẻ khoa y", "facebook tuoi tre khoa y"],
        answer: "<strong>Facebook Tuổi trẻ Khoa Y ĐH Duy Tân:</strong><br><br><a href='https://www.facebook.com/DOANKHOAYDHDUYTAN' target='_blank'>https://www.facebook.com/DOANKHOAYDHDUYTAN</a>"
    },
    {
        keywords: ["fb clb tiếng anh", "facebook dec", "clb tieng anh duy tan"],
        answer: "<strong>Facebook CLB Tiếng Anh Duy Tân DEC:</strong><br><br><a href='https://www.facebook.com/CLBTiengAnhDuyTan' target='_blank'>https://www.facebook.com/CLBTiengAnhDuyTan</a>"
    },
    {
        keywords: ["fb khoa tiếng anh", "facebook khoa tieng anh"],
        answer: "<strong>Facebook Khoa Tiếng Anh:</strong><br><br><a href='https://www.facebook.com/profile.php?id=61577509090321' target='_blank'>https://www.facebook.com/profile.php?id=61577509090321</a>"
    },
    {
        keywords: ["fb trường khoa học máy tính", "facebook school of computer science", "scs"],
        answer: "<strong>Facebook Trường Khoa học Máy tính - School of Computer Science:</strong><br><br><a href='https://www.facebook.com/truongkhoahocmaytinh' target='_blank'>https://www.facebook.com/truongkhoahocmaytinh</a>"
    },
    {
        keywords: ["fb tuổi trẻ trường kinh tế", "facebook tuoi tre truong kinh te"],
        answer: "<strong>Facebook Tuổi trẻ Trường Kinh Tế:</strong><br><br><a href='https://www.facebook.com/dtkt.dtu' target='_blank'>https://www.facebook.com/dtkt.dtu</a>"
    },
    {
        keywords: ["fb tuổi trẻ khoa dược", "facebook tuoi tre khoa duoc"],
        answer: "<strong>Facebook Tuổi Trẻ Khoa Dược:</strong><br><br><a href='https://www.facebook.com/doankhoaduocdtu' target='_blank'>https://www.facebook.com/doankhoaduocdtu</a>"
    },
    {
        keywords: ["fb cố vấn học tập trường du lịch", "facebook co van hoc tap"],
        answer: "<strong>Facebook Cố vấn học tập - Trường Du lịch DTU:</strong><br><br><a href='https://www.facebook.com/covanhoctapDTU' target='_blank'>https://www.facebook.com/covanhoctapDTU</a>"
    },
    {
        keywords: ["fb clb y khoa cơ sở", "facebook clb y khoa"],
        answer: "<strong>Facebook CLB Y khoa cơ sở:</strong><br><br><a href='https://www.facebook.com/CLBYKHOACOSO' target='_blank'>https://www.facebook.com/CLBYKHOACOSO</a>"
    },
    {
        keywords: ["fb lcđ khoa luật", "facebook khoa luat"],
        answer: "<strong>Facebook LCĐ Khoa Luật:</strong><br><br><a href='https://www.facebook.com/LCDKHOALUATDTU' target='_blank'>https://www.facebook.com/LCDKHOALUATDTU</a>"
    },

    // --- DANH SÁCH ZALO DTU (TỪ ZALOTUYENSINH.HTML) ---
    {
        keywords: ["zalo trường khoa học máy tính", "zalo scs"],
        answer: "<strong>Zalo Trường Khoa học Máy tính:</strong><br><br><a href='https://zalo.me/g/kfhnwd118' target='_blank'>https://zalo.me/g/kfhnwd118</a>"
    },
    {
        keywords: ["zalo trường công nghệ & kỹ thuật", "zalo set"],
        answer: "<strong>Zalo Trường Công nghệ & Kỹ thuật:</strong><br><br><a href='https://zalo.me/g/rgchfj749' target='_blank'>https://zalo.me/g/rgchfj749</a>"
    },
    {
        keywords: ["zalo trường kinh tế & kinh doanh", "zalo sbe"],
        answer: "<strong>Zalo Trường Kinh tế & Kinh doanh:</strong><br><br><a href='https://zalo.me/g/ejyzhc042' target='_blank'>https://zalo.me/g/ejyzhc042</a>"
    },
    {
        keywords: ["zalo trường ngôn ngữ & xhnv", "zalo sls"],
        answer: "<strong>Zalo Trường Ngôn ngữ & XHNV:</strong><br><br><a href='https://zalo.me/g/fynbqt588' target='_blank'>https://zalo.me/g/fynbqt588</a>"
    },
    {
        keywords: ["zalo trường du lịch", "zalo hti"],
        answer: "<strong>Zalo Trường Du lịch:</strong><br><br><a href='https://zalo.me/g/mvyujq901' target='_blank'>https://zalo.me/g/mvyujq901</a>"
    },
    {
        keywords: ["zalo khối ngành y dược", "zalo y duoc"],
        answer: "<strong>Zalo Khối ngành Y Dược:</strong><br><br><a href='https://zalo.me/g/sfadnd366' target='_blank'>https://zalo.me/g/sfadnd366</a>"
    },
    {
        keywords: ["zalo khoa đào tạo quốc tế", "zalo dao tao quoc te"],
        answer: "<strong>Zalo Khoa Đào tạo Quốc tế:</strong><br><br><a href='https://zalo.me/g/oxxsck718' target='_blank'>https://zalo.me/g/oxxsck718</a>"
    },
    {
        keywords: ["zalo chương trình tài năng", "zalo vien ql nam khue"],
        answer: "<strong>Zalo Chương trình Tài năng (Viện QL Nam Khuê):</strong><br><br><a href='https://zalo.me/g/blxzaf771' target='_blank'>https://zalo.me/g/blxzaf771</a>"
    },
    {
        keywords: ["zalo chương trình việt nhật", "zalo viet nhat"],
        answer: "<strong>Zalo Chương trình Việt Nhật:</strong><br><br><a href='https://zalo.me/g/cxpzwr696' target='_blank'>https://zalo.me/g/cxpzwr696</a>"
    }
];