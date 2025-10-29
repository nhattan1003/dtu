// script.js

// Chờ cho toàn bộ trang web được tải xong
document.addEventListener("DOMContentLoaded", function () {

    // --- Biến cho bộ đếm thời gian ---
    let searchTimer;
    const noResultTimeout = 100;
    const noDataMessage = "Vui lòng liên hệ: <a href='https://t.me/babyhaituoi' target='_blank'>https://t.me/babyhaituoi</a>, <a href='https://t.me/Dai_Hoc_Duy_Tan' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan</a>";
    const welcomeMessage = "Chào bạn. Vui lòng nhập từ khóa để tra cứu thông tin.";

    // Lấy các phần tử HTML
    const searchInput = document.getElementById("searchInput");
    const resultDisplay = document.getElementById("resultDisplay");
    const clearButton = document.getElementById("clearButton");

    // --- 1. CHỨC NĂNG NÚT X (XÓA NỘI DUNG) ---

    // Xử lý khi nhấn nút 'x'
    clearButton.addEventListener("click", function () {
        searchInput.value = ""; // Xóa nội dung input
        clearButton.style.display = "none"; // Ẩn nút 'x'
        searchInput.focus(); // Đặt con trỏ chuột lại vào ô input

        // Reset kết quả và dừng timer
        resultDisplay.innerHTML = welcomeMessage;
        clearTimeout(searchTimer);
    });

    // --- 2. CHỨC NĂNG TÌM KIẾM TỰ ĐỘNG ---

    // Hiển thị/ẩn nút 'x' VÀ tìm kiếm tự động khi người dùng gõ
    searchInput.addEventListener("input", function () {
        clearTimeout(searchTimer); // Luôn xóa bộ đếm cũ khi gõ
        const query = searchInput.value;

        if (query.length > 0) {
            clearButton.style.display = "block";

            // --- SỬA LOGIC HIỂN THỊ ---
            const answer = performSearch(); // Hàm này giờ trả về 1 chuỗi HTML đã lọc

            if (answer) {
                // 2.1. Đã tìm thấy câu trả lời

                // Tách chuỗi HTML bằng <br><br> để tạo các khối riêng biệt
                const items = answer.split(/<br\s*\/?>\s*<br\s*\/?>/);

                // Bọc mỗi khối trong 1 div.result-item để chia cột
                const formattedAnswer = items.map(item => {
                    if (item.trim() !== "") { // Bỏ qua các chuỗi rỗng
                        return `<div class="result-item">${item}</div>`;
                    }
                    return "";
                }).join(''); // Nối tất cả lại

                resultDisplay.innerHTML = formattedAnswer;

            } else {
                // 2.2. Không tìm thấy câu trả lời
                // Hiển thị thông báo "không tìm thấy" tạm thời
                resultDisplay.innerHTML = "Xin lỗi, tôi không tìm thấy thông tin cho từ khóa: '<strong>" + query + "</strong>'. Vui lòng thử lại.";

                // Bắt đầu bộ đếm 3s để hiển thị thông báo liên hệ
                searchTimer = setTimeout(() => {
                    resultDisplay.innerHTML = noDataMessage;
                }, noResultTimeout);
            }

        } else {
            // 2.3. Ô tìm kiếm trống
            clearButton.style.display = "none";
            resultDisplay.innerHTML = welcomeMessage;
        }
    });


    // --- HÀM TÌM KIẾM ĐÃ NÂNG CẤP VỚI HỆ THỐNG ĐIỂM ---
    function performSearch() {
        const query = normalizeText(searchInput.value);

        if (query === "") {
            return null;
        }

        let matches = [];
        let maxScore = 0; // Theo dõi điểm cao nhất tìm được

        for (const item of qaData) {
            let bestScoreForItem = 0; // Điểm cao nhất cho item này

            for (const keyword of item.keywords) {
                const normalizedKeyword = normalizeText(keyword);
                let currentScore = 0;

                if (normalizedKeyword === query) {
                    currentScore = 3; // Ưu tiên 1: Chính xác tuyệt đối
                } else if (normalizedKeyword.startsWith(query)) {
                    currentScore = 2; // Ưu tiên 2: Bắt đầu bằng
                } else if (normalizedKeyword.includes(query)) {
                    currentScore = 1; // Ưu tiên 3: Có chứa
                }

                if (currentScore > bestScoreForItem) {
                    bestScoreForItem = currentScore;
                }
            }

            if (bestScoreForItem > 0) {
                matches.push({ answer: item.answer, score: bestScoreForItem });
                if (bestScoreForItem > maxScore) {
                    maxScore = bestScoreForItem; // Cập nhật điểm cao nhất
                }
            }
        }

        if (matches.length === 0) {
            return null;
        }

        // Lọc: Chỉ lấy những item có điểm bằng điểm cao nhất
        const bestMatches = matches.filter(match => match.score === maxScore);

        // Chuyển mảng object thành mảng string
        const foundAnswers = bestMatches.map(match => match.answer);

        // Trả về một chuỗi HTML duy nhất, đã được nối
        return foundAnswers.join('<br><br>');
    }

    // Hàm chuẩn hóa văn bản (xóa dấu, chuyển chữ thường)
    function normalizeText(text) {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

}); // Hết DOMContentLoaded