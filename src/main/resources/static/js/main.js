/**
 * Created by chenchen on 2016/11/3.
 */

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,         //月份
        "d+" : this.getDate(),          //日
        "h+" : this.getHours(),          //小时
        "m+" : this.getMinutes(),         //分
        "s+" : this.getSeconds(),         //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds()       //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

function connect(){
    vbar_open("localhost","2693");
    vbar_register_webstatus_callback(websocketstatus);
    vbar_register_devicestatus_callback(websocketdevstatus);
    vbar_register_decode_callback(coderesult);
}



var tp0='';
var tp1='';
var tp2='';
var tp3='';

function coderesult(sym){
    //document.getElementById('resultdecode').value=sym;
	//console.log("1233");
    document.getElementById('p0').innerHTML='处理中...';
    document.getElementById('p1').innerHTML='';
    document.getElementById('p2').innerHTML='';
    document.getElementById('p3').innerHTML='';



    //vbar_beep(1);
    $("#backg").show();
    //vbar_enable(false);
    $.ajax({
        type: 'POST',
        url: 'qr_check',
        data: {orderNumber:sym},
        dataType: 'json',
        async:false,
        success: function (data) {
            if (1 == data.result) {
                tp0=data.qc.meetType==1?'高招门票':'中招门票';
                tp1='扫码成功';
                tp2='手机号: '+data.qc.phone;
                tp3='购票价格: '+data.qc.payPrice;
            } else if (-1 == data.result) {
                tp0='不存在';
                tp1='扫码失败';
                tp2='该二维码不存在！';
                tp3='';
            } else if (0 == data.result) {
                tp0=data.qc.meetType==1?'高招门票':'中招门票';
                tp1='扫码失败';
                tp2= '该二维码已验证';
                tp3='验证时间: '+(new Date(data.qc.swipeTime)).Format("yyyy-MM-dd hh:mm");
            }
        }
    });
    setTimeout("$('#backg').hide();document.getElementById('p0').innerHTML=tp0;document.getElementById('p1').innerHTML=tp1;document.getElementById('p2').innerHTML= tp2;document.getElementById('p3').innerHTML=tp3",500);

}
//设备状态
function websocketdevstatus(status){
    if(status == true){
        document.getElementById('dev').value="已连接";
    }
    else
        document.getElementById('dev').value="未连接";
}
//websocket连接状态
function websocketstatus(status) {
    if (status == true) {
    document.getElementById('wsocket').value = "已连接";
    }
    else
        document.getElementById('wsocket').value="未连接";

}






function startcode(){
    vbar_backlight(true);
    vbar_beep(1);
    vbar_addtype("QRCODE");
    vbar_enable(true);
    var mystart = document.getElementById("mystart");
    var myclose = document.getElementById("myclose");
    mystart.value = "已开始读码";
    myclose.value = "关闭读码";

}

function closecode(){
    vbar_enable(false);
    var mystart = document.getElementById("mystart");
    var myclose = document.getElementById("myclose");
    mystart.value = "开始读码";
    myclose.value = "已关闭读码";
}







