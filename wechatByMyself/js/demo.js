/**
 * Created by pc on 2016/11/22.
 */
var canvas = document.getElementById("canvas");
canvas.width = 720;
canvas.height = 1280;
var context = canvas.getContext("2d");
context.fillStyle = "#ebebeb";
context.fillRect(0, 0, canvas.width, canvas.height);
//context.fill(); 因为上面已经fill过了，所以不用
drawBackground(context);

function drawBackground(cxt) {
    //还是不懂为什么要这样，（貌似是要load完image先？，不然会。。。不会解释了）

    //draw微信黑框
    cxt.beginPath();
    cxt.fillStyle = "#393a3f";
    cxt.fillRect(0, 49, canvas.width, 95);
    cxt.closePath();

    //draw状态栏
    var statusBar = new Image();
    statusBar.src = "./images/statusBar.png";
    statusBar.onload = function () {
        cxt.drawImage(statusBar, 0, 0);
    }

    //draw对话栏
    //错误示范
    //var dialogBar = new Image();
    //dialogBar.scr = "./images/dialogBar.png";
    //onload.function(cxt){  <---这里错了
    //    cxt.drawImage(0, 1085, dialogBar);   <---这里也不对
    //}
    var dialogBar = new Image();
    dialogBar.src = "./images/dialogBar.png";
    dialogBar.onload = function () {
        cxt.drawImage(dialogBar, 0, 1085);
    }

    //draw一个头
    var head = new Image();
    head.src = "./images/head.png";
    head.onload = function () {
        cxt.drawImage(head, 643, 77);
    }

    //draw箭头
    var arrow = new Image();
    arrow.src = "./images/arrow.png";
    arrow.onload = function () {
        cxt.drawImage(arrow, 30, 75);
    }
}

function freshBeforeGenerate(cxt) {
    cxt.beginPath();
    cxt.fillStyle = "#ebebeb";
    cxt.fillRect(0, 145, canvas.width, 945);
    cxt.closePath();

    cxt.beginPath();
    cxt.fillStyle = "#393a3f";
    cxt.fillRect(100, 52, 540, 90);
    cxt.closePath();
}

function generate(cxt) {
    //生成对方昵称
    //drawBackground(cxt); //每次生成前，刷新画面 <--后面发现没这个必要，因为我想要的只是名字那里还有下面对话栏删掉之前的内容
    freshBeforeGenerate(cxt);
    timeBox(cxt);   //会出现字体先是很小，后面刷新多几次才能变大的问题，应该也是要load那个问题
    var name = document.getElementById("name"); //通过name这个id找到文字
    cxt.beginPath();
    cxt.font = "lighter 38px STHeitiSC-Light" //35px 黑体？这里应该用中文不行，但是应该怎么样呢
    cxt.textAlign = "center";
    cxt.textBaseline = "top";
    cxt.fillStyle = "#ffffff";
    cxt.fillText(name.value, 375, 82); //不懂为什么要有坐标<--查到说是开始绘制文本的位置，但是，为什么会超。。然后最后的解决办法是——居中显示算了。。

    //生成对话(原本会一个个敲-->但是有前面那个* > 什么的想学着用，但是那是标签，不同，看了以后是数组的使用）
    //var chk。。。。
    var chk = new Array(7);
    var select = new Array(7); //在js中，初始化数组是（）哦
    var content = new Array(7);
    //for (var i = 1; i < 8; i++) {
    //    chk[i] = document.getElementById("chk" + i);
    //    if (chk[i].checked) {               //select[i] = document.getElementById("select" + i)，一开始以为是用这个判断。。。
    //        select[i] = document.getElementById("select" + i);
    //        if(select[i] == 0){              //这时想起chatBox的有些点的坐标固定
    //            myChatBox(context, 595 + chk[i].length * 2, )
    //        }
    //    }
    //}
    var dis = 0;
    for (var i = 1; i < 8; i++) {
        if(i == 1) {
            dis = 90 + 146;      //第一条
        }
        else {
            dis = dis + 25 + 80; //漏了气泡高度 可以通过乘根据字数得出的行数  发现如果有表情会变宽
        }

        //先去取得相应的值再去判断及赋值
        chk[i] = document.getElementById('chk' + i);
        select[i] = document.getElementById('select' + i);
        content[i] = document.getElementById('cnt' + i);

        if (chk[i].checked) {
            var index = select[i].selectedIndex; //然而并不知道这个是什么鬼；
            if (index == 0) {
                drawMyMessage(cxt, content[i].value, dis); //记得还有value
            } else {
                drawHisMessage(cxt, content[i].value, dis);
            }
        }
    }
}

function myChatBox(cxt, x, y, w, h, r) {
    var grd = cxt.createLinearGradient(x, y, x, y + h);
    grd.addColorStop(0.0, "#ffffff");
    grd.addColorStop(1.0, "#f9f9f9");
    cxt.beginPath();
    cxt.moveTo(x, y);
    cxt.lineTo(x + w, y);
    cxt.arc(x + w, y + r, r, Math.PI * 1.5, Math.PI * 2); //这里也遇到了问题，没注意，x、y是原点的坐标
    cxt.lineTo(x + w + r, y + 32);
    cxt.lineTo(x + w + r + 11, y + 42);
    cxt.lineTo(x + w + r, y + 52);
    cxt.lineTo(x + w + r, y + h + r);
    cxt.arc(x + w, y + h + r, r, 0, Math.PI * 0.5);
    cxt.lineTo(x, y + h + r + r);
    cxt.arc(x, y + h + r, r, Math.PI * 0.5, Math.PI * 1);
    cxt.lineTo(x - r, y + r);
    cxt.arc(x, y + r, r, Math.PI * 1, Math.PI * 1.5);
    cxt.closePath();
    cxt.strokeStyle = "#b4b4b4"; ///
    cxt.fillStyle = grd;
    cxt.fill();
    cxt.stroke();
}

function hisChatBox(cxt, x, y, w, h, r) {
    cxt.beginPath();
    cxt.moveTo(x, y);
    cxt.lineTo(x + w, y);
    cxt.arc(x + w, y + r, r, Math.PI * 1.5, Math.PI * 2); //这里也遇到了问题，没注意，x、y是原点的坐标
    cxt.lineTo(x + w + r, y + h + r);
    cxt.arc(x + w, y + h + r, r, 0, Math.PI * 0.5);
    cxt.lineTo(x, y + h + r + r);
    cxt.arc(x, y + h + r, r, Math.PI * 0.5, Math.PI * 1);
    cxt.lineTo(x - r, y + 52);
    cxt.lineTo(x - r - 11, y + 42);
    cxt.lineTo(x - r, y + 32);
    cxt.arc(x, y + r, r, Math.PI * 1, Math.PI * 1.5);
    cxt.closePath();
    cxt.strokeStyle = "#85cc2e";
    cxt.fillStyle = "#b2e866";
    cxt.fill();
    cxt.stroke(); //不懂为什么stroke的边框还是绿色的
}

//这个是之前没有敲过的
function drawMyMessage(cxt, msg, y){
    cxt.beginPath();
    var myHead = new Image();
    myHead.src = document.getElementById('imgHead1').src;
    myHead.onload = function() {
        cxt.drawImage(myHead, 720 - 16 - 80, y);
    }

    cxt.beginPath();
    cxt.font = '30px STHeitiSC-Light';
    var msgLength = cxt.measureText(msg).width; //貌似不能直接给出字数，那就大于某个值换行好了
    myChatBox(cxt, 750 - 17 - 80 - 40 - msgLength - 25, y, msgLength + 25, 80, 8);
    cxt.textBaseline = 'top'; //这个意思是？顶部对齐？
    cxt.fillStyle = 'black';
    cxt.fillText(msg, 750 - 16 - 80 - 40 - msgLength + 20 + 38, y + 25);
}

function drawHisMessage(cxt, msg, y){
    cxt.beginPath();
    var hisHead = new Image();
    hisHead.src = document.getElementById('imgHead2').src; //不知道这个在哪里，是还没敲到吗<--在前面
    hisHead.onload = function() {
        cxt.drawImage(hisHead, 18, y);
    }

    cxt.beginPath();
    cxt.font = '30px STHeitiSC-Light';
    var msgLength = cxt.measureText(msg).width; //两个msg分别在哪里，figure it out
    hisChatBox(cxt, 102, y, msgLength + 25, 80, 8);
    cxt.textBaseline = 'top';
    cxt.fillStyle = 'black';
    cxt.fillText(msg, 135 + 20, y + 25);
}

function timeBox(cxt) {
    //摘抄网上关于时间的代码
    var date = new Date(); //实例一个时间对象；
    //var year = date.getFullYear();
    //var month = date.getMonth()+1;
    //var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    //var second = date.getSeconds();

    cxt.beginPath();
    cxt.moveTo(310, 170);
    cxt.lineTo(410, 170);
    cxt.arc(410, 175, 5, Math.PI * 1.5, Math.PI * 2); //这里也遇到了问题，没注意，x、y是原点的坐标
    cxt.lineTo(415, 210);
    cxt.arc(410, 205, 5, 0, Math.PI * 0.5);
    cxt.lineTo(310, 210);
    cxt.arc(310, 205, 5, Math.PI * 0.5, Math.PI * 1);
    cxt.lineTo(305, 175);
    cxt.arc(310, 175, 5, Math.PI * 1, Math.PI * 1.5);
    cxt.closePath();
    cxt.fillStyle = "#d4d4d4";
    cxt.fill();

    //显示对话时间
    cxt.font = "50px";
    cxt.textAlign = "center";
    cxt.textBaseline = "middle";
    cxt.fillStyle = "#ffffff";
    cxt.fillText(hour, 333 + 5 - 3, 190);    //不懂为什么要有坐标<--忘记自己写的是什么
    cxt.fillText(":", 368 - 5 - 3, 185)
    cxt.fillText(minute, 382 + 5 - 3, 190);  //这个显示出来，但是“：”还有 4->04 ? am/pm ? 加上要按两下生成才可以。。。。
}