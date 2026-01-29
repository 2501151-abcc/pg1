window.onload = function (){
    let data = sessionStorage.getItem("mangaData");
    let manga = JSON.parse(data);
    document.getElementById("h1").textContent = manga.title;
    document.getElementById("author").textContent = manga.author;
    document.getElementById("publisher").textContent = manga.publisher;
    document.getElementById("date").textContent = manga.year + "年" + manga.month + "月" + manga.day + "日";
    document.getElementById("volume").textContent = "1巻〜" + manga.volume + "巻";
    let sintyokuJP = "";
    if  (manga.sintyoku == "planned")
        {
            sintyokuJP = "購入予定";
        }
        else if (manga.sintyoku == "unread")
        {
            sintyokuJP = "未読";
        }
        else if (manga.sintyoku == "reading")
        {
            sintyokuJP = "読書中";
        }
        else if (manga.sintyoku == "finished")
        {
            sintyokuJP = "読了";
        }
    document.getElementById("sintyoku").textContent = sintyokuJP;
    let genreJP = "";
    if (manga.genre == "action")
        {
            genreJP = "アクション・バトル";
        }
        else if (manga.genre == "suspense")
        {
            genreJP = "サスペンス・ミステリー";
        }
        else if (manga.genre == "love")
        {
            genreJP = "恋愛・日常";
        }
        else if (manga.genre == "comedy")
        {
            genreJP = "コメディ";
        }
        else if (manga.genre == "youth")
        {
            genreJP = "学園・青春";
        }
        else if (manga.genre == "SF")
        {
            genreJP = "SF・未来";
        }
        else if (manga.genre == "history")
        {
            genreJP = "歴史・時代劇";
        }
        else if (manga.genre == "entertainment")
        {
            genreJP = "エンタメ";
        }
        else if (manga.genre == "horror")
        {
            genreJP = "ホラー";
        }
    document.getElementById("genre").textContent = genreJP;
    document.getElementById("memo").textContent = manga.memo;
};