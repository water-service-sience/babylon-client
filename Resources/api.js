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
    var accessKey = this.accessKey = readDb("accessKey");
    this.userId = readDb("userId");
    this.nickname = readDb("nickname");
    this.isLogin = null != this.accessKey;
    this.get = function(url, params, callback) {
        0 != url.indexOf("http") && (0 == url.indexOf("/") ? ServerUrl + url : ServerUrl + "/" + url);
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
        accessKey && c.setRequestHeader(AccessKeyHeader, accessKey);
        c.send();
    };
    this.post = function(url, params, callback) {
        0 != url.indexOf("http") && (0 == url.indexOf("/") ? ServerUrl + url : ServerUrl + "/" + url);
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
        accessKey && c.setRequestHeader(AccessKeyHeader, accessKey);
        c.setRequestHeader("Content-Type", "text/json");
        c.send(JSON.stringify(params));
        c.send();
    };
    this.createAccount = function(nickname, callback) {
        this.accessKey = "hoge";
        this.userId = 1;
        this.nickname = nickname;
        writeDb("nickname", this.nickname);
        writeDb("userId", this.userId);
        writeDb("accessKey", this.accessKey);
        callback(true);
    };
    this.logout = function() {
        Ti.API.debug("Logout");
        this.accessKey = null;
        this.userId = 0;
        this.nickname = null;
    };
    return this;
}

function PostManager() {
    this.myPosts = [];
    this.post = function(image, goodness) {
        Titanium.Geolocation.getCurrentPosition(function(e) {
            var lat = e.coords.latitude;
            var lon = e.coords.longitude;
            lat += .02 * Math.random() - .01;
            lon += .02 * Math.random() - .01;
            m.myPosts.push({
                image: image,
                goodness: goodness,
                lon: lon,
                lat: lat,
                category: "その他",
                title: "１分前 その他"
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