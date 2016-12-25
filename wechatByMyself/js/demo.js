/**
 * Created by pc on 2016/11/22.
 */
var canvas = document.getElementById("canvas");
canvas.width = 720;
canvas.height = 1280;
var context = canvas.getContext("2d");
context.fillStyle = "#ebebeb";
context.fillRect(0, 0, canvas.width, canvas.height);
//context.fill(); ��Ϊ�����Ѿ�fill���ˣ����Բ���
drawBackground(context);

function drawBackground(cxt) {
    //���ǲ���ΪʲôҪ��������ò����Ҫload��image�ȣ�����Ȼ�ᡣ������������ˣ�

    //draw΢�źڿ�
    cxt.beginPath();
    cxt.fillStyle = "#393a3f";
    cxt.fillRect(0, 49, canvas.width, 95);
    cxt.closePath();

    //draw״̬��
    var statusBar = new Image();
    statusBar.src = "./images/statusBar.png";
    statusBar.onload = function () {
        cxt.drawImage(statusBar, 0, 0);
    }

    //draw�Ի���
    //����ʾ��
    //var dialogBar = new Image();
    //dialogBar.scr = "./images/dialogBar.png";
    //onload.function(cxt){  <---�������
    //    cxt.drawImage(0, 1085, dialogBar);   <---����Ҳ����
    //}
    var dialogBar = new Image();
    dialogBar.src = "./images/dialogBar.png";
    dialogBar.onload = function () {
        cxt.drawImage(dialogBar, 0, 1085);
    }

    //drawһ��ͷ
    var head = new Image();
    head.src = "./images/head.png";
    head.onload = function () {
        cxt.drawImage(head, 643, 77);
    }

    //draw��ͷ
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
    //���ɶԷ��ǳ�
    //drawBackground(cxt); //ÿ������ǰ��ˢ�»��� <--���淢��û�����Ҫ����Ϊ����Ҫ��ֻ���������ﻹ������Ի���ɾ��֮ǰ������
    freshBeforeGenerate(cxt);
    timeBox(cxt);   //������������Ǻ�С������ˢ�¶༸�β��ܱ������⣬Ӧ��Ҳ��Ҫload�Ǹ�����
    var name = document.getElementById("name"); //ͨ��name���id�ҵ�����
    cxt.beginPath();
    cxt.font = "lighter 38px STHeitiSC-Light" //35px ���壿����Ӧ�������Ĳ��У�����Ӧ����ô����
    cxt.textAlign = "center";
    cxt.textBaseline = "top";
    cxt.fillStyle = "#ffffff";
    cxt.fillText(name.value, 375, 82); //����ΪʲôҪ������<--�鵽˵�ǿ�ʼ�����ı���λ�ã����ǣ�Ϊʲô�ᳬ����Ȼ�����Ľ���취�ǡ���������ʾ���ˡ���

    //���ɶԻ�(ԭ����һ������-->������ǰ���Ǹ�* > ʲô����ѧ���ã��������Ǳ�ǩ����ͬ�������Ժ��������ʹ�ã�
    //var chk��������
    var chk = new Array(7);
    var select = new Array(7); //��js�У���ʼ�������ǣ���Ŷ
    var content = new Array(7);
    //for (var i = 1; i < 8; i++) {
    //    chk[i] = document.getElementById("chk" + i);
    //    if (chk[i].checked) {               //select[i] = document.getElementById("select" + i)��һ��ʼ��Ϊ��������жϡ�����
    //        select[i] = document.getElementById("select" + i);
    //        if(select[i] == 0){              //��ʱ����chatBox����Щ�������̶�
    //            myChatBox(context, 595 + chk[i].length * 2, )
    //        }
    //    }
    //}
    var dis = 0;
    for (var i = 1; i < 8; i++) {
        if(i == 1) {
            dis = 90 + 146;      //��һ��
        }
        else {
            dis = dis + 25 + 80; //©�����ݸ߶� ����ͨ���˸��������ó�������  ��������б������
        }

        //��ȥȡ����Ӧ��ֵ��ȥ�жϼ���ֵ
        chk[i] = document.getElementById('chk' + i);
        select[i] = document.getElementById('select' + i);
        content[i] = document.getElementById('cnt' + i);

        if (chk[i].checked) {
            var index = select[i].selectedIndex; //Ȼ������֪�������ʲô��
            if (index == 0) {
                drawMyMessage(cxt, content[i].value, dis); //�ǵû���value
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
    cxt.arc(x + w, y + r, r, Math.PI * 1.5, Math.PI * 2); //����Ҳ���������⣬ûע�⣬x��y��ԭ�������
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
    cxt.arc(x + w, y + r, r, Math.PI * 1.5, Math.PI * 2); //����Ҳ���������⣬ûע�⣬x��y��ԭ�������
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
    cxt.stroke(); //����Ϊʲôstroke�ı߿�����ɫ��
}

//�����֮ǰû���ù���
function drawMyMessage(cxt, msg, y){
    cxt.beginPath();
    var myHead = new Image();
    myHead.src = document.getElementById('imgHead1').src;
    myHead.onload = function() {
        cxt.drawImage(myHead, 720 - 16 - 80, y);
    }

    cxt.beginPath();
    cxt.font = '30px STHeitiSC-Light';
    var msgLength = cxt.measureText(msg).width; //ò�Ʋ���ֱ�Ӹ����������Ǿʹ���ĳ��ֵ���к���
    myChatBox(cxt, 750 - 17 - 80 - 40 - msgLength - 25, y, msgLength + 25, 80, 8);
    cxt.textBaseline = 'top'; //�����˼�ǣ��������룿
    cxt.fillStyle = 'black';
    cxt.fillText(msg, 750 - 16 - 80 - 40 - msgLength + 20 + 38, y + 25);
}

function drawHisMessage(cxt, msg, y){
    cxt.beginPath();
    var hisHead = new Image();
    hisHead.src = document.getElementById('imgHead2').src; //��֪�����������ǻ�û�õ���<--��ǰ��
    hisHead.onload = function() {
        cxt.drawImage(hisHead, 18, y);
    }

    cxt.beginPath();
    cxt.font = '30px STHeitiSC-Light';
    var msgLength = cxt.measureText(msg).width; //����msg�ֱ������figure it out
    hisChatBox(cxt, 102, y, msgLength + 25, 80, 8);
    cxt.textBaseline = 'top';
    cxt.fillStyle = 'black';
    cxt.fillText(msg, 135 + 20, y + 25);
}

function timeBox(cxt) {
    //ժ�����Ϲ���ʱ��Ĵ���
    var date = new Date(); //ʵ��һ��ʱ�����
    //var year = date.getFullYear();
    //var month = date.getMonth()+1;
    //var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    //var second = date.getSeconds();

    cxt.beginPath();
    cxt.moveTo(310, 170);
    cxt.lineTo(410, 170);
    cxt.arc(410, 175, 5, Math.PI * 1.5, Math.PI * 2); //����Ҳ���������⣬ûע�⣬x��y��ԭ�������
    cxt.lineTo(415, 210);
    cxt.arc(410, 205, 5, 0, Math.PI * 0.5);
    cxt.lineTo(310, 210);
    cxt.arc(310, 205, 5, Math.PI * 0.5, Math.PI * 1);
    cxt.lineTo(305, 175);
    cxt.arc(310, 175, 5, Math.PI * 1, Math.PI * 1.5);
    cxt.closePath();
    cxt.fillStyle = "#d4d4d4";
    cxt.fill();

    //��ʾ�Ի�ʱ��
    cxt.font = "50px";
    cxt.textAlign = "center";
    cxt.textBaseline = "middle";
    cxt.fillStyle = "#ffffff";
    cxt.fillText(hour, 333 + 5 - 3, 190);    //����ΪʲôҪ������<--�����Լ�д����ʲô
    cxt.fillText(":", 368 - 5 - 3, 185)
    cxt.fillText(minute, 382 + 5 - 3, 190);  //�����ʾ���������ǡ��������� 4->04 ? am/pm ? ����Ҫ���������ɲſ��ԡ�������
}