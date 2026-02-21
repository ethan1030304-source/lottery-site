let serialTop = 224500000000;
let serialPeriod = 11500815652431;

function addTicket(){
    let div = document.createElement('div');
    div.innerHTML = `
        <input placeholder="01,02,03,04,05">
        <button onclick="randomOne(this)">🎲</button>
    `;
    document.getElementById('inputs').appendChild(div);
    updateTotal();
}

function randomNum(){
    let s = new Set();
    while(s.size<5){
        s.add(String(Math.floor(Math.random()*39+1)).padStart(2,'0'));
    }
    return [...s].join(',');
}

function randomOne(btn){
    btn.previousElementSibling.value = randomNum();
}

function randomAll(){
    document.querySelectorAll('#inputs input').forEach(i=>{
        i.value = randomNum();
    });
}

function updateTotal(){
    let count = document.querySelectorAll('#inputs input').length;
    document.getElementById('total').innerText = count * 50;
}

function getNow(){
    let n = new Date();
    let y = n.getFullYear()-1911;
    let m = String(n.getMonth()+1).padStart(2,'0');
    let d = String(n.getDate()).padStart(2,'0');
    let h = String(n.getHours()).padStart(2,'0');
    let min = String(n.getMinutes()).padStart(2,'0');
    let s = String(n.getSeconds()).padStart(2,'0');
    return `${y}/${m}/${d} ${h}:${min}:${s}`;
}

function generateAll(){
    let area = document.getElementById('printArea');
    area.innerHTML = "";

    document.querySelectorAll('#inputs input').forEach(input=>{
        let nums = input.value.split(',');

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.src = 'ticket.png';

        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img,0,0);
            ctx.fillStyle="black";

            ctx.fillText(serialTop,120,130);
            serialTop++;

            let drawDate = document.getElementById('drawDate').value;
            ctx.fillText("開獎："+drawDate,120,170);

            ctx.fillText("期別："+serialPeriod,120,200);
            serialPeriod++;

            let y=260;
            nums.forEach((n,i)=>{
                ctx.fillText((i+1)+") "+n.trim(),120,y);
                y+=50;
            });

            ctx.fillText("自選$50",500,240);
            ctx.fillText("時間："+getNow(),120,y+40);
        };

        let div = document.createElement('div');
        div.className="ticket";
        div.appendChild(canvas);

        area.appendChild(div);
    });

    updateTotal();
}

function printPage(){
    setTimeout(()=>window.print(),300);
}