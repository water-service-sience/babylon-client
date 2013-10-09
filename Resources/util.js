var dateFormat = function(date) {
    if (null == date) return "----";
    ("int" == typeof date || "string" == typeof date || "number" == typeof date) && (date = new Date(date));
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
};

exports.dateToString = dateFormat;

exports.dateFormat = dateFormat;

exports.goodnessToString = function(goodness) {
    return 10 > goodness ? "非常に悪い" : 30 > goodness ? "悪い" : 70 > goodness ? "普通" : 90 > goodness ? "良い" : "非常に良い";
};

exports.niceTimeString = function(date) {
    if (!date) return "不明";
    "date" != typeof date && (date = new Date(date));
    var diff = new Date().getTime() - date.getTime();
    var DAY = 864e5;
    var HOUR = 36e5;
    var MINUTE = 6e4;
    return diff > DAY ? Math.floor(diff / DAY) + "日前" : diff > HOUR ? Math.floor(diff / HOUR) + "時間前" : diff > MINUTE ? Math.floor(diff / MINUTE) + "分前" : "ちょうど今";
};