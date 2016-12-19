// canvas 初始化
var canvas = document.getElementById("canvas");
canvas.width = 375;
canvas.height = 667;
var context = canvas.getContext("2d");
var nexty;

drawBackGround(context);

/**
 * 点击按钮生成界面
 * @param  {[type]} cxt [画笔]
 * @return {[type]}
 */
function generate(cxt) {
    // 得到HTML中id为hisName的文本输入框
    var itsName = document.getElementById("itsName");
    nexty=40;

    drawBackGround(cxt);

    cxt.beginPath();
    // 绘制状态栏上对方的昵称
    cxt.font = 'lighter 18px STHeitiSC-Light';
    // 文本水平居中
    cxt.textAlign = 'center';
    cxt.textBaseline = 'top';
    cxt.fillStyle = '#ffffff';
    // hisName.value为'hisName'内文本输入框的内容
    cxt.fillText(itsName.value, 187, 32);

    // 设置文本固定点为左上角（方便绘制气泡文本）
    cxt.textAlign ="left";

    for(var i=1;i<=7;i++) {
        var chk=document.getElementById("chk"+i);
        var select=document.getElementById("select"+i);
        var content=document.getElementById("cnt"+i);

        if(chk.checked) {
            var index=select.selectedIndex;
            if(index==0) {
                drawMsgChat(cxt,content.value,nexty+39,true);
            }
            else {
                drawMsgChat(cxt,content.value,nexty+39,false);
            }
        }
    }
}


/**
 * 绘制背景
 * @param  {[type]} cxt [description]
 * @return {[type]}
 */
function drawBackGround(cxt) {
    context.fillStyle = "#ebebeb";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制状态栏背景
    cxt.beginPath();
    var grd = cxt.createLinearGradient(0, 0, 0, 63);
    grd.addColorStop(0.0, "#221f25");
    grd.addColorStop(1.0, "#454545");
    cxt.fillStyle = grd;
    cxt.fillRect(0, 0, 375, 63);

    // 绘制电量状态栏
    var bar = new Image();
    bar.src = "./imgs/bar.png";
    bar.onload = function() {
        cxt.drawImage(bar, 5, 0)
    };

    // 绘制输入框
    var inputbar = new Image();
    inputbar.src = "./imgs/inputbar.png";
    inputbar.onload = function() {
        cxt.drawImage(inputbar, 0, 619)
    };

    // 绘制左上角返回按钮
    var back = new Image();
    back.src = "./imgs/back.png";
    back.onload = function() {
        cxt.drawImage(back, 0, 16)
    };

    // 绘制右上角个人中心按钮
    var person = new Image();
    person.src = "./imgs/person.png";
    person.onload = function() {
        cxt.drawImage(person, 336, 16)
    };

    // 绘制左上角的“微信”
    cxt.beginPath();
    cxt.font = "lighter 16px Heiti SC";
    cxt.fillStyle = "#ffffff";
    cxt.textBaseline="alphabetic";
    cxt.fillText('微信', 24, 45)
}

/**
 * 绘制圆角矩形
 * @param  {[context]} cxt [画笔-上下文环境]
 * @param  {[double]} x   [圆角矩形左上角顶点x坐标]
 * @param  {[double]} y   [圆角矩形左上角顶点y坐标]
 * @param  {[double]} w   [圆角矩形的宽度]
 * @param  {[double]} h   [圆角矩形的高度]
 * @param  {[double]} r   [圆角矩形四角弧度的半径]
 * @return {[null]}
 */
function drawCorRect(cxt,x,y,w,h,r,t)
{
    cxt.beginPath();
    cxt.moveTo(x+r,y);//A
    cxt.lineTo(x+w-r,y);//B
    cxt.arc(x+w-r, y+r, r, 1.5 * Math.PI, 2 * Math.PI);
    cxt.lineTo(x+w, y+r+15-3);//C
    if(t==true)
    {
        cxt.lineTo(x+w+8,y+r+15);
        cxt.lineTo(x+w,y+r+15+3);
    }
    cxt.lineTo(x+w,y+h-r);//D
    cxt.arc(x+w - r , y+h-r, r, 0, 0.5 * Math.PI);
    cxt.lineTo(x+w-r,y+h);//E
    cxt.lineTo(x+r, y+h);//F
    cxt.arc(x+r, y+h - r, r, 0.5 * Math.PI, Math.PI);
    cxt.lineTo(x,y-r+h);//G
    if(t==false)
    {
        cxt.lineTo(x,y+r+15+3);
        cxt.lineTo(x-8,y+r+15);
    }
    cxt.lineTo(x,y+r+15-3);//H
    cxt.arc(x+r, y+r, r,Math.PI, 1.5 * Math.PI);
    cxt.lineWidth=1;
    if(t==true){
        cxt.strokeStyle="#9edb5d";
    }
    else{
        cxt.strokeStyle = "#fafafa"
    }
    cxt.stroke();
    if(t==true)
    {
        cxt.fillStyle = "#a4ea5c";
    }
    else
    {
        cxt.fillStyle = "#fff";
    }
    cxt.fill();
}

function drawMsgChat(cxt,msg,y,t)
{
    //画头像
    cxt.beginPath();
    var Head=new Image();
    if(t==true){
        Head.src = document.getElementById("myHead").src;
        Head.onload = function() {
            cxt.drawImage(Head, 375 - 6 - 40, y)
        }
    }
    else{
        Head.src = document.getElementById("itsHead").src;
        Head.onload = function() {
            cxt.drawImage(Head, 6, y)
        }
    }

    var msgL=cxt.measureText(msg).width;
    var x;
    var h;
    var count = (msgL-9)/234>=parseInt(msgL/234)?parseInt(msgL/234)+1:parseInt(msgL/234);
    h=24*count+16;
    nexty+=(h+20);
    if(t==true)
    {
        x=375-40-10-4-24-(msgL>234?234:msgL);
    }
    else
    {
        x=40+10+4;
    }

    drawCorRect(cxt,x,y,(msgL>234?234:msgL)+24,h,5,t);

    cxt.beginPath();
    //cxt.font="16px STHeitiSC-Light";
    cxt.textBaseline="top";
    cxt.fillStyle="black";
    if(t==true){
        drawText(cxt,msg,375-40-10-4-12-(msgL>234?234:msgL),y+12)
    }
    else{
        drawText(cxt,msg,40+10+4+12,y+12)
    }
}

function drawText(cxt,msg,x,y) {
    var text="";
    var temptext=msg.split("");

    do{
        text+=temptext[0];
        temptext.shift();
        if(cxt.measureText(text).width>=225){
            cxt.fillText(text,x,y);
            y=y+18+5;
            text="";
        }
        if(temptext[0]==null){
            cxt.fillText(text,x,y);
            break;
        }
    }while(1);
}
