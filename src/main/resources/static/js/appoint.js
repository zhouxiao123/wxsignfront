var nameOk = false;
var phoneOneOk = false;
var schoolOk = false;
var numberOk = false;
var phoneTwoOk = false;

var nameOk2 = false;
var phoneOneOk2 = false;
var schoolOk2 = false;
var numberOk2 = false;
var phoneTwoOk2 = false;
//校验订单表单输入信息是否合法
$(function () {
    //1、输入姓名校验
    //姓名栏获得焦点时输入
    //noinspection JSJQueryEfficiency
    $("#userName").focus(function () {
        $("#errorForName").hide();
    });
    //姓名栏失去焦点后校验
    //noinspection JSJQueryEfficiency
    $("#userName").blur(checkNameExist);

    //2、第一个手机号码校验
    //手机号栏获得焦点时输入
    //noinspection JSJQueryEfficiency
    $("#phoneOne").focus(function () {
        $("#errorForPhoneOne").hide();
    });
    //手机号栏失去焦点时校验
    //noinspection JSJQueryEfficiency
    $("#phoneOne").blur(checkPhoneNumberOneExist);

    //3、校验学校
    //学校名称栏获得焦点
    //noinspection JSJQueryEfficiency
    $("#school").focus(function () {
        $("#errorForSchool").hide();
    });
    //学校名称栏失去焦点时校验
    //noinspection JSJQueryEfficiency
    $("#school").blur(checkSchoolRight);

    //4、校验到场人数
    //到场人数栏获得焦点
    //noinspection JSJQueryEfficiency
    $("#numbers").focus(function () {
        $("#errorForNumbers").hide();
    });
    //到场人数栏失去焦点时校验
    //noinspection JSJQueryEfficiency
    $("#numbers").blur(checkNumberRight);

    //5、校验第二个手机号码
    //第二个手机号码栏获得焦点
    //noinspection JSJQueryEfficiency
    $("#phoneTwo").focus(function () {
        $("#errorForPhoneTwo").hide();
    });
    //第二个手机号码栏失去焦点时校验
    //noinspection JSJQueryEfficiency
    $("#phoneTwo").blur(checkPhoneNumberTwoExist);

    /**
     * 购买表单校验
     */
    //1、输入姓名校验
    //姓名栏获得焦点时输入
    //noinspection JSJQueryEfficiency
    $("#userName2").focus(function () {
        $("#errorForName2").hide();
    });
    //姓名栏失去焦点后校验
    //noinspection JSJQueryEfficiency
    $("#userName2").blur(checkNameOther2);

    //2、第一个手机号码校验
    //手机号栏获得焦点时输入
    //noinspection JSJQueryEfficiency
    $("#phoneOne2").focus(function () {
        $("#errorForPhoneOne2").hide();
    });
    //手机号栏失去焦点时校验
    //noinspection JSJQueryEfficiency
    $("#phoneOne2").blur(checkNumberOneOther2);

    //3、校验学校
    //学校名称栏获得焦点
    //noinspection JSJQueryEfficiency
    $("#school2").focus(function () {
        $("#errorForSchool2").hide();
    });
    //学校名称栏失去焦点时校验
    //noinspection JSJQueryEfficiency
    $("#school2").blur(checkSchoolRight2);

    //4、校验到场人数
    //到场人数栏获得焦点
    //noinspection JSJQueryEfficiency
    $("#numbers2").focus(function () {
        $("#errorForNumbers2").hide();
    });
    //到场人数栏失去焦点时校验
    //noinspection JSJQueryEfficiency
    $("#numbers2").blur(checkNumberRight2);

    //5、校验第二个手机号码
    //第二个手机号码栏获得焦点
    //noinspection JSJQueryEfficiency
    $("#phoneTwo2").focus(function () {
        $("#errorForPhoneTwo2").hide();
    });
    //第二个手机号码栏失去焦点时校验
    //noinspection JSJQueryEfficiency
    //$("#phoneTwo2").blur(checkPhoneNumberTwoExist2);
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
//添加订单的函数
function addAppoint() {
    //noinspection JSJQueryEfficiency,JSJQueryEfficiency
    if ($("#numbers").val() < 3 && $("#numbers").val() > 0) {//先进行人数判断，若小于3人提交的话就把第二个手机号码清空
        $("#phoneTwo").html("");//清空第二个手机号码
        //清空后再将数据打包
        var data = $.toJSON($('#mainForm1').serializeObject());
        console.log(data);
        if (!checkData()) {
            $(".zzc04").show();
            $(".zzc02").hide();
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'addAppoint',
            data: data,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                if (1 == data.result) {
                    console.log("订单添加成功！");
                    $(".zzc03").show();
                    $(".zzc02").hide();
                } else if (-1 == data.result) {
                    console.log("后端校验失败！");
                } else
                    console.log("订单添加失败！");
            }
        });
    }
    //此else为当人数为3-4人时的提交通道
    //提交时再次进行校验，不通过则不提交
    //noinspection JSJQueryEfficiency
    else {
        var data = $.toJSON($('#mainForm1').serializeObject());
        console.log(data);
        if (!checkData()) {
            $(".zzc04").show();
            $(".zzc02").hide();
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'addAppoint',
            data: data,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                if (1 == data.result) {
                    console.log("订单添加成功！");
                    $(".zzc03").show();
                    $(".zzc02").hide();
                    return true;
                } else if (-1 == data.result) {
                    console.log("后端校验失败！");
                } else
                    console.log("订单添加失败！");
            }
        });
    }
}

//添加购买订单的函数
function addLessonAppoint() {
    //noinspection JSJQueryEfficiency,JSJQueryEfficiency
    /*if ($("#numbers").val() < 3 && $("#numbers").val() > 0) {//先进行人数判断，若小于3人提交的话就把第二个手机号码清空
        $("#phoneTwo").html("");//清空第二个手机号码
        //清空后再将数据打包
        var data = $.toJSON($('#mainForm1').serializeObject());
        console.log(data);*/
        if (!checkData2()) {
            alert("请填写正确的信息!");
            return false;
        }
        $(".zzc06").hide();
        $("#mainForm2").submit();
   // }

}

//提交时再次进行校验，若校验不成功则不提交
function checkData() {
    //noinspection JSJQueryEfficiency,JSJQueryEfficiency
    return !($("#numbers").val() > 2 && $("#numbers").val() < 5) ? !!( nameOk && schoolOk && phoneOneOk && numberOk) : !!( nameOk && schoolOk && phoneTwoOk && phoneOneOk && numberOk);
}
//开始进行具体校验

//输入姓名校验(未做姓名防重复校验)
function checkNameExist() {
    //获取当前表单所在的讲座编号
    var lectureNumber = $("#lectureNumber").val();
    //ajax后台校验姓名是否重复,当讲座编号不同时姓名可以重复
    var name = $.trim($("#userName").val());
    $.ajax({
        type: 'post',
        url: 'selectLectureNumber',
        dataType: 'json',
        data: {"name": name, "lectureNumber": lectureNumber},
        success: function (data) {
            //如果当前的用户名所对应的讲座编号是否大于1表示用户已经用这个姓名预约过这个讲座
            if (data.result >= 1) {
                $("#userName").parent().addClass("errorC");
                $("#errorForName").html("您已用该姓名预约过此讲座，请不要重复预约").css("display", "block").removeClass("right").addClass("error");
                return nameOk;
            }
            return checkNameOther();
        }
    });
}
//检查其余部分（是否为中文名和是否为空）
function checkNameOther() {
    var reg = /^[\u2E80-\u9FFF]+$/;
    //noinspection JSJQueryEfficiency
    if ($("#userName").val() == "") {
        $("#userName").parent().addClass("errorC");
        $("#errorForName").html("请输入中文姓名").css("display", "block").removeClass("right").addClass("error");
        return nameOk;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#userName").val())) {
        $("#userName").parent().addClass("errorC");
        $("#errorForName").html("姓名格式有误，仅限中文名").css("display", "block").removeClass("right").addClass("error");
        return nameOk;
    }
    //noinspection JSJQueryEfficiency
    $("#userName").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForName").html("姓名可用");
    //noinspection JSJQueryEfficiency
    $("#errorForName").css("display", "block").removeClass("error").addClass("right");
    nameOk = true;
    return nameOk;
}

//手机号栏失去焦点
//校验第一个手机号码是否存在
function checkPhoneNumberOneExist() {
    var phoneNumber = $.trim($("#phoneOne").val());
    var lectureNumber = $("#lectureNumber").val();
    // var name = $.trim($("#userName").val());
    $.ajax({
        type: 'post',
        url: 'checkPhoneNumber',
        dataType: 'json',
        data: {"phoneNumber": phoneNumber, "lectureNumber": lectureNumber},
        success: function (data) {
            if (1 == data.result) {
                $("#phoneOne").parent().addClass("errorC");
                $("#errorForPhoneOne").html("手机号码已存在，请更换").css("display", "block").removeClass("right").addClass("error");
                return phoneOneOk;
            }
            //noinspection JSJQueryEfficiency
            $("#phoneOne").parent().addClass("checkedN");
            return checkNumberOneOther();
        }
    });
}

//检查其余部分
function checkNumberOneOther() {
    var reg;
    reg = /^0?1[3|4|5|8][0-9]\d{8}$/;//验证手机正则(输入前7位至11位)
    //noinspection JSJQueryEfficiency
    if ($("#phoneOne").val() == "") {
        $("#phoneOne").parent().addClass("errorC");
        $("#errorForPhoneOne").html("请输入手机号").css("display", "block").removeClass("right").addClass("error");
        return phoneOneOk;
    }
    //noinspection JSJQueryEfficiency
    if ($("#phoneOne").val().length < 11) {
        $("#phoneOne").parent().addClass("errorC");
        $("#errorForPhoneOne").html("手机号长度有误").css("display", "block").removeClass("right").addClass("error");
        return phoneOneOk;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#phoneOne").val())) {
        $("#phoneOne").parent().addClass("errorC");
        $("#errorForPhoneOne").html("请输入正确的手机号").css("display", "block").removeClass("right").addClass("error");
        return phoneOneOk;
    }
    //noinspection JSJQueryEfficiency
    $("#phoneOne").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForPhoneOne").html("手机号可用").css("display", "block").removeClass("error").addClass("right");
    phoneOneOk = true;
    return phoneOneOk;
}

//学校名称栏失去焦点
function checkSchoolRight() {
    var reg = /^[\u2E80-\u9FFF]+$/;
    //noinspection JSJQueryEfficiency
    if ($("#school").val() == "") {
        $("#school").parent().addClass("errorC");
        $("#errorForSchool").html("请输入中文学校名称").css("display", "block").removeClass("right").addClass("error");
        return schoolOk;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#school").val())) {
        $("#school").parent().addClass("errorC");
        $("#errorForSchool").html("学校名称格式有误，仅限中文名").css("display", "block").removeClass("right").addClass("error");
        return schoolOk;
    }
    //noinspection JSJQueryEfficiency
    $("#school").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForSchool").html("学校名称可用").css("display", "block").removeClass("error").addClass("right");
    schoolOk = true;
    return schoolOk;
}
//到场人数栏失去焦点
function checkNumberRight() {
    var reg = /^[0-9]*$/i;
    //noinspection JSJQueryEfficiency
    if ($("#numbers").val() == "") {
        $("#numbers").parent().addClass("errorC");
        $("#errorForNumbers").html("请输入到场人数").css("display", "block").removeClass("right").addClass("error");
        return numberOk;
    }
    //noinspection JSJQueryEfficiency,JSJQueryEfficiency
    if ((parseInt($("#numbers").val()) > 2) && (parseInt($("#numbers").val()) < 5)) {
        //noinspection JSJQueryEfficiency
        $("#numbers").parent().addClass("errorC");
        $("#errorForNumbers").html("请再输入一个手机号码").css("display", "block").removeClass("error").addClass("right");
        $("#divForPhoneTwo").css("display", "block");
        numberOk = true;
        return numberOk;
    }
    //noinspection JSJQueryEfficiency,JSJQueryEfficiency
    if ((parseInt($("#numbers").val()) == 0) || (parseInt($("#numbers").val()) > 4)) {
        $("#numbers").parent().addClass("errorC");
        $("#errorForNumbers").html("请输入大于0,小于5的整数").css("display", "block").removeClass("right").addClass("error");
        return numberOk;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#numbers").val())) {
        $("#numbers").parent().addClass("errorC");
        $("#errorForNumbers").html("请输入正确的到场人数").css("display", "block").removeClass("right").addClass("error");
        return numberOk;
    }
    //noinspection JSJQueryEfficiency
    $("#numbers").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForNumbers").css("display", "block");
    //noinspection JSJQueryEfficiency
    $("#divForPhoneTwo").css("display", "none");//当人数小于3人大于等于1人时，将第二个手机号码输入框隐藏
    $("#errorForPhoneTwo").css("display", "none");//同时将第二个手机号码的提示语隐藏
    //noinspection JSJQueryEfficiency
    $("#errorForNumbers").html("人数可用").removeClass("error").addClass("right");
    numberOk = true;
    return numberOk;
}

//手机号栏二失去焦点
function checkPhoneNumberTwoExist() {
    //noinspection JSJQueryEfficiency
    if ($("#phoneTwo").val() == "") {
        $("#phoneTwo").parent().addClass("errorC");
        $("#errorForPhoneTwo").html("请输入手机号").css("display", "block").removeClass("right").addClass("error");
        return phoneTwoOk;
    }
    //noinspection JSJQueryEfficiency
    var phoneNumberTwo = $.trim($("#phoneTwo").val());
    var lectureNumber = $("#lectureNumber").val();
    $.ajax({
        type: 'post',
        url: 'checkPhoneNumberTwo',
        dataType: 'json',
        data: {"phoneNumberTwo": phoneNumberTwo, "lectureNumber": lectureNumber},
        success: function (data) {
            if (1 == data.result) {
                $("#phoneTwo").parent().addClass("errorC");
                $("#errorForPhoneTwo").html("手机号码已存在，请更换").css("display", "block").removeClass("right").addClass("error");
                return phoneTwoOk;
            }
            //noinspection JSJQueryEfficiency
            $("#phoneTwo").parent().addClass("checkedN");
            $("#numbers").parent().addClass("checkedN");
            return checkPhoneNumberTwoOther();
        }
    });
}

function checkPhoneNumberTwoOther() {
    var reg;
    reg = /^0?1[3|4|5|8][0-9]\d{8}$/;//验证手机正则(输入前7位至11位)
    //noinspection JSJQueryEfficiency
    if ($("#phoneTwo").val().length < 11) {
        $("#phoneTwo").parent().addClass("errorC");
        $("#errorForPhoneTwo").html("请输入正确的手机号！").css("display", "block").removeClass("right").addClass("error");
        return phoneTwoOk;
    }
    //noinspection JSJQueryEfficiency
    if ($("#phoneTwo").val() == $("#phoneOne").val()) {
        $("#phoneTwo").parent().addClass("errorC");
        $("#errorForPhoneTwo").html("两次输入的手机号码不能相同！").css("display", "block").removeClass("right").addClass("error");
        return phoneTwoOk;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#phoneTwo").val())) {
        $("#phoneTwo").parent().addClass("errorC");
        $("#errorForPhoneTwo").html("请输入正确的手机号").css("display", "block").removeClass("right").addClass("error");
        return phoneTwoOk;
    }
    //noinspection JSJQueryEfficiency
    $("#phoneTwo").parent().addClass("checkedN");
    $("#numbers").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForPhoneTwo").html("手机号码2可用").css("display", "block").removeClass("error").addClass("right");
    phoneTwoOk = true;
    return phoneTwoOk;
}

/**
 * 购买表单校验
 * @returns {boolean}
 */
//提交时再次进行校验，若校验不成功则不提交
function checkData2() {
    //noinspection JSJQueryEfficiency,JSJQueryEfficiency
    //return !($("#numbers2").val() > 2 && $("#numbers2").val() < 5) ? !!( nameOk && schoolOk && phoneOneOk && numberOk) : !!( nameOk && schoolOk && phoneTwoOk && phoneOneOk && numberOk);
    return  !!( nameOk2 && schoolOk2 && phoneOneOk2 && numberOk2);
}
//开始进行具体校验

//输入姓名校验(未做姓名防重复校验)
/*function checkNameExist2() {
    //获取当前表单所在的讲座编号
    var lessonNumber = $("#lessonNumber").val();
    //ajax后台校验姓名是否重复,当讲座编号不同时姓名可以重复
    var name = $.trim($("#userName2").val());
    $.ajax({
        type: 'post',
        url: 'selectLessonNumber',
        dataType: 'json',
        data: {"name": name, "lessonNumber": lessonNumber},
        success: function (data) {
            //如果当前的用户名所对应的讲座编号是否大于1表示用户已经用这个姓名预约过这个讲座
            if (data.result >= 1) {
                $("#userName2").parent().addClass("errorC");
                $("#errorForName2").html("您已用该姓名预约过此讲座，请不要重复预约").css("display", "block").removeClass("right").addClass("error");
                return nameOk2;
            }
            return checkNameOther2();
        }
    });
}*/
//检查其余部分（是否为中文名和是否为空）
function checkNameOther2() {
    var reg = /^[\u2E80-\u9FFF]+$/;
    //noinspection JSJQueryEfficiency
    if ($("#userName2").val() == "") {
        $("#userName2").parent().addClass("errorC");
        $("#errorForName2").html("请输入中文姓名").css("display", "block").removeClass("right").addClass("error");
        return nameOk2;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#userName2").val())) {
        $("#userName2").parent().addClass("errorC");
        $("#errorForName2").html("姓名格式有误，仅限中文名").css("display", "block").removeClass("right").addClass("error");
        return nameOk2;
    }
    //noinspection JSJQueryEfficiency
    $("#userName2").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForName2").html("姓名可用");
    //noinspection JSJQueryEfficiency
    $("#errorForName2").css("display", "block").removeClass("error").addClass("right");
    nameOk2 = true;
    return nameOk2;
}

//手机号栏失去焦点
//校验第一个手机号码是否存在
/*function checkPhoneNumberOneExist2() {
    var phoneNumber = $.trim($("#phoneOne2").val());
    var lessonNumber = $("#lessonNumber2").val();
    // var name = $.trim($("#userName").val());
    $.ajax({
        type: 'post',
        url: 'checkPhoneNumber',
        dataType: 'json',
        data: {"phoneNumber": phoneNumber, "lectureNumber": lectureNumber},
        success: function (data) {
            if (1 == data.result) {
                $("#phoneOne").parent().addClass("errorC");
                $("#errorForPhoneOne").html("手机号码已存在，请更换").css("display", "block").removeClass("right").addClass("error");
                return phoneOneOk;
            }
            //noinspection JSJQueryEfficiency
            $("#phoneOne").parent().addClass("checkedN");
            return checkNumberOneOther();
        }
    });
}*/

//检查其余部分
function checkNumberOneOther2() {
    var reg;
    reg = /^0?1[3|4|5|8][0-9]\d{8}$/;//验证手机正则(输入前7位至11位)
    //noinspection JSJQueryEfficiency
    if ($("#phoneOne2").val() == "") {
        $("#phoneOne2").parent().addClass("errorC");
        $("#errorForPhoneOne2").html("请输入手机号").css("display", "block").removeClass("right").addClass("error");
        return phoneOneOk2;
    }
    //noinspection JSJQueryEfficiency
    if ($("#phoneOne2").val().length < 11) {
        $("#phoneOne2").parent().addClass("errorC");
        $("#errorForPhoneOne2").html("手机号长度有误").css("display", "block").removeClass("right").addClass("error");
        return phoneOneOk2;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#phoneOne2").val())) {
        $("#phoneOne2").parent().addClass("errorC");
        $("#errorForPhoneOne2").html("请输入正确的手机号").css("display", "block").removeClass("right").addClass("error");
        return phoneOneOk2;
    }
    //noinspection JSJQueryEfficiency
    $("#phoneOne2").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForPhoneOne2").html("手机号可用").css("display", "block").removeClass("error").addClass("right");
    phoneOneOk2 = true;
    return phoneOneOk2;
}

//学校名称栏失去焦点
function checkSchoolRight2() {
    var reg = /^[\u2E80-\u9FFF]+$/;
    //noinspection JSJQueryEfficiency
    if ($("#school2").val() == "") {
        $("#school2").parent().addClass("errorC");
        $("#errorForSchool2").html("请输入中文学校名称").css("display", "block").removeClass("right").addClass("error");
        return schoolOk2;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#school2").val())) {
        $("#school2").parent().addClass("errorC");
        $("#errorForSchool2").html("学校名称格式有误，仅限中文名").css("display", "block").removeClass("right").addClass("error");
        return schoolOk2;
    }
    //noinspection JSJQueryEfficiency
    $("#school2").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForSchool2").html("学校名称可用").css("display", "block").removeClass("error").addClass("right");
    schoolOk2 = true;
    return schoolOk2;
}
//到购买张数栏失去焦点
function checkNumberRight2() {
    var reg = /^[0-9]*$/i;
    //noinspection JSJQueryEfficiency
    if ($("#numbers2").val() == "") {
        $("#numbers2").parent().addClass("errorC");
        $("#errorForNumbers2").html("请输入购买张数").css("display", "block").removeClass("right").addClass("error");
        return numberOk2;
    }
    //noinspection JSJQueryEfficiency,JSJQueryEfficiency
    /*if ((parseInt($("#numbers2").val()) > 2) && (parseInt($("#numbers2").val()) < 5)) {
        //noinspection JSJQueryEfficiency
        $("#numbers2").parent().addClass("errorC");
        $("#errorForNumbers2").html("请再输入一个手机号码").css("display", "block").removeClass("error").addClass("right");
        $("#divForPhoneTwo2").css("display", "block");
        numberOk2 = true;
        return numberOk2;
    }*/
    //noinspection JSJQueryEfficiency,JSJQueryEfficiency
    if ((parseInt($("#numbers2").val()) == 0) || (parseInt($("#numbers2").val()) > 4)) {
        $("#numbers2").parent().addClass("errorC");
        $("#errorForNumbers2").html("请输入大于0,小于5的整数").css("display", "block").removeClass("right").addClass("error");
        return numberOk2;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#numbers2").val())) {
        $("#numbers2").parent().addClass("errorC");
        $("#errorForNumbers2").html("请输入正确的购买张数").css("display", "block").removeClass("right").addClass("error");
        return numberOk2;
    }
    //noinspection JSJQueryEfficiency
    $("#numbers2").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForNumbers2").css("display", "block");
    //noinspection JSJQueryEfficiency
    $("#divForPhoneTwo2").css("display", "none");//当人数小于3人大于等于1人时，将第二个手机号码输入框隐藏
    $("#errorForPhoneTwo2").css("display", "none");//同时将第二个手机号码的提示语隐藏
    //noinspection JSJQueryEfficiency
    $("#errorForNumbers2").html("张数可用").removeClass("error").addClass("right");
    numberOk2 = true;
    return numberOk2;
}

//手机号栏二失去焦点
/*function checkPhoneNumberTwoExist() {
    //noinspection JSJQueryEfficiency
    if ($("#phoneTwo").val() == "") {
        $("#phoneTwo").parent().addClass("errorC");
        $("#errorForPhoneTwo").html("请输入手机号").css("display", "block").removeClass("right").addClass("error");
        return phoneTwoOk;
    }
    //noinspection JSJQueryEfficiency
    var phoneNumberTwo = $.trim($("#phoneTwo").val());
    var lectureNumber = $("#lectureNumber").val();
    $.ajax({
        type: 'post',
        url: 'checkPhoneNumberTwo',
        dataType: 'json',
        data: {"phoneNumberTwo": phoneNumberTwo, "lectureNumber": lectureNumber},
        success: function (data) {
            if (1 == data.result) {
                $("#phoneTwo").parent().addClass("errorC");
                $("#errorForPhoneTwo").html("手机号码已存在，请更换").css("display", "block").removeClass("right").addClass("error");
                return phoneTwoOk;
            }
            //noinspection JSJQueryEfficiency
            $("#phoneTwo").parent().addClass("checkedN");
            $("#numbers").parent().addClass("checkedN");
            return checkPhoneNumberTwoOther();
        }
    });
}

function checkPhoneNumberTwoOther() {
    var reg;
    reg = /^0?1[3|4|5|8][0-9]\d{8}$/;//验证手机正则(输入前7位至11位)
    //noinspection JSJQueryEfficiency
    if ($("#phoneTwo").val().length < 11) {
        $("#phoneTwo").parent().addClass("errorC");
        $("#errorForPhoneTwo").html("请输入正确的手机号！").css("display", "block").removeClass("right").addClass("error");
        return phoneTwoOk;
    }
    //noinspection JSJQueryEfficiency
    if ($("#phoneTwo").val() == $("#phoneOne").val()) {
        $("#phoneTwo").parent().addClass("errorC");
        $("#errorForPhoneTwo").html("两次输入的手机号码不能相同！").css("display", "block").removeClass("right").addClass("error");
        return phoneTwoOk;
    }
    //noinspection JSJQueryEfficiency
    if (!reg.test($("#phoneTwo").val())) {
        $("#phoneTwo").parent().addClass("errorC");
        $("#errorForPhoneTwo").html("请输入正确的手机号").css("display", "block").removeClass("right").addClass("error");
        return phoneTwoOk;
    }
    //noinspection JSJQueryEfficiency
    $("#phoneTwo").parent().addClass("checkedN");
    $("#numbers").parent().addClass("checkedN");
    //noinspection JSJQueryEfficiency
    $("#errorForPhoneTwo").html("手机号码2可用").css("display", "block").removeClass("error").addClass("right");
    phoneTwoOk = true;
    return phoneTwoOk;
}*/

