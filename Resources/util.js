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