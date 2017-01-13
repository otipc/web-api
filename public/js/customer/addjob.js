function postSubmit() {

    var jobName = $("#jobName").val();
    var connectString = $("#connectString").val();
    var queryString = $("#queryString").val();
    var dataTable = $("#dataTable").val();
    var tableColumns = $("#tableColumns").val();
    var userName = $("#userName").val();
    var password = $("#password").val();
    var splitBy = $("#splitBy").val();
    var where = $("#where").val();
    var fieldsTerminatedBy = $("#fieldsTerminatedBy").val();
    var hiveTableName = $("#hiveTableName").val();
    var dateTo = $("#dataTo").val();

    if (jobName == "") {
        alert("job Name must !")
        return
    }
    if (connectString == "") {
        alert("Connect String must !")
        return
    }

    if (userName == "") {
        alert("userName must !")
        return
    }

    if (password == "") {
        alert("password must !")
        return
    }

    var mapperNum = $("#mapperNum").val();

    if (dataToType != "hdfs" && dataToType != "hive") {
        alert("请选择导入到 hdfs OR hive OR hive table");
        return;
    }


    var obj = {
        "jobName": jobName,
        "connect": connectString,
        "queryStr": queryString,
        "dataTable": dataTable,
        "columns": tableColumns,
        "userName": userName,
        "password": password,
        "dataToType": dataToType,
        "hiveTable": hiveTableName,
        "dataTo": dateTo,
        "fileType": fileType,
        "fieldsTerminatedBy": fieldsTerminatedBy,
        "append": appendType,
        "splitBy": splitBy,
        "whare": where,
        "mapperNum": parseInt(mapperNum)
    };

    var baseUrl = "http://192.168.49.160:8090";

    // alert(JSON.stringify(obj));

    $.ajax({
        type: "POST",
        url: baseUrl + "/job/newJob",
        contentType: "application/json",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (result) {
            // alert(JSON.stringify(result));
            bootbox.alert({
                title: "Message",
                message: "Success",
                size: 'small',
                callback: function () {
                    console.log("Alert Callback");
                }
            });
        },
        error: function (result) {
            bootbox.alert({
                title: "Message",
                message: "Error",
                size: 'small',
                callback: function () {
                    console.log("Alert Callback");
                }
            });
        }
    });

}

var appendType = "";
var fileType = "";
var dataToType = "";


$(document).ready(function () {


    $('input').on('ifChanged', function (event) {
        // alert($(this).attr("name"));
        var radioName = $(this).attr("name");
        var text = $(this).val();
        if ("type" == radioName) {
            if ("queryString" == text) {
                $("#queryString").parent().parent().removeClass("hidden");
                $("#splitBy").parent().parent().removeClass("hidden");
                $("#dataTable").parent().parent().addClass("hidden");
            } else if ("tableName" == text) {
                $("#dataTable").parent().parent().removeClass("hidden");
                $("#queryString").parent().parent().addClass("hidden");
                $("#splitBy").parent().parent().addClass("hidden");
            } else {
                alert("error");
            }
        } else if ("importType" == radioName) {
            // alert("i am here");
            dataToType = text;
            if ("hdfs" == text) {
                $("#hiveTableName").parent().parent().addClass("hidden");
                $("#toHiveTable").parent().parent().parent().parent().addClass("hidden");
                $("#fileAppend").parent().parent().parent().parent().removeClass("hidden");
                $("#overWrite").parent().parent().parent().parent().addClass("hidden");
            } else if ("hive" == text) {
                $("#toHiveTable").parent().parent().parent().parent().removeClass("hidden");
                $("#hiveTableName").parent().parent().addClass("hidden");
                $("#fileAppend").parent().parent().parent().parent().addClass("hidden");
                $("#overWrite").parent().parent().parent().parent().removeClass("hidden");
            } else {
                alert("error");
            }

        } else if ("fileType" == radioName) {
            if ($(this).is(':checked')) {
                fileType = $(this).val();
            } else {
                fileType = "";
            }
        } else if ("toHiveTable" == radioName) {
            if ($(this).is(':checked')) {
                $("#hiveTableName").parent().parent().removeClass("hidden");
            } else {
                $("#hiveTableName").parent().parent().addClass("hidden");
            }
        } else if ("fileAppend" == radioName) {
            if ($(this).is(':checked')) {
                appendType = "fileAppend"
            } else {
                appendType = "";
            }
        } else if ("overWrite" == radioName) {
            if ($(this).is(':checked')) {
                appendType = "fileOverWrite"
            } else {
                appendType = "";
            }
        }
    });


});