var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var api = require("api");

var NavigationController = require("NavigationController");

var navController = new NavigationController();

Alloy.Globals.naviCon = navController;

Alloy.Globals.api = api;

Alloy.createController("index");