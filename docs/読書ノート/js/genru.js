window.onload = function () {
    let container = document.getElementById("rightdiv");
    let genreMap = {
        "action": "アクション・バトル",
        "suspense": "サスペンス・ミステリー",
        "love": "恋愛・日常",
        "comedy": "コメディ",
        "youth": "学園・青春",
        "SF": "SF・未来",
        "history": "歴史・時代劇",
        "entertainment": "エンタメ",
        "horror": "ホラー"
    };
    let mangas = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!key.startsWith("manga_")) 
            {
                continue;
            }
        let manga = JSON.parse(localStorage.getItem(key));
        mangas.push(manga);
    }
    let grouped = {};
    mangas.forEach(function (manga) {
        let genre = manga.genre || "other";
        if (!grouped[genre]) 
            {
                grouped[genre] = [];
            }
        grouped[genre].push(manga);
    });
    for (let genre in grouped) {
        let displayGenre = genreMap[genre] || genre;
        let header = document.createElement("div");
        header.classList.add("genre-header");
        header.textContent = displayGenre;
        let groupBox = document.createElement("div");
        groupBox.classList.add("genre-group");
        grouped[genre].forEach(function (manga) {
            let item = createGenreItem(manga);
            groupBox.appendChild(item);
        });
        header.addEventListener("click", function () {
            header.classList.toggle("open");
            if (groupBox.style.maxHeight) 
                {
                    groupBox.style.maxHeight = null;
                } 
            else 
                {
                    groupBox.style.maxHeight = groupBox.scrollHeight + "px";
                }
        });
        container.appendChild(header);
        container.appendChild(groupBox);
    }
};
function createGenreItem(manga) {
    let item = document.createElement("div");
    item.classList.add("genre-item");
    let dot = document.createElement("span");
    dot.classList.add("dot");
    if (manga.sintyoku == "finished" || Number(manga.sintyoku) >= manga.volume) 
        {
            dot.style.backgroundColor = "#4CAF50";
        } 
    else if (manga.sintyoku == "reading") 
        {
            dot.style.backgroundColor = "#2196F3";
        } 
    else 
        {
            dot.style.backgroundColor = "#9E9E9E";
        }
    let title = document.createElement("span");
    title.classList.add("title");
    title.textContent = manga.title;
    let status = document.createElement("span");
    status.classList.add("status");
    let read = Number(manga.sintyoku);
    if (!isNaN(read)) 
        {
            if (read >= manga.volume) 
                {
                    status.textContent = "全巻読了";
                } 
            else 
                {
                    status.textContent = read + "巻まで読了";
                }
        } 
    else 
        {
            if (manga.sintyoku == "finished") 
                {
                    status.textContent = "全巻読了";
                } 
            else if (manga.sintyoku == "reading") 
                {
                    status.textContent = "読書中";
                } 
            else 
                {
                    status.textContent = "未読";
            }
        }
    let line1 = document.createElement("div");
    line1.classList.add("manga-title-line");
    line1.appendChild(dot);
    line1.appendChild(title);
    line1.appendChild(status);
    let detail = document.createElement("div");
    detail.classList.add("manga-detail");
    let lastDate = manga.year + "/" + ("0" + manga.month).slice(-2) + "/" + ("0" + manga.day).slice(-2);
    detail.textContent = "作者：" + manga.author + " / 全" + manga.volume + "巻" + " / 最終読了：" + lastDate;
    item.appendChild(line1);
    item.appendChild(detail);
    return item;
}