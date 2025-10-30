// script.js (ĐÃ CẬP NHẬT HOÀN CHỈNH VỚI BỘ ĐẾM)

document.addEventListener("DOMContentLoaded", function () {
    // --- MỚI: TỔNG HỢP DỮ LIỆU TỪ TẤT CẢ CÁC MẢNG ---
    const allQaData = [
        ...generalInfo,
        ...dtuWebsites,
        ...fbLinks,
        ...zaloLinks,
        ...telegramLinks,
        ...externalLinks
        // (Nếu bạn thêm mảng mới, chỉ cần thêm vào đây)
    ];
    // --- KẾT THÚC PHẦN MỚI ---

    // --- BỔ SUNG: BIẾN CHO BỘ ĐẾM ---
    const totalCount = allQaData.length; // Tự động đếm tổng số lượng
    const counterDisplay = document.getElementById("resultCounter"); // Lấy thẻ đếm
    // --- KẾT THÚC BỔ SUNG ---

    let searchTimer;
    const noResultTimeout = 1;
    const noDataMessage = "Vui lòng liên hệ: <a href='https://t.me/babyhaituoi' target='_blank'>Telegram</a>, <a href='https://t.me/Dai_Hoc_Duy_Tan' target='_blank'>Bản Tin Đại học Duy Tân</a>";
    const welcomeMessage = "Nhật Tân chào bạn";

    const searchInput = document.getElementById("searchInput");
    const resultDisplay = document.getElementById("resultDisplay");
    const clearButton = document.getElementById("clearButton");
    const suggestionsWrapper = document.getElementById("suggestionsWrapper");

    let suggestionActiveIndex = -1;

    // --- BỔ SUNG: HÀM CẬP NHẬT BỘ ĐẾM ---
    /**
     * Cập nhật văn bản của bộ đếm.
     * @param {number | null} count - Số lượng hiển thị. Nếu là null, sẽ dùng totalCount.
     */
    function updateCounter(count) {
        if (count !== null) {
            counterDisplay.textContent = `${count} kết quả`;
        } else {
            // Mặc định (hoặc khi xóa trống), hiển thị tổng
            counterDisplay.textContent = `Tổng: ${totalCount}`;
        }
    }
    // Đặt giá trị ban đầu khi tải trang
    updateCounter(null);
    // --- KẾT THÚC BỔ SUNG ---

    // --- 1. CHỨC NĂNG NÚT X ---
    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        clearButton.style.display = "none";
        searchInput.focus();
        resultDisplay.innerHTML = welcomeMessage;
        suggestionsWrapper.style.display = "none";
        suggestionActiveIndex = -1;
        clearTimeout(searchTimer);

        // --- BỔ SUNG ---
        updateCounter(null); // Reset về tổng
        // --- KẾT THÚC BỔ SUNG ---
    });

    // --- 2. TÌM KIẾM TỰ ĐỘNG VÀ GỢI Ý ---
    searchInput.addEventListener("input", function () {
        clearTimeout(searchTimer);
        const query = searchInput.value;
        const normalizedQuery = normalizeText(query);
        suggestionActiveIndex = -1;

        // A. XỬ LÝ GỢI Ý
        if (normalizedQuery.length > 0) {
            const suggestions = findSuggestions(normalizedQuery);
            displaySuggestions(suggestions, query);
        } else {
            suggestionsWrapper.style.display = "none";
        }

        // B. XỬ LÝ TÌM KIẾM
        if (query.length > 0) {
            clearButton.style.display = "block";
            const bestMatches = performSearch();

            if (bestMatches && bestMatches.length > 0) {
                const formattedAnswer = bestMatches.map(match => {
                    const keywordsHtml = match.keywords
                        .map(kw => `<span class='related-keyword-tag'>${kw}</span>`)
                        .join('');

                    return `
                        <div class="result-item">
                            <button class="copy-card-btn" title="Chụp ảnh thẻ này">📋</button>
                            <div class="result-answer">${match.answer}</div>
                            <div class="result-keywords">
                                <strong>Từ khóa liên quan:</strong>
                                ${keywordsHtml}
                            </div>
                        </div>`;

                }).join('');
                resultDisplay.innerHTML = formattedAnswer;

                // --- BỔ SUNG ---
                updateCounter(bestMatches.length); // Cập nhật số lượng tìm thấy
                // --- KẾT THÚC BỔ SUNG ---

            } else {
                resultDisplay.innerHTML = "Xin lỗi, tôi không tìm thấy thông tin cho từ khóa: '<strong>" + query + "</strong>'. Vui lòng thử lại.";
                searchTimer = setTimeout(() => {
                    resultDisplay.innerHTML = noDataMessage;
                }, noResultTimeout);

                // --- BỔ SUNG ---
                updateCounter(0); // Cập nhật là 0
                // --- KẾT THÚC BỔ SUNG ---
            }
        } else {
            clearButton.style.display = "none";
            resultDisplay.innerHTML = welcomeMessage;

            // --- BỔ SUNG ---
            updateCounter(null); // Reset về tổng
            // --- KẾT THÚC BỔ SUNG ---
        }
    });

    // --- 3. HÀM TÌM KIẾM ĐÁP ÁN ---
    function performSearch() {
        const query = normalizeText(searchInput.value);
        if (query === "") return null;
        let matches = [];
        let maxScore = 0;

        for (const item of allQaData) {
            let bestScoreForItem = 0;
            for (const keyword of item.keywords) {
                const normalizedKeyword = normalizeText(keyword);
                let currentScore = 0;
                if (normalizedKeyword === query) currentScore = 3;
                else if (normalizedKeyword.startsWith(query)) currentScore = 2;
                else if (normalizedKeyword.includes(query)) currentScore = 1;
                if (currentScore > bestScoreForItem) bestScoreForItem = currentScore;
            }
            if (bestScoreForItem > 0) {
                matches.push({
                    answer: item.answer,
                    keywords: item.keywords,
                    score: bestScoreForItem
                });
                if (bestScoreForItem > maxScore) maxScore = bestScoreForItem;
            }
        }
        if (matches.length === 0) return null;
        const bestMatches = matches.filter(match => match.score === maxScore);
        return bestMatches;
    }

    // --- 4. HÀM GỢI Ý ---
    function findSuggestions(normalizedQuery) {
        const suggestions = new Set();
        if (normalizedQuery.length < 1) return [];

        for (const item of allQaData) {
            for (const keyword of item.keywords) {
                const normalizedKeyword = normalizeText(keyword);
                if (normalizedKeyword.includes(normalizedQuery)) {
                    suggestions.add(keyword);
                }
            }
        }
        return Array.from(suggestions).slice(0, 10);
    }

    function displaySuggestions(suggestions, query) {
        suggestionsWrapper.innerHTML = "";
        if (suggestions.length === 0) {
            suggestionsWrapper.style.display = "none";
            return;
        }
        function escapeRegExp(string) {
            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        suggestions.forEach(keyword => {
            const div = document.createElement("div");
            div.className = "suggestion-item";
            const highlightedKeyword = keyword.replace(regex, '<strong>$1</strong>');
            div.innerHTML = highlightedKeyword;
            div.addEventListener("click", () => {
                selectSuggestion(keyword);
            });
            suggestionsWrapper.appendChild(div);
        });
        suggestionsWrapper.style.display = "block";
    }

    function selectSuggestion(keyword) {
        searchInput.value = keyword;
        suggestionsWrapper.style.display = "none";
        suggestionActiveIndex = -1;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        searchInput.focus();
    }

    function updateSuggestionHighlight() {
        const items = suggestionsWrapper.querySelectorAll('.suggestion-item');
        items.forEach((item, index) => {
            if (index === suggestionActiveIndex) {
                item.classList.add('suggestion-active');
                item.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            } else {
                item.classList.remove('suggestion-active');
            }
        });
    }

    // --- 5. HÀM CHUẨN HÓA ---
    function normalizeText(text) {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // --- 6. ẨN GỢI Ý KHI NHẤP RA NGOÀI ---
    document.addEventListener("click", function (event) {
        if (event.target !== searchInput && !suggestionsWrapper.contains(event.target)) {
            suggestionsWrapper.style.display = "none";
            suggestionActiveIndex = -1;
        }
    });

    // --- 7. XỬ LÝ NHẤN PHÍM ---
    searchInput.addEventListener("keydown", function (event) {
        const items = suggestionsWrapper.querySelectorAll('.suggestion-item');
        if (suggestionsWrapper.style.display === 'none' || items.length === 0) return;
        if (event.key === "ArrowDown") {
            event.preventDefault();
            suggestionActiveIndex++;
            if (suggestionActiveIndex >= items.length) suggestionActiveIndex = 0;
            updateSuggestionHighlight();
        }
        else if (event.key === "ArrowUp") {
            event.preventDefault();
            suggestionActiveIndex--;
            if (suggestionActiveIndex < 0) suggestionActiveIndex = items.length - 1;
            updateSuggestionHighlight();
        }
        else if (event.key === "Enter") {
            event.preventDefault();
            if (suggestionActiveIndex > -1) {
                const selectedKeyword = items[suggestionActiveIndex].textContent;
                selectSuggestion(selectedKeyword);
            } else {
                suggestionsWrapper.style.display = 'none';
            }
        }
        else if (event.key === "Escape") {
            suggestionsWrapper.style.display = 'none';
            suggestionActiveIndex = -1;
        }
    });

    // --- 8. XỬ LÝ CLICK TỪ KHÓA LIÊN QUAN VÀ NÚT COPY ---
    resultDisplay.addEventListener('click', function (event) {
        const target = event.target;

        // A. Xử lý click tag từ khóa
        if (target.classList.contains('related-keyword-tag')) {
            const keyword = target.textContent;
            searchInput.value = keyword;
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchInput.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // B. Xử lý click nút sao chép
        if (target.classList.contains('copy-card-btn')) {
            handleCopyCard(target);
        }
    });

    // --- 9. HÀM MỚI: XỬ LÝ SAO CHÉP ẢNH THẺ (ĐÃ SỬA LỖI LẦN 3) ---
    function handleCopyCard(button) {
        const card = button.closest('.result-item');
        const answerDivToCapture = card.querySelector('.result-answer');

        if (!answerDivToCapture) return;

        const originalButtonContent = button.innerHTML;

        // Dùng html2canvas
        html2canvas(answerDivToCapture, {
            useCORS: true,
            logging: false,
            scale: 2,
            backgroundColor: '#ffffff', // Đảm bảo ảnh có nền trắng

            onclone: (clonedDocument) => {
                const originalContentHTML = clonedDocument.body.innerHTML;
                const contentWrapper = clonedDocument.createElement('div');
                contentWrapper.innerHTML = originalContentHTML;
                contentWrapper.style.position = 'relative';
                contentWrapper.style.zIndex = '1';
                const watermark = clonedDocument.createElement('div');
                watermark.className = 'watermark-overlay'; // Dùng CSS đã định nghĩa
                watermark.innerText = 'Bản quyền của Tân';
                clonedDocument.body.innerHTML = ''; // Xóa sạch
                clonedDocument.body.appendChild(contentWrapper); // Thêm gói nội dung
                clonedDocument.body.appendChild(watermark); // Thêm watermark (đè lên trên)
            }

        }).then(canvas => {

            // Chuyển canvas sang Blob (dạng file ảnh)
            canvas.toBlob(function (blob) {
                if (blob) {
                    try {
                        // Dùng Clipboard API để copy ảnh
                        navigator.clipboard.write([
                            new ClipboardItem({
                                'image/png': blob
                            })
                        ]);

                        // Phản hồi thành công
                        button.innerHTML = '✅'; // Đã copy!
                        setTimeout(() => {
                            button.innerHTML = originalButtonContent;
                        }, 2000);

                    } catch (error) {
                        console.error('Lỗi khi sao chép vào clipboard:', error);
                        alert('Không thể sao chép. Lỗi: ' + error.message);
                        button.innerHTML = '❌'; // Lỗi
                        setTimeout(() => {
                            button.innerHTML = originalButtonContent;
                        }, 2000);
                    }
                } else {
                    alert('Không thể tạo ảnh.');
                }
            }, 'image/png');

        }).catch(err => {
            // Xử lý nếu html2canvas thất bại
            console.error('html2canvas thất bại:', err);
            alert('Không thể chụp ảnh thẻ. Lỗi: ' + err.message);
            button.innerHTML = '❌';
            setTimeout(() => {
                button.innerHTML = originalButtonContent;
            }, S000);
        });
    }

}); // Hết DOMContentLoaded
