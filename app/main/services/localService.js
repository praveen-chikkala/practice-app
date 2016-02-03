var app = angular.module('main');
app.service('localService', ['$localStorage', function($locastorage) {
    this.loggedUserData = {};
    this.getRegisteredUsers = function() {
        return $localStorage.registeredUsers;
    };
    this.setRegisteredUsers = function(uname, pwd) {
        var user = {
            userName: uname,
            password: pwd
        };
        var usersList = [];
        _.each($localStorage.registeredUsers, function(userNew) {
            usersList.push(userNew);
        });
        usersList.push(user);
        $localStorage.registeredUsers = usersList;
    };
    this.getLoggedUserData = function() {
        return this.loggedUserData;
    };
    this.setLoggedUserData = function(uname, pwd) {
        var users = [];
        if (typeof($localStorage.registeredUsers === "object")) {
            users = $localStorage.registeredUsers;
        } else {
            users.push($localStorage.registeredUsers);
        }
        var that = this;
        _.each(users, function(user) {
            if (user.userName === uname && user.password === pwd) {
                that.loggedUserData = user;
                // $rootScope.fName = user.firstName;
                // $rootScope.lName = user.lastName;
            }
        });
    };
    this.isValidUser = function(uname, pwd) {
        var users = [];
        if (typeof($localStorage.registeredUsers === "object")) {
            users = $localStorage.registeredUsers;
        } else {
            users.push($localStorage.registeredUsers);
        }
        var valid = false;
        _.each(users, function(user) {
            if (user.userName === uname && user.password === pwd) {
                valid = true;
            }
        });
        return valid;
    };
}]);
