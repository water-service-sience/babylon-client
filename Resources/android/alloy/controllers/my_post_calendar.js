function Controller() {
    function onSwiped(e) {
        $.posts.visible = false;
        selectedDate && (selectedDate.parentTable.top = 0);
        "left" == e.direction ? goNextMonth() : "right" == e.direction ? goPrevMonth() : "up" == e.direction ? goPrevYear() : "down" == e.direction && goNextYear();
    }
    function goNextMonth() {
        var y = currentYear;
        var m = currentMonth + 1;
        if (m > 12) {
            m = 1;
            y += 1;
        }
        goToMonth(y, m);
    }
    function goPrevMonth() {
        var y = currentYear;
        var m = currentMonth - 1;
        if (1 > m) {
            m = 12;
            y -= 1;
        }
        goToMonth(y, m);
    }
    function goNextYear() {
        var y = currentYear + 1;
        var m = currentMonth;
        goToMonth(y, m);
    }
    function goPrevYear() {
        var y = currentYear - 1;
        var m = currentMonth;
        goToMonth(y, m);
    }
    function goToMonth(year, month) {
        var oldCalendar = currentCalendarView;
        loadPosts(year, month, function() {
            createCalendar(year, month, function(calendar) {
                $.calendar.remove(oldCalendar);
                $.calendar.add(calendar);
            });
        });
    }
    function onCellClicked(e) {
        var cell = e.source;
        cell.parentTable;
        if ("--" == e.source.date) return;
        if (selectedDate == e.source) {
            e.source.backgroundColor = cellColor;
            e.source.parentTable.top = 0;
            selectedDate = null;
            $.posts.visible = false;
        } else {
            selectedDate && (selectedDate.backgroundColor = cellColor);
            e.source.backgroundColor = selectedCellColor;
            selectedDate = e.source;
            e.source.parentTable.top = Math.min(0, 50 - (selectedDate.yIndex * cellHeight + headerHeight)) + "px";
            $.posts.top = 2.5 * cellHeight;
            $.posts.visible = true;
            $.posts.bottom = 0;
            updatePostTableView(cell.posts);
        }
    }
    function updatePostTableView(posts) {
        var dataSet = [];
        for (var i in posts) {
            var p = posts[i];
            dataSet.push({
                properties: {
                    height: "105dp"
                },
                post: p,
                thumbnail: {
                    image: api.toImageUrl(p)
                },
                date: {
                    text: util.dateToString(p.posted)
                },
                category: {
                    text: p.category.label
                }
            });
        }
        $.postTable.sections[0].setItems(dataSet);
    }
    function createCell(parent, x, y, date, label) {
        var key = currentYear + "/" + date;
        var posts = postMap[key];
        null == posts && (posts = []);
        var thisView = Ti.UI.createView({
            objName: "grid-view",
            objIndex: cellIndex.toString(),
            backgroundColor: cellColor,
            left: ySpacer + "px",
            height: cellHeight + "px",
            width: cellWidth + "px",
            parentTable: parent,
            xIndex: x,
            yIndex: y,
            date: date,
            posts: posts
        });
        var dateLabel = Ti.UI.createLabel({
            color: "black",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            textAlign: "center",
            text: date,
            touchEnabled: false,
            top: 0
        });
        var label = "";
        posts.length > 0 && (label = posts.length + "件");
        var bodyLabel = Ti.UI.createLabel({
            color: "black",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            text: label,
            textAlign: "center",
            touchEnabled: false,
            top: cellHeight / 3 + "px"
        });
        thisView.add(dateLabel);
        thisView.add(bodyLabel);
        thisView.addEventListener("click", onCellClicked);
        return thisView;
    }
    function onPostSelected(e) {
        var item = e.section.getItemAt(e.itemIndex);
        var post = item.post;
        Alloy.Globals.post = post;
        var controller = Alloy.createController("post_detail");
        var view = controller.getView();
        Alloy.Globals.naviCon.open(view);
    }
    function createDateList(year, month) {
        var thisMonth = new Date(year, month - 1, 1);
        var dateLabels = [];
        var weekday = thisMonth.getDay();
        for (var i = 0; weekday > i; i++) dateLabels.push("--");
        var days = new Date(year, month, 0).getDate();
        for (var i = 1; days >= i; i++) dateLabels.push(month + "/" + i);
        var left = 6 - (dateLabels.length - 1);
        for (var i = 1; left >= i; i++) dateLabels.push("--");
        return dateLabels;
    }
    function createMonthHeader(year, month) {
        var prev = month - 1;
        0 >= prev && (prev += 12);
        var next = month + 1;
        next > 12 && (next -= 12);
        var monthHeader = Ti.UI.createView({
            layout: "absolute",
            top: 0
        });
        monthHeader.add(Ti.UI.createLabel({
            backgroundColor: "green",
            top: "1px",
            left: ySpacer + "px",
            color: "black",
            textAlign: "left",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            text: prev + "月"
        }));
        monthHeader.add(Ti.UI.createLabel({
            left: ySpacer + cellWidth,
            top: "1px",
            right: ySpacer + cellWidth + "px",
            color: "black",
            textAlign: "center",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            text: year + "年" + month + "月"
        }));
        monthHeader.add(Ti.UI.createLabel({
            backgroundColor: "green",
            top: "1px",
            right: ySpacer + "px",
            color: "black",
            textAlign: "right",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            text: next + "月"
        }));
        return monthHeader;
    }
    function createCalendar(year, month, callback) {
        currentYear = year;
        currentMonth = month;
        Ti.API.debug("Create calendar " + year + "/" + month);
        var thisTable = Ti.UI.createView({
            layout: "absolute"
        });
        var dateLabels = createDateList(year, month);
        var monthHeader = createMonthHeader(year, month);
        thisTable.add(monthHeader);
        var weekdayHeader = Ti.UI.createView({
            layout: "horizontal",
            top: monthHeaderHeight
        });
        for (var x = 0; xGrid > x; x++) {
            var thisView = Ti.UI.createLabel({
                objName: "grid-view",
                backgroundColor: colorSet[x],
                left: ySpacer + "px",
                height: weekdayLabelHeight + "px",
                width: cellWidth + "px",
                color: "black",
                textAlign: "center",
                font: {
                    fontSize: 12,
                    fontWeight: "bold"
                },
                text: weekdayLabels[x]
            });
            weekdayHeader.add(thisView);
        }
        thisTable.add(weekdayHeader);
        yGrid = dateLabels.length / 7;
        for (var y = 0; yGrid > y; y++) {
            var thisRow = Ti.UI.createView({
                layout: "horizontal",
                top: y * (cellHeight + ySpacer) + headerHeight + "px"
            });
            thisTable.add(thisRow);
            for (var x = 0; xGrid > x; x++) {
                thisRow.add(createCell(thisTable, x, y, dateLabels[7 * y + x], "hoge"));
                cellIndex++;
                colorSetIndex++;
                colorSetIndex === colorSet.length && (colorSetIndex = 0);
            }
        }
        thisTable.addEventListener("swipe", onSwiped);
        currentCalendarView = thisTable;
        callback(thisTable);
    }
    function loadPosts(year, month, callback) {
        api.postManager.getMyPosts(year, month, function(posts) {
            postMap = {};
            for (var i in posts) {
                var p = posts[i];
                var date = new Date(p.posted);
                var key = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                Ti.API.debug("Post:" + i + " key = " + key);
                postMap[key] || (postMap[key] = []);
                postMap[key].push(p);
            }
            callback(postMap);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "my_post_calendar";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.my_post_calendar = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        id: "my_post_calendar"
    });
    $.__views.my_post_calendar && $.addTopLevelView($.__views.my_post_calendar);
    $.__views.calendar = Ti.UI.createView({
        backgroundColor: "#cceeff",
        top: 0,
        height: "100%",
        id: "calendar"
    });
    $.__views.my_post_calendar.add($.__views.calendar);
    $.__views.explanation = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        left: "5dp",
        color: "#000",
        bottom: 0,
        text: "スワイプ左右で月、上下で年を変更できます",
        id: "explanation"
    });
    $.__views.calendar.add($.__views.explanation);
    $.__views.posts = Ti.UI.createView({
        backgroundColor: "white",
        visible: false,
        top: "40%",
        height: "80%",
        id: "posts"
    });
    $.__views.my_post_calendar.add($.__views.posts);
    var __alloyId32 = {};
    var __alloyId35 = [];
    var __alloyId37 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId38 = [];
            var __alloyId40 = {
                type: "Ti.UI.ImageView",
                bindId: "thumbnail",
                properties: {
                    width: "100dp",
                    height: "100dp",
                    bindId: "thumbnail"
                }
            };
            __alloyId38.push(__alloyId40);
            var __alloyId42 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId43 = [];
                    var __alloyId45 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            left: "5dp",
                            color: "#000",
                            bindId: "date"
                        }
                    };
                    __alloyId43.push(__alloyId45);
                    var __alloyId47 = {
                        type: "Ti.UI.Label",
                        bindId: "category",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            left: "5dp",
                            color: "#000",
                            bindId: "category"
                        }
                    };
                    __alloyId43.push(__alloyId47);
                    return __alloyId43;
                }(),
                properties: {
                    width: "auto",
                    layout: "vertical"
                }
            };
            __alloyId38.push(__alloyId42);
            return __alloyId38;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId35.push(__alloyId37);
    var __alloyId34 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId35
    };
    __alloyId32["template"] = __alloyId34;
    $.__views.__alloyId48 = Ti.UI.createListSection({
        headerTitle: "投稿一覧",
        id: "__alloyId48"
    });
    var __alloyId50 = [];
    __alloyId50.push($.__views.__alloyId48);
    $.__views.postTable = Ti.UI.createListView({
        top: 0,
        bottom: 0,
        sections: __alloyId50,
        templates: __alloyId32,
        id: "postTable",
        defaultItemTemplate: "template"
    });
    $.__views.posts.add($.__views.postTable);
    onPostSelected ? $.__views.postTable.addEventListener("itemclick", onPostSelected) : __defers["$.__views.postTable!itemclick!onPostSelected"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var pWidth = Ti.Platform.displayCaps.platformWidth;
    Ti.Platform.displayCaps.platformHeight;
    Ti.API.info("Ti.Platform.displayCaps.density: " + Ti.Platform.displayCaps.density);
    Ti.API.info("Ti.Platform.displayCaps.dpi: " + Ti.Platform.displayCaps.dpi);
    Ti.API.info("Ti.Platform.displayCaps.platformHeight: " + Ti.Platform.displayCaps.platformHeight);
    Ti.API.info("Ti.Platform.displayCaps.platformWidth: " + Ti.Platform.displayCaps.platformWidth);
    Ti.API.info("Ti.Platform.displayCaps.xdpi: " + Ti.Platform.displayCaps.xdpi);
    Ti.API.info("Ti.Platform.displayCaps.ydpi: " + Ti.Platform.displayCaps.ydpi);
    Ti.API.info("Ti.Platform.displayCaps.logicalDensityFactor: " + Ti.Platform.displayCaps.logicalDensityFactor);
    var api = Alloy.Globals.api;
    var util = Alloy.Globals.util;
    var monthHeaderHeight = 25;
    var weekdayLabelHeight = 20;
    var headerHeight = monthHeaderHeight + weekdayLabelHeight + 2;
    var xSpacer = 5;
    var ySpacer = 5;
    var cellWidth = (pWidth - 8 * xSpacer) / 7;
    var cellHeight = 1.2 * cellWidth;
    var xGrid = 7;
    var yGrid = 4;
    var cellColor = "#fffae5";
    var selectedCellColor = "#ffccd8";
    var colorSet = [ "#D44646", "#46D463", "#46D4BE", "#C2D446", "#D446D5", "#4575D5", "#E39127" ];
    var weekdayLabels = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat" ];
    var colorSetIndex = 0;
    var cellIndex = 0;
    var selectedDate = null;
    var currentCalendarView = null;
    var currentYear = 2013;
    var currentMonth = 1;
    var postMap = {};
    $.my_post_calendar.addEventListener("open", function() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        $.postTable.addEventListener("click", onPostSelected);
        loadPosts(year, month, function() {
            createCalendar(year, month, function(calendarView) {
                $.calendar.add(calendarView);
            });
        });
    });
    __defers["$.__views.postTable!itemclick!onPostSelected"] && $.__views.postTable.addEventListener("itemclick", onPostSelected);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;