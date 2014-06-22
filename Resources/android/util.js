function getFile(filename) {
    var file;
    var newDir = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, "datas");
    newDir.createDirectory();
    var file = Ti.Filesystem.getFile(newDir.nativePath, filename);
    return file;
}

function FileDB(filename) {
    var self = this;
    self.filename = filename;
    this.get = function() {
        var file = getFile(self.filename);
        if (!file.exists) return null;
        var content = file.read();
        if (!(content && content.length > 0)) return null;
        try {
            return JSON.parse(content);
        } catch (e) {
            self.delete();
        }
    };
    this.set = function(data) {
        var file = getFile(self.filename);
        file.write(JSON.stringify(data));
    };
    this.delete = function() {
        var file = getFile(self.filename);
        file.write("");
    };
    return this;
}

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

exports.questionnaire = new FileDB("questionnaire_answer");

exports.userLoginInfo = new FileDB("userLoginInfo");