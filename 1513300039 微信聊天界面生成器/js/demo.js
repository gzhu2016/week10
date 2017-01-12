// canvas 初始化
var canvas = document.getElementById("canvas")
canvas.width = 375
canvas.height = 667
var context = canvas.getContext("2d")
context.fillStyle = "#ebebeb"
context.fillRect(0, 0, canvas.width, canvas.height)
drawBackGround(context)

/**
 * 点击按钮生成界面
 * @param  {[type]} cxt [画笔]
 * @return {[type]}     
 */
function generate(cxt) {
    // 得到HTML中id为hisName的文本输入框
    var hisName = document.getElementById('hisName')
    cxt.beginPath()
    // 绘制状态栏上对方的昵称
    cxt.font = 'lighter 18px STHeitiSC-Light'
    // 文本水平居中
    cxt.textAlign = 'center'
    cxt.textBaseline = 'top'
    cxt.fillStyle = '#ffffff'
    // hisName.value为'hisName'内文本输入框的内容
    cxt.fillText(hisName.value, 187, 32)

    // 设置文本固定点为左上角（方便绘制气泡文本）
    cxt.textAlign = 'left'
    var chk = new Array(7)
    var select = new Array(7)
    var content = new Array(7)

    // 气泡到边框的上边距
    var dis = 0

    for (var i = 1; i < 8; i++) {
        if (i == 1) {
            // 第一条气泡的y：状态栏的20+43，再加16
            dis = 20 + 43 + 16
        } else {
            // 之后的气泡的y：之前的y，加上距离20，再加气泡的高度40
            dis = dis + 20 + 40
        }

        // 获得 7 组共 21 个 html 的标签对象
        // 得到id为chk1~chk7的复选框对象
        chk[i] = document.getElementById('chk' + i)
        // 得到id为select1~select7的下拉选择框对象
        select[i] = document.getElementById('select' + i)
        // 得到id为cnt1~cnt7的输入框对象        
        content[i] = document.getElementById('cnt' + i)

        // 如果复选框被勾了
        if (chk[i].checked) {
            // 得到下拉选项框的选项索引值
            // 0：我，1：对方
            var index = select[i].selectedIndex
            if (index == 0) {
                drawMyMessage(cxt, content[i].value, dis)
            } else {
                drawHisMessage(cxt, content[i].value, dis)
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
    // 绘制状态栏背景
    cxt.beginPath()
    var grd = cxt.createLinearGradient(0, 0, 0, 63)
    grd.addColorStop(0.0, '#221f25')
    grd.addColorStop(1.0, '#454545')
    cxt.fillStyle = grd
    cxt.fillRect(0, 0, 375, 63)

    // 绘制电量状态栏
    var bar = new Image()
    bar.src = './image/bar.png'
    bar.onload = function() {
        cxt.drawImage(bar, 5, 0)
    }

    // 绘制输入框
    var inputbar = new Image()
    inputbar.src = './image/inputbar.png'
    inputbar.onload = function() {
        cxt.drawImage(inputbar, 0, 619)
    }

    // 绘制左上角返回按钮
    var back = new Image()
    back.src = './image/back.png'
    back.onload = function() {
        cxt.drawImage(back, 0, 16)
    }

    // 绘制右上角个人中心按钮
    var person = new Image()
    person.src = './image/person.png'
    person.onload = function() {
        cxt.drawImage(person, 336, 16)
    }

    // 绘制左上角的“微信”
    cxt.beginPath()
    cxt.font = 'lighter 16px Heiti SC'
    cxt.fillStyle = '#ffffff'
    cxt.fillText('微信', 24, 46)
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
    cxt.beginPath()
    cxt.moveTo(x + r, y) // A点
    cxt.lineTo(x + w - r, y) // B点
    cxt.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI)
    cxt.lineTo(x + w, y + r + 12)
    cxt.lineTo(x + w + 6, y + r + 12 + 3)
    cxt.lineTo(x + w, y + r + 12 + 6)
    cxt.lineTo(x + w, y + h - r) // F点
    cxt.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI)
    cxt.lineTo(x + r, y + h) // D点
    cxt.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI)
    cxt.lineTo(x, y + r); // G点
    cxt.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI)

    cxt.lineWidth = 1
    cxt.strokeStyle = '#9edb5d'
    cxt.stroke()
    cxt.fillStyle = '#a4ea5c'
    cxt.fill()
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
    cxt.beginPath()
    cxt.moveTo(x + r, y) // A点
    cxt.lineTo(x + w - r, y) // B点 
    cxt.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI)
    cxt.lineTo(x + w, y + h - r) // F点
    cxt.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI)
    cxt.lineTo(x + r, y + h) // D点
    cxt.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI)
    cxt.lineTo(x, y + r + 12 + 6)
    cxt.lineTo(x - 6, y + r + 12 + 3)
    cxt.lineTo(x, y + r + 12)
    cxt.lineTo(x, y + r); // G点
    cxt.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI)

    cxt.lineWidth = 1
    cxt.strokeStyle = '#fafafa'
    cxt.stroke()
    cxt.fillStyle = '#ffffff'
    cxt.fill()
}

/**
 * 根据文本内容生成右边的绿色气泡
 * @param  {[type]} cxt [画笔]
 * @param  {[type]} msg [文本内容]
 * @param  {[type]} y   [气泡左上角顶点y]
 * @return {[type]}     []
 */
function drawMyMessage(cxt, msg, y) {

    cxt.beginPath()
    // 绘制右边的头像
    var myHead = new Image()
    myHead.src = document.getElementById('imgHead1').src;
    // myHead.src = './image/face1.png'
    myHead.onload = function() {
        // 右边的头像左上角顶点x:375-6-40
        cxt.drawImage(myHead, 375 - 6 - 40, y)
    }

    cxt.beginPath()
    cxt.font = '16px STHeitiSC-Light'
    // 得到文本的宽度（注：等到设置好字体再去测量宽度）
    var msgLength = cxt.measureText(msg).width
    // 根据文本的宽度可以计算出气泡的宽度：msgLength+24
    // 同时可以得到气泡左上角顶点x坐标：375-40-10-4-(msgLength+24)
    // 气泡高度设定为1行文字：h=40
    // 气泡圆角半径固定为5
    drawMyChat(cxt, 375 - 40 - 10 - 4 - msgLength - 24,
        y, msgLength + 24, 40, 5)
    // 文本垂直对齐设置为top（默认为bottom)
    // 以便使文本的固定点(x,y)也为左上角（同气泡一样都是左上角） 
    cxt.textBaseline = 'top'
    cxt.fillStyle = 'black'
    // 气泡内边距为12，所以文本的x和y 要在气泡的基础上+12
    cxt.fillText(msg, 375 - 40 - 10 - 4 - msgLength -
        24 + 12, y + 12)
}

/**
 * 根据文本内容生成右边的绿色气泡
 * @param  {[type]} cxt [画笔]
 * @param  {[type]} msg [文本内容]
 * @param  {[type]} y   [气泡左上角顶点y]
 * @return {[type]}     [description]
 */
function drawHisMessage(cxt, msg, y) {
    
    cxt.beginPath()
    // 绘制左边的头像
    var hisHead = new Image()
    hisHead.src = document.getElementById('imgHead2').src;
    // hisHead.src = './image/face2.png'
    hisHead.onload = function() {
        // 左边的头像左上角顶点x:6
        cxt.drawImage(hisHead, 6, y)
    }

    cxt.beginPath()
    cxt.font = '16px STHeitiSC-Light'
    var msgLength = cxt.measureText(msg).width
    drawHisChat(cxt, 40 + 10 + 4, y, msgLength + 24, 40, 5)
    cxt.textBaseline = 'top'
    cxt.fillStyle = 'black'
    cxt.fillText(msg, 40 + 10 + 4 + 12, y + 12)
}

