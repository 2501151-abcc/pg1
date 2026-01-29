window.onload = function () {
    let manga = JSON.parse(sessionStorage.getItem("mangaData"));
    document.getElementById("title").value = manga.title;
    document.getElementById("publisher").value = manga.publisher;
    document.getElementById("year").value = manga.year;
    document.getElementById("month").value = manga.month;
    document.getElementById("day").value = manga.day;
    let radio = document.querySelector(`input[name='sintyoku'][value='${manga.sintyoku}']`);
    if (radio) radio.checked = true;
    document.getElementById("author").value = manga.author;
    document.getElementById("startVolume").value = manga.startVolume;
    document.getElementById("endVolume").value = manga.volume;
    document.getElementById("genre").value = manga.genre;
    document.getElementById("memo").value = manga.memo;
};
function saveManga() {
    let manga =
    {
        id: Date.now(),
        title: document.getElementById("title").value,
        publisher: document.getElementById("publisher").value,
        createdYear: document.getElementById("year").value,
        createdMonth: document.getElementById("month").value,
        createdDay: document.getElementById("day").value,
        year: document.getElementById("year").value,
        month: document.getElementById("month").value,
        day: document.getElementById("day").value,
        sintyoku: document.querySelector("input[name='sintyoku']:checked").value,
        author: document.getElementById("author").value,
        startVolume: Number(document.getElementById("startVolume").value),
        prevVolume: Number(document.getElementById("endVolume").value),
        volume: Number(document.getElementById("endVolume").value),
        genre: document.getElementById("genre").value,
        memo: document.getElementById("memo").value
    };
    let key = "manga_" + manga.title;
    localStorage.setItem(key, JSON.stringify(manga));
    location.href = "新規漫画登録3.html";
}
function clearDataAndGoHome() {
    sessionStorage.removeItem("mangaData");
    location.href = '../index.html';
}