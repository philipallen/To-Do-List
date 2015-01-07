var jetbrains = angular.module("jetbrains", []);

jetbrains.controller("AppCtrl", function ($http) {
    var app = this;
    var url = "http://localhost:3000";

    app.saveItem = function (newItem) {
        if (app.newItem) {
            $http.post(url + '/add', {name: newItem}).success(function () {
                loadItems();
            });
            app.newItem = "";
        }
    };

    app.deleteItem = function (selectedItem) {
        $http.post(url + '/delete', {name: selectedItem}).success(function () {
            loadItems();
        })
    };

    function loadItems () {
        $http.get(url).success(function (items) {
            app.items = items;
        })
    }
    loadItems();

    app.selection = [];
    app.toggleSelection = function toggleSelection(item) {
        var idx = app.selection.indexOf(item._id);
        if (idx > -1) {
            app.selection.splice(idx, 1);
        } else {
            app.selection.push(item._id);
        }
    };

    app.addNewItem = function(keyEvent) {
        if (keyEvent.which === 13)
            app.saveItem(app.newItem);
    }

});