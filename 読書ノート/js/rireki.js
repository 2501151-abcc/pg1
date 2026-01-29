window.onload = function(){
    let container = document.getElementById("rightdiv");
    let list = document.createElement("div");
    list.classList.add("rireki-list");
    container.appendChild(list);
    let records = [];
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.startsWith("buy_")) 
            {
                let record = JSON.parse(localStorage.getItem(key));
                if(record.startVolume == undefined) 
                    {
                        record.startVolume = record.volume;
                        localStorage.setItem(key, JSON.stringify(record));
                    }
                records.push(record);
            }
        }
    records.sort(function(a, b){
        return b.id - a.id;
    });
    records.forEach(function(record){
        let card = createRecordCard(record);
        list.appendChild(card);
    });
};
function createRecordCard(record){
    let card = document.createElement("div");
    card.classList.add("rireki-card");
    let day = document.createElement("div");
    day.classList.add("rireki-date");
    day.textContent = record.year + "/" + record.month + "/" + record.day;
    let title = document.createElement("div");
    title.classList.add("rireki-title-text");
    title.textContent = record.title;
    let volume = document.createElement("div");
    volume.classList.add("rireki-sub");
    volume.textContent = formatVolume(record);
    card.appendChild(day);
    card.appendChild(title);
    card.appendChild(volume);
    if(record.memo && record.memo.trim() !== "") 
        {
            let memo = document.createElement("div");
            memo.classList.add("rireki-memo");
            memo.textContent = "メモ：" + record.memo;
            card.appendChild(memo);
        }
    return card;
}
function formatVolume(record){
    let start = Number(record.startVolume);
    let end = Number(record.volume);
    if(start == end)
        {
            return end + "巻";
        }
    let count = end - start + 1;
    return start + "巻〜" + end + "巻（" + count + "冊）";
}