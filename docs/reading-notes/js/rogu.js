window.onload = function(){
    let container = document.getElementById("rightdiv");
    let logs = [];
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(!key.startsWith("page_"))continue;
        let log = JSON.parse(localStorage.getItem(key));
        logs.push(log);
    }
    let grouped = {};
    logs.forEach(function (log){
        if(!grouped[log.title]) 
            {
                grouped[log.title] = [];
            }
        grouped[log.title].push(log);
    });
    for(let title in grouped) 
        {
            let header = document.createElement("div");
            header.classList.add("log-header");
            header.textContent = title;
            let groupBox = document.createElement("div");
            groupBox.classList.add("log-group");
            grouped[title].sort(function (a, b) 
                {
                    return b.id - a.id;
                });
            grouped[title].forEach(function (log)
                {
                let card = createLogCard(log);
                groupBox.appendChild(card);
            });
            header.addEventListener("click", function() 
                {
                    header.classList.toggle("open");
                    if(groupBox.style.maxHeight) 
                        {
                            groupBox.style.maxHeight = null;
                        } 
                    else{
                            groupBox.style.maxHeight = groupBox.scrollHeight + "px";
                        }
                });
            container.appendChild(header);
            container.appendChild(groupBox);
        }
    };
function createLogCard(log){
    let card = document.createElement("div");
    card.classList.add("log-card");
    let day = document.createElement("div");
    day.classList.add("log-date");
    day.textContent = log.year + "/" + log.month + "/" + log.day;
    let range = document.createElement("div");
    range.classList.add("log-range");
    range.textContent = log.volume + "巻 " + log.pages + "ページまで";
    card.appendChild(day);
    card.appendChild(range);
    if(log.memo && log.memo.trim() !== "") 
        {
            let memo = document.createElement("div");
            memo.classList.add("log-memo");
            memo.textContent = log.memo;
            card.appendChild(memo);
        }
    return card;
}