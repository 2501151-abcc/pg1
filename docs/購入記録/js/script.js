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
    document.getElementById("lastBuyInfo").textContent = "";
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

function onTitleChange(){
    let title = document.getElementById("sakuhinname").value;
    if (!title) return;

    let mangaKey = "manga_" + title;
    let manga = JSON.parse(localStorage.getItem(mangaKey));

    if (manga && manga.volume){
        document.getElementById("volume").value = Number(manga.volume) + 1;
    }

    showLastBuyInfo(title);
    validateBuyForm();
}

function showLastBuyInfo(title){
    let infoArea = document.getElementById("lastBuyInfo");
    if (!title){
        infoArea.textContent = "";
        return;
    }

    let mangaKey = "manga_" + title;
    let manga = JSON.parse(localStorage.getItem(mangaKey));
    if (!manga){
        infoArea.textContent = "";
        return;
    }

    let dateText = manga.year + "/" + ("0" + manga.month).slice(-2) + "/" + ("0" + manga.day).slice(-2);
    let text = "";

    if (manga.startVolume && manga.startVolume < manga.volume){
        text = "直近の購入：" + dateText + "（" + manga.startVolume + "巻～" + manga.volume + "巻）";
    }
    else if (manga.volume == manga.prevVolume + 1){
        text = "直近の購入：" + dateText + "（" + manga.volume + "巻）";
    }
    else if (manga.volume > manga.prevVolume + 1){
        text = "直近の購入：" + dateText + "（" + (manga.prevVolume + 1) + "巻～" + manga.volume + "巻）";
    }
    else{
        text = "直近の購入：" + dateText + "（" + manga.volume + "巻）";
    }

    infoArea.textContent = text;
}

function validateBuyForm(){
    let title = document.getElementById("sakuhinname").value;
    let volume = document.getElementById("volume").value;
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day").value;

    let submitBtn = document.querySelector(".submitbutton");

    let isValid =
        title.length > 0 &&
        volume.length > 0 &&
        year.length > 0 &&
        month.length > 0 &&
        day.length > 0;

    submitBtn.disabled = !isValid;
}

function saveBuyData() {
    var title = document.getElementById("sakuhinname").value;
    var volume = Number(document.getElementById("volume").value);
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var memo = document.getElementById("memo").value;

    var mangaKey = "manga_" + title;
    var manga = JSON.parse(localStorage.getItem(mangaKey));

    var startVolume = 1;

    if (manga)
    {
        manga.prevVolume = Number(manga.volume);
        manga.startVolume = manga.prevVolume + 1;
        manga.volume = volume;

        manga.year = year;
        manga.month = month;
        manga.day = day;

        localStorage.setItem(mangaKey, JSON.stringify(manga));

        startVolume = manga.prevVolume + 1;
    }

    var buyRecord = {
        id: Date.now(),
        title: title,
        startVolume: startVolume, 
        volume: volume,
        year: year,
        month: month,
        day: day,
        memo: memo
    };

    var recordKey = "buy_" + Date.now();
    localStorage.setItem(recordKey, JSON.stringify(buyRecord));
   location.href='新規漫画登録3.html'
}