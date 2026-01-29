function setToday(){
    let today = new Date();
    document.getElementById("year").value = today.getFullYear();
    document.getElementById("month").value = today.getMonth() + 1;
    document.getElementById("day").value = today.getDate();
}
function resetForm(){
    document.querySelector("form").reset();
    setToday();
    let select = document.getElementById("sakuhinname");
    select.value = ""; 
    validateBuyForm();
}
window.onload = function (){
    setToday();
    validateBuyForm();
    let select = document.getElementById("sakuhinname");
    let first = document.createElement("option");
    first.value = "";
    first.textContent = "選択してください";
    first.disabled = true;
    first.selected = true;
    select.appendChild(first);
    for (let i = 0; i < localStorage.length; i++) {
        let select = this.document.getElementById("sakuhinname");
        let key = localStorage.key(i);
        if (!key.startsWith("manga_")) continue;
        let manga = JSON.parse(localStorage.getItem(key));
        if (!manga || !manga.title) continue;
        let option = document.createElement("option");
        option.value = manga.title;
        option.textContent = manga.title;
        select.appendChild(option);
    }
}
function validateBuyForm(){
    let title = document.getElementById("sakuhinname").value;
    let volume = document.getElementById("volume").value;
    let pages = document.getElementById("pages").value;
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day").value;
    let sintyoku = document.querySelector("input[name='sintyoku']:checked");
    let submitBtn = document.querySelector(".submitbutton");
    let isValid =
        title.length > 0 &&
        volume.length > 0 &&
        pages.length > 0 &&
        year.length > 0 &&
        month.length > 0 &&
        day.length > 0 &&
        sintyoku;
    submitBtn.disabled = !isValid;
}
function onTitleChange(){
    let title = document.getElementById("sakuhinname").value;
    if (!title) return;
    let mangaKey = "manga_" + title;
    let manga = JSON.parse(localStorage.getItem(mangaKey));
    let radio = document.querySelector(`input[name='sintyoku'][value='${manga.sintyoku}']`);
    if (radio) radio.checked = true;
    if (!manga) return;
    document.getElementById("volume").max = manga.volume;
    validateBuyForm();
}
function savePageRecord(){
    let title = document.getElementById("sakuhinname").value;
    let volume = Number(document.getElementById("volume").value);
    let pages = Number(document.getElementById("pages").value);
    let year = Number(document.getElementById("year").value);
    let month = Number(document.getElementById("month").value);
    let day = Number(document.getElementById("day").value);
    let sintyoku = document.querySelector("input[name='sintyoku']:checked").value;
    let memo = document.getElementById("memo").value;
    let record = {
        id: Date.now(),
        title: title,
        volume: volume,
        pages: pages,
        year: year,
        month: month,
        day: day,
        sintyoku: sintyoku, 
        memo: memo
    };
    let key = "page_" + record.id;
    localStorage.setItem(key, JSON.stringify(record));
    let mangaKey = "manga_" + title;
    let manga = JSON.parse(localStorage.getItem(mangaKey));
    if (manga) 
        {
            manga.sintyoku = sintyoku;
            localStorage.setItem(mangaKey, JSON.stringify(manga));
        }
   location.href='新規漫画登録3.html'
}