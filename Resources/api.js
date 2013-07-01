function DB() {
    var dbName = "userpref";
    this.dbName = dbName;
    this.execQuery = function(queries) {
        var db = Titanium.Database.open(dbName);
        var rows = null;
        for (var i = 0; queries.length > i; i += 1) {
            var q = queries[i];
            try {
                rows = db.execute(q);
            } catch (e) {
                Ti.API.error("DB error" + e);
            }
        }
        var values = null;
        if (null != rows) {
            values = {};
            if (rows.getRowCount() > 0) do values[rows.fieldByName("k")] = rows.fieldByName("v"); while (rows.next());
        }
        db.close();
        return values;
    };
    return this;
}

function APIClient() {
    var db = this.db = new DB();
    Ti.API.info("Create table");
    db.execQuery([ "CREATE TABLE IF NOT EXISTS KVS (k TEXT,v TEXT);" ]);
    db.execQuery([ "select * from KVS;" ]);
    var writeDb = function(key, value) {
        db.execQuery([ "delete from KVS where k = '" + key + "';", "insert into KVS VALUES ('" + key + "','" + value + "');" ]);
    };
    var readDb = function(key) {
        var rows = db.execQuery([ "select * from KVS where k = '" + key + "';" ]);
        Ti.API.debug(rows);
        return rows ? rows[key] : null;
    };
    var self = this;
    var accessKey = readDb("accessKey");
    this.userId = readDb("userId");
    this.nickname = readDb("nickname");
    this.accessKey = accessKey;
    this.isLogin = this.accessKey && "" != this.accessKey;
    Ti.API.info("AK = " + accessKey + " login:" + this.isLogin);
    this.get = function(url, params, callback) {
        0 != url.indexOf("http") && (url = 0 == url.indexOf("/") ? ServerUrl + url : ServerUrl + "/" + url);
        Ti.API.log("GET:" + url);
        var c = Ti.Network.createHTTPClient({
            onload: function() {
                var ak = this.responseText;
                Ti.API.info("Success - GET:" + url);
                var d = JSON.parse(ak);
                callback(d);
            },
            onerror: function(e) {
                Ti.API.error("Fail - GET:" + url + " Error=" + e.error);
                callback(null);
            }
        });
        c.open("GET", url);
        self.isLogin && c.setRequestHeader(AccessKeyHeader, accessKey);
        c.send();
    };
    this.post = function(url, params, callback) {
        0 != url.indexOf("http") && (url = 0 == url.indexOf("/") ? ServerUrl + url : ServerUrl + "/" + url);
        var c = Ti.Network.createHTTPClient({
            onload: function() {
                var ak = this.responseText;
                Ti.API.info("Success - POST:" + url);
                var d = JSON.parse(ak);
                callback(d);
            },
            onerror: function(e) {
                Ti.API.error("Fail - POST:" + url + " Error=" + e.error);
                callback(null);
            }
        });
        c.open("POST", url);
        self.isLogin && c.setRequestHeader(AccessKeyHeader, accessKey);
        c.setRequestHeader("Content-Type", "text/json");
        c.send(JSON.stringify(params));
    };
    this.postBinary = function(url, data, onProgress, callback) {
        0 != url.indexOf("http") && (url = 0 == url.indexOf("/") ? ServerUrl + url : ServerUrl + "/" + url);
        var c = Ti.Network.createHTTPClient({
            onsendstream: function(e) {
                Ti.API.debug("Progress " + e.progress);
                onProgress(e);
            },
            onload: function() {
                Ti.API.info("Success to upload photo");
                var ak = this.responseText;
                var d = JSON.parse(ak);
                callback(d);
            },
            onerror: function(e) {
                Ti.API.error("Fail to upload photo:" + e.error);
                alert("Fail to upload photo");
                callback(null);
            }
        });
        c.open("POST", url);
        self.isLogin && c.setRequestHeader(AccessKeyHeader, accessKey);
        Ti.API.debug("AK=" + accessKey);
        c.send(data);
    };
    this.createAccount = function(nickname, cb) {
        self.post("/create/account", {
            nickname: nickname
        }, function(userData) {
            if (null != userData) {
                self.accessKey = userData.accessKey;
                self.userId = userData.userId;
                self.nickname = userData.nickname;
                Ti.API.info("Success to create account:" + self.userId);
                writeDb("accessKey", self.accessKey);
                writeDb("userId", self.userId);
                writeDb("nickname", self.nickname);
                cb(true);
            } else {
                Ti.API.debug("Fail to create acount");
                cb(false);
            }
        });
    };
    this.logout = function() {
        Ti.API.debug("Logout");
        self.accessKey = null;
        self.userId = 0;
        self.nickname = null;
        writeDb("accessKey", "");
        writeDb("userId", "");
        writeDb("nickname", "");
    };
    return this;
}

function PostManager() {
    this.myPosts = [];
    this.post = function(image, goodness, callback) {
        Titanium.Geolocation.getCurrentPosition(function(e) {
            var lat = e.coords.latitude;
            var lon = e.coords.longitude;
            lat += .02 * Math.random() - .01;
            lon += .02 * Math.random() - .01;
            client.postBinary("/photo/upload", image, function() {}, function(result) {
                var imageId = result.imageId;
                Ti.API.info("Success to upload image : " + imageId);
                callback(null);
            });
        });
    };
    this.getNearByPosts = function(callback) {
        callback(m.myPosts);
    };
    this.getMyPosts = function(callback) {
        callback(m.myPosts);
    };
    return this;
}

function LandManager() {
    this.getOwnLonds = function() {
        return [ {
            title: "１番の田んぼ"
        }, {
            title: "２番の田んぼ"
        }, {
            title: "海の田んぼ"
        } ];
    };
    return this;
}

var AccessKeyHeader = "BBLN-ACCESS-KEY";

var ServerUrl = "http://localhost:9000";

var client = new APIClient();

exports.client = client;

exports.postManager = new PostManager();

exports.landManager = new LandManager();