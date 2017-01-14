var canvas = document.getElementById("canvas");

canvas.width = 375;

canvas.height = 667;

var context = canvas.getContext("2d");

context.fillStyle = "#ebebeb";

context.fillRect(0, 0, canvas.width, canvas.height);

drawBackGround(context);


function generate(cxt) {

    // id为hisName的文本输入框

    var hisName = document.getElementById('hisName');

    cxt.beginPath();

    // 状态栏上对方的昵称

    cxt.font = 'lighter 18px STHeitiSC-Light';

    cxt.textAlign = 'center';

    cxt.textBaseline = 'top';

    cxt.fillStyle = '#ffffff';

    // hisName.value为'hisName'内文本输入框的内容

    cxt.fillText(hisName.value, 187, 32);


    // 设置文本固定点为左上角

    cxt.textAlign = 'left';

    var chk = new Array(7);

    var select = new Array(7);

    var content = new Array(7);



    // 气泡到边框的上边距

    var dis = 0;



    for (var i = 1; i <8; i++) {
        if (i == 1) {

            dis = 20 + 43 + 16;//第一条气泡的y：220px的状态栏 + 40px的边距

        } else {

            dis = dis + 20 + 40

        }


        chk[i] = document.getElementById('chk' + i);
        select[i] = document.getElementById('select' + i);
        content[i] = document.getElementById('cnt' + i);






        // 如果复选框被勾了



        if (chk[i]&&chk[i].checked) {
            var index = select[i].selectedIndex;
            if (index == 0) {
                drawMyMessage(cxt, content[i].value, dis)
            } else {
                drawHisMessage(cxt, content[i].value, dis)
            }
        }
    }
}

function generate1(cxt) {

    var time = document.getElementById('time')

    cxt.beginPath()

    cxt.font = 'lighter 14px NSimSun'

    cxt.textAlign = 'center'

    cxt.textBaseline = 'top'

    cxt.fillStyle = '#ffffff'

    cxt.fillText (time.value, 187,3)

}

/**

 * 绘制背景

 * @param  {[type]} cxt [description]

 * @return {[type]}

 */

function drawBackGround(cxt) {

    // 状态栏背景

    cxt.beginPath();

    var grd = cxt.createLinearGradient(0, 0, 0, 63);

    grd.addColorStop(0.0, '#221f25');

    grd.addColorStop(1.0, '#454545');

    cxt.fillStyle = grd;

    cxt.fillRect(0, 0, 375, 63);



    //聊天背景

    cxt.beginPath();

    var img = new Image();

    img.src = "image/background.jpg";

    img.onload = function () {

        cxt.drawImage(img, 0, 63, 375, 556)

    }



    // 电量状态栏

    cxt.beginPath();

    var bar = new Image();

    bar.src = './image/bar.png';

    bar.onload = function () {

        cxt.drawImage(bar, 5, 0)

    };



    // 输入框

    cxt.beginPath();

    var inputbar = new Image();

    inputbar.src = './image/inputbar.png';

    inputbar.onload = function () {

        cxt.drawImage(inputbar, 0, 619)

    };



    // 左上角的返回按钮

    cxt.beginPath();

    var back = new Image();

    back.src = './image/back.png';

    back.onload = function () {

        cxt.drawImage(back, 0, 16)

    };



    // 右上角的个人中心按钮

    cxt.beginPath();

    var person = new Image();

    person.src = './image/person.png';

    person.onload = function () {

        cxt.drawImage(person, 336, 16)

    };



    // 绘制左上角的“微信”

    cxt.beginPath();

    cxt.font= 'lighter 18px STHeitiSC-Light';

    //cxt.font = 'lighter 16px Heiti SC';

    cxt.fillStyle = '#FFFFFF';

    cxt.fillText("微信", 24, 46);

}



/**

 * 绘制绿色气泡

 * @param  {[type]} cxt [画笔]

 * @param  {[type]} x   [气泡左上角顶点x]

 * @param  {[type]} y   [气泡左上角顶点y]

 * @param  {[type]} w   [气泡宽度]

 * @param  {[type]} h   [气泡高度]

 * @param  {[type]} r   [气泡圆角半径]

 * @return {[type]}     []

 */

function drawMyChat(cxt, x, y, w, h, r) {

    cxt.beginPath();

    cxt.moveTo(x + r, y);// A点

    cxt.lineTo(x + w - r, y);// B点

    cxt.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);

    cxt.lineTo(x + w, y + r + 12);

    cxt.lineTo(x + w + 6, y + r + 12 + 3);

    cxt.lineTo(x + w, y + r + 12 + 6);

    cxt.lineTo(x + w, y + h - r);// F点

    cxt.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);

    cxt.lineTo(x + r, y + h);// D点

    cxt.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);

    cxt.lineTo(x, y + r); // G点

    cxt.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI);



    cxt.lineWidth = 1;

    cxt.strokeStyle = '#9edb5d';

    cxt.stroke();

    cxt.fillStyle = '#a4ea5c';

    cxt.fill();

}



/**

 * 绘制白色气泡

 * @param  {[type]} cxt [画笔]

 * @param  {[type]} x   [气泡左上角顶点x]

 * @param  {[type]} y   [气泡左上角顶点y]

 * @param  {[type]} w   [气泡宽度]

 * @param  {[type]} h   [气泡高度]

 * @param  {[type]} r   [气泡圆角半径]

 * @return {[type]}     []

 */

function drawHisChat(cxt, x, y, w, h, r) {

    cxt.beginPath();

    cxt.moveTo(x + r, y); // A点

    cxt.lineTo(x + w - r, y);// B点

    cxt.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);

    cxt.lineTo(x + w, y + h - r);// F点

    cxt.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);

    cxt.lineTo(x + r, y + h);// D点

    cxt.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);

    cxt.lineTo(x, y + r + 12 + 6);

    cxt.lineTo(x - 6, y + r + 12 + 3);

    cxt.lineTo(x, y + r + 12);

    cxt.lineTo(x, y + r); // G点

    cxt.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI);



    cxt.lineWidth = 1;

    cxt.strokeStyle = '#fafafa';

    cxt.stroke();

    cxt.fillStyle = '#ffffff';

    cxt.fill();

}



/**

 * 根据文本内容生成右边的绿色气泡

 * @param  {[type]} cxt [画笔]

 * @param  {[type]} msg [文本内容]

 * @param  {[type]} y   [气泡左上角顶点y]

 * @return {[type]}     []

 */

function drawMyMessage(cxt, msg, y) {

    cxt.beginPath();

    // 绘制右边的头像

    var myHead = new Image();

    myHead.src = document.getElementById('imgHead1').src;

    myHead.onload = function () {

        cxt.drawImage(myHead, 375 - 6 - 40, y, 40, 40);

    };

    cxt.beginPath();

    cxt.font = 'lighter 18px STHeitiSC-Light';

    // 得到文本的宽度

    var msgLength = cxt.measureText(msg).width;

    // 气泡的宽度：msgLength+24;气泡左上角顶点x坐标：375-40-10-4-(msgLength+24)

    // 气泡高度设定为1行文字：h=40;气泡圆角半径固定为5

    var count = parseInt(msgLength / (18 * 13)) * (18 + 5)//根据信息长度计算气泡的额外高度



    drawMyChat(cxt, 375 - 40 - 10 - 4 - 2 * 12 - (msgLength >= 18 * 13 ? 18 * 13 : msgLength), y, (msgLength >= 18 * 13 ? 18 * 13 : msgLength) + 2 * 12, 40 + count, 5);

    cxt.fillStyle = 'black'

    cxt.textBaseline = 'top';

    cxt.fillStyle = 'black';

    // 气泡内边距为12，所以文本的x和y 要在气泡的基础上+12

    drawText(cxt, msg, 375 - 40 - 10 - 4 - 12 - (msgLength >= 18 * 13 ? 18 * 13 : msgLength), y + 12)



}



/**

 * 根据文本内容生成右边的绿色气泡

 * @param  {[type]} cxt [画笔]

 * @param  {[type]} msg [文本内容]

 * @param  {[type]} y   [气泡左上角顶点y]

 * @return {[type]}     [description]

 */

function drawHisMessage(cxt, msg, y) {

    cxt.beginPath();

    // 绘制左边的头像

    var hisHead = new Image();

    hisHead.src = document.getElementById('imgHead2').src;

    hisHead.onload = function () {

        cxt.drawImage(hisHead, 6, y, 40, 40);// 左边的头像左上角顶点x:6

    };



    cxt.beginPath();

    //cxt.font = '18px STHeitiSC-Light';

    cxt.font= 'lighter 18px STHeitiSC-Light';

    var msgLength = cxt.measureText(msg).width;

    var count = parseInt(msgLength / (18 * 13)) * (18 + 5)//根据信息长度计算气泡的额外高度

    drawHisChat(cxt, 40 + 10 + 4, y, (msgLength >= 18 * 13 ? 18 * 13 : msgLength) + 2 * 12, 40 + count, 5);

    cxt.textBaseline = 'top';

    cxt.fillStyle = 'black';



    drawText(cxt, msg, 40 + 10 + 4 + 12, y + 12)



}

/**

 * 填充文本，文本每行的长度为 （52 * 12.5）至 （52 * 13） 像素

 * @param cxt   [画笔]

 * @param msg   [文本信息]

 * @param x     [文本的左上角坐标X]

 * @param y     [文本的左上角坐标Y]

 */
function drawText(cxt, msg, x, y) {

    var linewidth = 18 * 12.5;//文本的行宽为 52*12.5 像素

    var text = "";

    var msgLength = cxt.measureText(msg).width;

    var newtext = msg.split("");

    cxt.beginPath()

    cxt.font =  'lighter 18px STHeitiSC-Light';

    cxt.textBaseline = 'top'

    cxt.fillStyle = 'black'

    for (var i = 0; i <= msgLength; i += 13) {

        if (cxt.measureText(text).width >= linewidth)//当text的宽度大于等于行的长度时，填充text

        {

            cxt.fillText(text, x, y);

            y = y + 18 + 5;//文本大小为18px，再加上行间距5px

            text = "";//初始化text

        }

        if (newtext[0] == null) {//当newtext[0]为空时，表明后面已没有信息，填充最后的信息后跳出循环

            cxt.fillText(text, x, y)

            break;

        }



        var text = text + newtext[0];//将拆分后的newtext数组依次赋值给text

        newtext.shift();




    }

}