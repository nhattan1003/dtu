// script.js

document.addEventListener("DOMContentLoaded", function () {

    let searchTimer;
    const noResultTimeout = 3000;
    const noDataMessage = "Vui lòng liên hệ: <a href='https://t.me/babyhaituoi' target='_blank'>https://t.me/babyhaituoi</a>, <a href='https://t.me/Dai_Hoc_Duy_Tan' target='_blank'>https://t.me/Dai_Hoc_Duy_Tan</a>";
    const welcomeMessage = ""; // Trống

    const searchInput = document.getElementById("searchInput");
    const resultDisplay = document.getElementById("resultDisplay");
    const clearButton = document.getElementById("clearButton");
    const suggestionsWrapper = document.getElementById("suggestionsWrapper");

    let suggestionActiveIndex = -1;

    // --- 1. CHỨC NĂNG NÚT X ---
    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        clearButton.style.display = "none";
        searchInput.focus();
        resultDisplay.innerHTML = welcomeMessage;
        suggestionsWrapper.style.display = "none";
        suggestionActiveIndex = -1;
        clearTimeout(searchTimer);
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
                            <div class="result-answer">${match.answer}</div>
                            <div class="result-keywords">
                                <strong>Từ khóa liên quan:</strong>
                                ${keywordsHtml}
                            </div>
                        </div>`;
                }).join('');
                resultDisplay.innerHTML = formattedAnswer;
            } else {
                resultDisplay.innerHTML = "Xin lỗi, tôi không tìm thấy thông tin cho từ khóa: '<strong>" + query + "</strong>'. Vui lòng thử lại.";
                searchTimer = setTimeout(() => {
                    resultDisplay.innerHTML = noDataMessage;
                }, noResultTimeout);
            }
        } else {
            clearButton.style.display = "none";
            resultDisplay.innerHTML = welcomeMessage;
        }
    });

    // --- 3. HÀM TÌM KIẾM ĐÁP ÁN ---
    function performSearch() {
        const query = normalizeText(searchInput.value);
        if (query === "") return null;
        let matches = [];
        let maxScore = 0;
        for (const item of qaData) {
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
        for (const item of qaData) {
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

    // --- 8. XỬ LÝ CLICK TỪ KHÓA LIÊN QUAN ---
    resultDisplay.addEventListener('click', function (event) {
        if (event.target.classList.contains('related-keyword-tag')) {
            const keyword = event.target.textContent;
            searchInput.value = keyword;
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchInput.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // --- 9. HÀM MỚI: ẨN/HIỆN HEADER KHI CUỘN (ĐÃ AN TOÀN HƠN) ---
    const headerContainer = document.querySelector('.header-container');

    // *** THAY ĐỔI: Thêm kiểm tra 'if' để tránh lỗi ***
    if (headerContainer) {
        let lastScrollTop = 0;
        // Lấy chiều cao header sau khi DOM render xong
        const headerHeight = headerContainer.offsetHeight;

        window.addEventListener("scroll", function () {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (Math.abs(scrollTop - lastScrollTop) <= headerHeight / 4) {
                return;
            }

            if (scrollTop > lastScrollTop && scrollTop > headerHeight * 2) {
                // Cuộn xuống -> Ẩn Header
                headerContainer.classList.add('header-hidden');
            } else {
                // Cuộn lên -> Hiện Header
                headerContainer.classList.remove('header-hidden');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    } else {
        // Báo lỗi nếu không tìm thấy header (để bạn biết nếu HTML bị sai)
        console.error("Lỗi: Không tìm thấy '.header-container' trong tệp HTML.");
    }

}); // Hết DOMContentLoaded
