window.onload = function(){
    let columns = document.querySelectorAll(".maindiv");
    let index = 0;
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.startsWith("manga_"))
            {
                let manga = JSON.parse(localStorage.getItem(key));
                if(!manga.createdYear) 
                    {
                        manga.createdYear = manga.year;
                        manga.createdMonth = manga.month;
                        manga.createdDay = manga.day;
                        localStorage.setItem(key, JSON.stringify(manga));
                    }
                let card = document.createElement("div");
                card.classList.add("card");
                let title = document.createElement("div");
                title.classList.add("titletext");
                title.textContent = manga.title;
                let date = document.createElement("div");
                date.classList.add("subtext");
                date.textContent =
                "登録日：" + manga.createdYear + "年" + manga.createdMonth + "月" + manga.createdDay + "日";
                let volume = document.createElement("div");
                volume.classList.add("subtext");
                volume.textContent = "所持巻：1巻〜" + manga.volume + "巻";
                card.appendChild(title);
                card.appendChild(date);
                card.appendChild(volume);
                card.onclick = function(){
                    sessionStorage.setItem("mangaData", JSON.stringify(manga));
                    location.href = "詳細画面.html";
                };
                columns[index % 3].appendChild(card);
                index++;
        }
    }
};