function setToday(){
    let today = new Date();
    document.getElementById("year").value = today.getFullYear();
    document.getElementById("month").value = today.getMonth() + 1;
    document.getElementById("day").value = today.getDate();
}
window.addEventListener("DOMContentLoaded", function(){
    setToday();
    let saved = sessionStorage.getItem("mangaData");
    if(saved)
    {
        let manga = JSON.parse(saved);
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
        validateForm();
        return;
    }
    validateForm();
});
function resetForm(){
    document.querySelector("form").reset();
    setToday();
    validateForm();
}
function validateForm(){
    let title = document.getElementById("title").value;
    let publisher = document.getElementById("publisher").value;
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day").value;
    let sintyoku = document.querySelector("input[name='sintyoku']:checked");
    let author = document.getElementById("author").value;
    let startVolume = document.getElementById("startVolume").value;
    let endVolume = document.getElementById("endVolume").value;
    let genre = document.getElementById("genre").value;
    let isValid =
        title.length > 0 &&
        publisher.length > 0 &&
        year.length > 0 &&
        month.length > 0 &&
        day.length > 0 &&
        sintyoku !== null &&
        author.length > 0 &&
        startVolume.length > 0 &&
        endVolume.length > 0 &&
        genre.length > 0;
    let submitBtn = document.querySelector(".submitbutton");
    submitBtn.disabled = !isValid;
}
function saveManga(){
    let manga = {
        id : Date.now(),
        title : document.getElementById("title").value,
        publisher : document.getElementById("publisher").value,
        year : document.getElementById("year").value,
        month : document.getElementById("month").value,
        day : document.getElementById("day").value,
        sintyoku : document.querySelector("input[name='sintyoku']:checked").value,
        author : document.getElementById("author").value,
        startVolume : Number(document.getElementById("startVolume").value),
        prevVolume : Number(document.getElementById("endVolume").value),
        volume : Number(document.getElementById("endVolume").value),
        genre : document.getElementById("genre").value,
        memo : document.getElementById("memo").value
    };
    sessionStorage.setItem("mangaData", JSON.stringify(manga));
    location.href = "新規漫画登録2.html";
}
function clearDataAndGoHome(){
    sessionStorage.removeItem("mangaData");
    location.href='../index.html';
}