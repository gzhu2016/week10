//Canvas初始化
var canvas = document.getElementById("canvas");
canvas.width = 375;
canvas.height = 667;
var context = canvas.getContext("2d");
context.fillStyle = "#ebebeb";
context.fillRect(0, 0, canvas.width, canvas.height);
drawBackGround(context);

//点击按钮生成界面
function generate(cxt) {
    var hisName = document.getElementById('hisName');
    cxt.beginPath();
    cxt.font = 'lighter 18px STHeitiSC-Light';
    cxt.textAlign = 'center';
    cxt.textBaseline = 'top';
    cxt.fillStyle = '#ffffff';
    cxt.fillText(hisName.value, 187, 32);

    cxt.textAlign = 'left';
    var chk = new Array(7);
    var select = new Array(7);
    var content = new Array(7);
    var dis = 0
    for (var i = 1; i < 8; i++) {
        if (i == 1) {
            dis = 20 + 43 + 16;
        } else {
            dis = dis + 20 + 40;
        }

        chk[i] = document.getElementById('chk' + i);
        select[i] = document.getElementById('select' + i);
        content[i] = document.getElementById('cnt' + i);

        if (chk[i].checked) {
            var index = select[i].selectedIndex;
            if (index == 0) {
                drawMyMessage(cxt, content[i].value, dis);
            } else {
                drawHisMessage(cxt, content[i].value, dis);
            }
        }
    }
}

//绘制背景
function drawBackGround(cxt) {
    cxt.beginPath();
    var grd = cxt.createLinearGradient(0, 0, 0, 63);
    grd.addColorStop(0.0, '#221f25');
    grd.addColorStop(1.0, '#454545');
    cxt.fillStyle = grd;
    cxt.fillRect(0, 0, 375, 63);

    var bar = new Image();
    bar.src = './image/bar.png';
    bar.onload = function() {
        cxt.drawImage(bar, 5, 0);
    }

    var inputbar = new Image();
    inputbar.src = './image/inputbar.png';
    inputbar.onload = function() {
        cxt.drawImage(inputbar, 0, 619);
    }

    var back = new Image();
    back.src = './image/back.png';
    back.onload = function() {
        cxt.drawImage(back, 0, 16)
    }

    var person = new Image();
    person.src = './image/person.png';
    person.onload = function() {
        cxt.drawImage(person, 336, 16)
    }

    cxt.beginPath();
    cxt.font = 'lighter 16px Heiti SC';
    cxt.fillStyle = '#ffffff';
    cxt.fillText('微信', 24, 46);

    //!!增加聊天背景图片
    var backGround = new Image();
    backGround.src = './image/bg.jpg';
    backGround.onload = function() {
        cxt.drawImage(backGround, 0, 63);
    }

}
//绘制绿色气泡
function drawMyChat(cxt, x, y, w, h, r) {
    cxt.beginPath();
    cxt.moveTo(x + r, y);
    cxt.lineTo(x + w - r, y) ;
    cxt.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);
    cxt.lineTo(x + w, y + r + 12);
    cxt.lineTo(x + w + 6, y + r + 12 + 3);
    cxt.lineTo(x + w, y + r + 12 + 6);
    cxt.lineTo(x + w, y + h - r);
    cxt.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);
    cxt.lineTo(x + r, y + h) ;
    cxt.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);
    cxt.lineTo(x, y + r);
    cxt.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI);

    cxt.lineWidth = 1;
    cxt.strokeStyle = '#9edb5d';
    cxt.stroke();
    cxt.fillStyle = '#a4ea5c';
    cxt.fill();
}

//绘制白色气泡
function drawHisChat(cxt, x, y, w, h, r) {
    cxt.beginPath();
    cxt.moveTo(x + r, y) ;
    cxt.lineTo(x + w - r, y) ;
    cxt.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);
    cxt.lineTo(x + w, y + h - r);
    cxt.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);
    cxt.lineTo(x + r, y + h) ;
    cxt.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);
    cxt.lineTo(x, y + r + 12 + 6);
    cxt.lineTo(x - 6, y + r + 12 + 3);
    cxt.lineTo(x, y + r + 12);
    cxt.lineTo(x, y + r);
    cxt.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI);

    cxt.lineWidth = 1;
    cxt.strokeStyle = '#fafafa';
    cxt.stroke();
    cxt.fillStyle = '#ffffff';
    cxt.fill();
}

//根据文本内容生成右边的绿色气泡
function drawMyMessage(cxt, msg, y) {
    cxt.beginPath();
    var myHead = new Image();
    myHead.src = document.getElementById('imgHead1').src;
    myHead.onload = function() {
        cxt.drawImage(myHead, 375 - 6 - 40, y);
    }

    cxt.beginPath();
    cxt.font = '16px STHeitiSC-Light';
    var msgLength = cxt.measureText(msg).width;
    drawMyChat(cxt, 375 - 40 - 10 - 4 - msgLength - 24, y, msgLength + 24, 40, 5);

    cxt.textBaseline = 'top';
    cxt.fillStyle = 'black';
    cxt.fillText(msg, 375 - 40 - 10 - 4 - msgLength - 24 + 12, y + 12);
}

//根据文本内容生成左边的白色气泡
function drawHisMessage(cxt, msg, y) {
    cxt.beginPath();
    var hisHead = new Image();
    hisHead.src = document.getElementById('imgHead2').src;
    hisHead.onload = function() {
        cxt.drawImage(hisHead, 6, y)
    }

    cxt.beginPath();
    cxt.font = '16px STHeitiSC-Light';
    var msgLength = cxt.measureText(msg).width;
    drawHisChat(cxt, 40 + 10 + 4, y, msgLength + 24, 40, 5);
    cxt.textBaseline = 'top';
    cxt.fillStyle = 'black';
    cxt.fillText(msg, 40 + 10 + 4 + 12, y + 12);
}

