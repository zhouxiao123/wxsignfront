/**
 * 留言信息校验js
 * Created by Administrator on 2016/12/29.
 */

//校验留言输入是否合法
var nameOk=false;
var telphoneOk=false;
var eMailOk=false;
var contentOk=false;
$(function () {
    $("#name").blur(checkName);
    $("#telphone").blur(checkTelphone);
    $("#email").blur(checkMail);
    $("#content").blur(checkContent);
});
//将输入数据转换为json格式
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
function saveMessage() {
    var data = $.toJSON($("#message").serializeObject());
    if (!checkMessageData()) {
        $("#errorForMessageSubmit").html("提交留言失败！请检查留言信息是否正确")
            .addClass("Validform_checktip Validform_wrong");
        return false;
    }
    $.ajax({
            type: 'POST',
            url: 'addMessage',
            data: data,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                if (1 == data.result) {
                    $("#errorForMessageSubmit").html("恭喜你，提交留言成功！").removeClass("Validform_checktip Validform_wrong")
                        .addClass("Validform_checktip Validform_right")
                    alert("提交留言成功!");
                } else
                alert("保存失败");
            }
        }
    )
}
//最终校验
function checkMessageData() {
 return !!(nameOk&& telphoneOk&& eMailOk&& contentOk);
}
//校验姓名
function checkName() {
    var reg = /^[\u2E80-\u9FFF]+$/;
    if ($("#name").val() == "") {
        $("#name").addClass("errorC");
        $("#errorForContactName").html("请输入中文姓名").addClass("Validform_checktip Validform_wrong");
        return nameOk;
    }
    if (!reg.test($("#name").val())) {
        $("#name").addClass("errorC");
        $("#errorForContactName").html("姓名格式有误，仅限中文名！").addClass("Validform_checktip Validform_wrong");
        return nameOk;
    }
    $("#name").addClass("checkedN");
    $("#errorForContactName").html("姓名可用！").removeClass("Validform_checktip Validform_wrong").addClass("Validform_checktip Validform_right");
     nameOk=true;
    return nameOk;
}
//校验电话
function checkTelphone() {
    var reg;
    reg = /^0?1[3|4|5|8][0-9]\d{8}$/;//验证手机正则(输入前7位至11位)
    //noinspection JSJQueryEfficiency
    if ($("#telphone").val() == "") {
        $("#telphone").addClass("errorC");
        $("#errorForContactTelphone").html("请输入手机号").addClass("Validform_checktip Validform_wrong");
        return telphoneOk;
    }
    //noinspection JSJQueryEfficiency
    if ($("#telphone").val().length < 11) {
        $("#telphone").addClass("errorC");
        $("#errorForContactTelphone").html("手机号长度有误").addClass("Validform_checktip Validform_wrong");
        return telphoneOk;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#telphone").val())) {
        $("#telphone").addClass("errorC");
        $("#errorForContactTelphone").html("请输入正确的手机号").addClass("Validform_checktip Validform_wrong");
        return telphoneOk;
    }
    //noinspection JSJQueryEfficiency
    $("#telphone").addClass("checkedN");
    $("#errorForContactTelphone").html("手机号码可用！").removeClass("Validform_checktip Validform_wrong").addClass("Validform_checktip Validform_right");
    telphoneOk = true;
    return telphoneOk;
}
//校验邮箱
function checkMail() {
    var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    if ($("#email").val() == "") {
        $("#email").addClass("errorC");
        $("#errorForContactEmail").html("请输入邮箱地址！").addClass("Validform_checktip Validform_wrong");
        return eMailOk;
    }
    if (!reg.test($("#email").val())) {
        $("#email").addClass("errorC");
        $("#errorForContactEmail").html("请输入正确的邮箱地址！").addClass("Validform_checktip Validform_wrong");
        return eMailOk;
    }
    $("#email").addClass("checkedN");
    $("#errorForContactEmail").html("邮箱可用！").removeClass("Validform_checktip Validform_wrong").addClass("Validform_checktip Validform_right");
      eMailOk=true;
      return eMailOk;
}
//内容校验
function checkContent() {
    if ($("#content").val() == "") {
        $("#content").addClass("errorC");
        $("#errorForContactContent").html("留言不能为空！").addClass("Validform_checktip Validform_wrong");
        return contentOk;
    }
    $("#content").addClass("checkedN");
    $("#errorForContactContent").html("留言可用！").removeClass("Validform_checktip Validform_wrong").addClass("Validform_checktip Validform_right");
    contentOk=true;
    return contentOk;
}

