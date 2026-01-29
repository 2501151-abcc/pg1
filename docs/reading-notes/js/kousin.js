window.onload = function(){
    loadMangaList();
};
function loadMangaList(){
    let select = document.getElementById("mangaSelect");
    for (let key in localStorage){
        if (key.indexOf("manga_") == 0)     
            {
                let manga = JSON.parse(localStorage.getItem(key));
                let option = document.createElement("option");
                option.value = manga.title;
                option.textContent = manga.title;
                select.appendChild(option);
            }
    }
    select.addEventListener("change", onSelect);
}
function onSelect(){
    let title = document.getElementById("mangaSelect").value;
    let key = "manga_" + title;
    let manga = JSON.parse(localStorage.getItem(key));
    if (!manga) 
        {
            alert("データが見つかりません");
            return;
        }
    document.getElementById("publisher").value = manga.publisher;
    document.getElementById("year").value = manga.year;
    document.getElementById("month").value = manga.month;
    document.getElementById("day").value = manga.day;

    let radios = document.getElementsByName("sintyoku");
    for (let i = 0; i < radios.length; i++){
        if (radios[i].value === manga.sintyoku) 
            {
                radios[i].checked = true;
            }
    }
    document.getElementById("author").value = manga.author;
    document.getElementById("startVolume").value = 1;
    document.getElementById("endVolume").value = manga.volume;
    document.getElementById("genre").value = manga.genre;
    document.getElementById("memo").value = manga.memo;
    enableInputs();
}
function enableInputs() {
    let elements = document.querySelectorAll("input, select");
    for (let i = 0; i < elements.length; i++){
        elements[i].disabled = false;
    }
}
document.getElementById("saveBtn").onclick = function () {
    let title = document.getElementById("mangaSelect").value;
    let key = "manga_" + title;

    let radios = document.getElementsByName("sintyoku");
    let sintyokuValue = null;
    for (let i = 0; i < radios.length; i++){
        if(radios[i].checked) 
            {
                sintyokuValue = radios[i].value;
            }
    }
    let updated = 
    {
        id: Date.now(),
        title: title,
        publisher: document.getElementById("publisher").value,
        year: document.getElementById("year").value,
        month: document.getElementById("month").value,
        day: document.getElementById("day").value,
        sintyoku: sintyokuValue,
        author: document.getElementById("author").value,
        startVolume: 1,
        volume: Number(document.getElementById("endVolume").value),
        genre: document.getElementById("genre").value,
        memo: document.getElementById("memo").value
    };
    localStorage.setItem(key, JSON.stringify(updated));
    alert("変更を保存しました");
};
document.getElementById("deleteBtn").onclick = function(){
    let title = document.getElementById("mangaSelect").value;
    let key = "manga_" + title;
    if(!title) 
        {
            alert("作品が選択されていません");
            return;
        }
    if(confirm("本当に削除しますか？")) 
        {
            localStorage.removeItem(key);
            alert("削除しました");
            location.reload();
        }
};