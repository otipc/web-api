var level = "";

$(document).ready(function () {

    $('input').on('ifChanged', function (event) {
        if ($(this).is(':checked')) {
            level = $(this).val();
        } else {
            level = "";
        }
    });

    $(":button[name='submit']").click(function () {
        var name = $(":input[name='userName']").val();
        if (name.length == 0) {
            alert("用户名不能为空!");
            return;
        }
        if (level.length == 0) {
            alert("请选择用户类型!");
            return;
        }
        var password = $(":input[name='password']").val();
        var password2 = $(":input[name='password2']").val();

        if (password.length == 0 || password != password2) {
            alert("两次密码不一致！");
            return;
        }

        var data = {
            level: level,
            userName: name,
            password: password
        };

        // var url = "http://127.0.0.1:18080";
        var url = "http://192.168.49.119:9093";


        $.ajax({
            type: 'POST',
            url: url + "/manage/user/create",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {
                bootbox.alert({
                    title:"Message",
                    message: "Success",
                    size: 'small',
                    callback: function () {
                        console.log("Alert Callback");
                    }
                });
            },
            error: function (data) {
                bootbox.alert({
                    title:"Message",
                    message: "Error",
                    size: 'small',
                    callback: function () {
                        console.log("Alert Callback");
                    }
                });
            }

        });


    });


});