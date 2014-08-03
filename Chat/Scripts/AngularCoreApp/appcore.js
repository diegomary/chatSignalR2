// Angularr Modul that wraps SignalR2
angular.module('moduleApp129', [])    
    .value('WelcomeMsg', 'Hello This is the chat System version 1.0')
    .factory('Users', function ($http) {
        return { //Revealing Module Pattern
                getUsers: function () { return $http.get('/Home/GetAllConnectedUserNamesWithConnectionId', { cache: false }); }
                // Other functions for the factory to follow
               }       
    })
    .service('Messaging', function () {
        this.chat = $.connection.chatHub;
    })
    .factory('HtmlTools', function () {
        this.htmlEncode = function (value) {
            var encodedValue = $('<div />').text(value).html();
            return encodedValue;
        }
        return this
    })
    .controller('UserController', ['WelcomeMsg', '$scope', '$interval', 'Users', 'Messaging', 'HtmlTools', function (WelcomeMsg, $scope, $interval, Users, Messaging, HtmlTools) {
        function confirmUserName() {
            // Create a function that the hub can call back to display messages.
            Messaging.chat.client.addNewMessageToPage = function (name, message) {
                // Add the message to the page.
                $('#discussion').append('<li><strong>' + HtmlTools.htmlEncode(name)
                    + '</strong>: ' + HtmlTools.htmlEncode(message) + '</li>');
                $('#talks').animate({ scrollTop: $('#talks').prop("scrollHeight") }, 500);

            };
            // Start the connection.
            var userName = $('#username').val()
            // prior to starting the connection we can add a querystring with the username using the    .qs method
            $.connection.hub.qs = { 'username': userName };
            $.connection.hub.start().done(function () { });
            $('#displayname').val($('#username').val());
            $('#headerconn').text($('#username').val() + ":   connected!");        
        }
        angular.element(document).ready(function () {
                 //alert(WelcomeMsg);
            // Open A Jquery Dialog to confirm the UserName.
            $('#message').keydown(function (e) {                      
                if (e.keyCode == $.ui.keyCode.ENTER) {                  
                    $scope.sendGlobalMessage();
                }
            });
                $("#dialog").dialog({
                    show: { effect: 'slide', complete: function () { $(this).find("#username").focus(); } },
                    open: function (event, ui) { },
                    close: function (event, ui) { $('#message').focus(); },                   
                    autoOpen: true,
                    height: 200,
                    width: 600,
                    dialogClass: 'noclose',
                    modal: true,
                    closeOnEscape: false,
                    buttons: {
                        "Confirm User Name": function () { $(this).dialog('close'); confirmUserName(); },
                        "Cancel": function () {
                            $(this).dialog('close');
                            location.href = '/home/chat';
                        }
                    }
                }).
                  keydown(function (e) {                      
                        if (e.keyCode == $.ui.keyCode.ENTER) {
                        $(this).dialog('close'); confirmUserName();
                        }
                    });

                // Set initial focus to message input box.
                $('#message').focus();
                $("#closeconn").click(function () {                 
                    $.connection.hub.stop();
                    location.href = '/home/chat';
                });
        });
	    $scope.users = [];
	    $interval(function () {
	        $('#connectedusers').css('background-color', 'red');	     
	        Users.getUsers().
                then(function (dataResponse) { $scope.users = dataResponse.data; }).
                then(function () {
                    $('#connectedusers').css('background-color', 'green');                
                    $("#firstli").text("Number of Connected users: " + $scope.users.length)
                });
	    }, 3000, 0, true);
   	    $scope.sendGlobalMessage = function () {
   	        // Call the Send method on the hub.
   	        Messaging.chat.server.sendmessage($('#displayname').val(), $('#message').val());
   	        // Clear text box and reset focus for next comment.
   	        $('#message').val('').focus();
   	    }
   	    $scope.sendPrivateMessage = function (ConnectionId,userName) {
   	        Messaging.chat.server.sendPrivateMessageToUser($.connection.hub.qs.username, $('#message').val(), ConnectionId).
        then(function (response) {
            //alert(response);
            $('#message').val('').focus();
        });
   	}
}])
    






























//angular.module('moduleApp129', ['ngAnimate'])
//    .factory('Customers', function ($http) {
//        var custs = {};
//        custs.getCustomers = function (callBackfunc) {
//            $http({
//                method: 'GET',
//                url: '/Home/GetData1',
//                params: 'limit=3, sort_by=city'
//            }).success(function (data) {
//                callBackfunc(data);
//            }).error(function () {
//                alert("error");
//            });

//        };
//        return custs;
//    })
//         .controller('CustomerController', ['$scope', 'Customers', function ($scope, Customers) {
//             $scope.customers = [];
//             $scope.getInnerData = function (name) { alert(name); }
//             $scope.getData = function () {
//                 Customers.getCustomers(function (dataResponse) {
//                     $scope.customers = dataResponse;
//                 });
//             }
//             $scope.nametosearch;
//             $scope.$watch('nametosearch', function (newValue, oldValue) {
//                 //The callback is on initialization and each time the model changes
//                 if (newValue === oldValue) { return; }
//                 // here the code that fires on property change
//             }, true);
//             $scope.addCustomer = function () {
//                 $scope.customers.push({ name: $scope.inputData.name, city: $scope.inputData.city });
//             };
//         }])
//         .controller('OrderController', ['$scope', function ($scope) {
//             $scope.codeName = "Diego Burlando";
//         }])
//         .controller('DetailsController', ['$scope', function ($scope) {
//             $scope.detailName = "MAria Burlando";
//         }]);
