var baseUrl = "http://192.168.49.119:9090";


$(document).ready(function () {
    $(":button[name='submit']").click(function () {
        var type = $(":input[name='typeName']").val();
        if (type.length == 0) {
            return;
        }

        var refer = $(":input[name='referName']").val();
        if (refer.length == 0) {
            return;
        }

        $.post(baseUrl + "/config/add/" + type + "/" + refer)
            .success(function (data) {
                bootbox.alert({
                    title: "Message",
                    message: "Success",
                    size: 'small',
                    callback: function () {
                        console.log("Alert Callback");
                    }
                });
            }).error(function () {
            bootbox.alert({
                title: "Message",
                message: "Error",
                size: 'small',
                callback: function () {
                    console.log("Alert Callback");
                }
            });
        });
    });


    $(":button[name='create']").click(function () {
        alert("dafds");
    });

});
