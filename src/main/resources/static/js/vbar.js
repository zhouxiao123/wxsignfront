/**
 * Created by chenchen on 2016/11/11.
 */
//建立websocket连接函数

var websocket_addr = "localhost"
var websocket_port = "2693"
var websocket_connected = false
var websocket_decode_callback = false
var websocket_devicestatus_callback = false
var websocket_webstatus_callback = false

//连接VBarServer
function vbar_open(addr, port) {
    if (!websocket_connected) {
        websocket_addr = addr;
        websocket_port = port;
        var host = "ws://" + websocket_addr + ":" + websocket_port;
        websocketCtrl = new WebSocket(host, 'ctrl');
        websocketData = new WebSocket(host, 'data');
        websocketStatus = new WebSocket(host, 'status');

        websocketStatus.onopen = function(){
            websocket_connected = true;
            websocket_webstatus_callback(true);
        }

        websocketStatus.onclose = function() {
            websocket_connected = false;
            websocket_webstatus_callback(false);
        }

        websocketStatus.onmessage = function(event){
            if(event.data == "connected"){
                websocket_devicestatus_callback(true);
            } else
                websocket_devicestatus_callback(false);
        }

        websocketData.onmessage = function (event) {
            websocket_decode_callback(event.data);
        }
    }

    setTimeout("vbar_open(websocket_addr, websocket_port)", 3000);
}

function vbar_is_connected() {
    return websocket_connected;
}

//断开websocket连接函数
function vbar_close() {
    websocketStatus.close();
    websocketData.close();
    websocketCtrl.close();
}

//接收扫码结果函数
function vbar_register_webstatus_callback(func) {
    websocket_webstatus_callback = func;
}

//接收扫码结果函数
function vbar_register_devicestatus_callback(func) {
    websocket_devicestatus_callback = func;
}

//接收扫码结果函数
function vbar_register_decode_callback(func) {
    websocket_decode_callback = func;
}

//码制类型控制函数
function vbar_addtype(codeSymbol) {
    websocketCtrl.send("vbar.add_type('" + codeSymbol + "')");
}

//背光控制函数
function vbar_backlight(bool) {
    websocketCtrl.send("vbar.backlight(" + bool + ")");
}

//扫码成功后蜂鸣器响声次数控制函数
function vbar_beep(times) {
    websocketCtrl.send("vbar.beep(" + times+")");
}

//解码控制函数
function vbar_enable(bool) {
    if(bool == '1'){
        bool == true;
    }
    else if (bool == '0')
    {
        bool == false;
    }
    websocketCtrl.send("decode_enabled =" + bool);
}

