exports.dateToString = function(date) {
    ("int" == typeof date || "string" == typeof date || "number" == typeof date) && (date = new Date(date));
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
};