var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Map = require("ti.map");

var api = require("api");

var util = require("util");

var NavigationController = require("NavigationController");

var navController = new NavigationController();

Alloy.Globals.naviCon = navController;

Alloy.Globals.api = api;

Alloy.Globals.util = util;

Alloy.createController("index");