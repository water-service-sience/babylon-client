function Controller() {
    function onSwiped(e) {
        if ("left" == e.direction || "up" == e.direction) {
            $.posts.visible = false;
            selectedDate && (selectedDate.parentTable.top = 0);
            goNextMonth();
        } else if ("right" == e.direction || "down" == e.direction) {
            $.posts.visible = false;
            selectedDate && (selectedDate.parentTable.top = 0);
            goPrevMonth();
        }
    }
    function goNextMonth() {
        var oldCalendar = currentCalendarView;
        var y = currentYear;
        var m = currentMonth + 1;
        if (m > 12) {
            m = 1;
            y += 1;
        }
        loadPosts(y, m, function() {
            createCalendar(y, m, function(calendar) {
                $.calendar.remove(oldCalendar);
                $.calendar.add(calendar);
            });
        });
    }
    function goPrevMonth() {
        var oldCalendar = currentCalendarView;
        var y = currentYear;
        var m = currentMonth - 1;
        if (1 > m) {
            m = 12;
            y -= 1;
        }
        loadPosts(y, m, function() {
            createCalendar(y, m, function(calendar) {
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
            e.source.parentTable.top = Math.min(0, 50 - (selectedDate.yIndex * cellHeight + headerHeight));
            $.posts.top = 2.5 * cellHeight;
            $.posts.visible = true;
            $.posts.bottom = 0;
            updatePostTableView(cell.posts);
        }
    }
    function updatePostTableView(posts) {
        var rows = [];
        for (var i in posts) {
            var p = posts[i];
            var row = Ti.UI.createTableViewRow({
                height: 100,
                post: p
            });
            Ti.API.debug("Image = " + api.toImageUrl(p));
            var photo = Ti.UI.createImageView({
                image: api.toImageUrl(p),
                left: 0,
                top: 0,
                bottom: 0,
                width: 100
            });
            var time = Ti.UI.createLabel({
                text: util.dateToString(p.posted),
                textAlign: "left",
                left: 100,
                top: 0
            });
            var category = Ti.UI.createLabel({
                text: "Category:" + p.category.label,
                textAlign: "left",
                left: 100,
                top: 30
            });
            row.add(photo);
            row.add(time);
            row.add(category);
            rows.push(row);
            $.postTable.setData(rows);
        }
    }
    function createCell(parent, x, y, date) {
        var key = currentYear + "/" + date;
        var posts = postMap[key];
        null == posts && (posts = []);
        var thisView = Ti.UI.createView({
            objName: "grid-view",
            objIndex: cellIndex.toString(),
            backgroundColor: cellColor,
            left: ySpacer,
            height: cellHeight,
            width: cellWidth,
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
        var bodyLabel = Ti.UI.createLabel({
            color: "black",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            text: posts.length + "件",
            textAlign: "center",
            touchEnabled: false,
            top: cellHeight / 3
        });
        thisView.add(dateLabel);
        thisView.add(bodyLabel);
        thisView.addEventListener("click", onCellClicked);
        return thisView;
    }
    function onPostSelected(e) {
        var row = e.row;
        var post = row.post;
        Alloy.Globals.post = post;
        var controller = Alloy.createController("post_detail");
        var view = controller.getView();
        view.setPost(post);
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
            top: 1,
            left: ySpacer,
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
            top: 1,
            right: ySpacer + cellWidth,
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
            top: 1,
            right: ySpacer,
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
                left: ySpacer,
                height: weekdayLabelHeight,
                width: cellWidth,
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
                top: y * (cellHeight + ySpacer) + headerHeight
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
    $.__views.my_post_calendar = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "my_post_calendar"
    });
    $.__views.my_post_calendar && $.addTopLevelView($.__views.my_post_calendar);
    $.__views.calendar = Ti.UI.createView({
        backgroundColor: "#cceeff",
        id: "calendar"
    });
    $.__views.my_post_calendar.add($.__views.calendar);
    $.__views.posts = Ti.UI.createView({
        backgroundColor: "white",
        visible: false,
        id: "posts"
    });
    $.__views.my_post_calendar.add($.__views.posts);
    $.__views.postTable = Ti.UI.createTableView({
        id: "postTable"
    });
    $.__views.posts.add($.__views.postTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var pWidth = Ti.Platform.displayCaps.platformWidth;
    Ti.Platform.displayCaps.platformHeight;
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;