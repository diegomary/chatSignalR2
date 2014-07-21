// Angularr Modul that wraps SignalR2
angular.module('moduleApp129', [])
    .factory('Users', function ($http) {
        this.getUsers = function () { return $http.get('/Home/GetAllConnectedUserNamesWithConnectionId', { cache: false }); };
        return this;
    })
    .factory('Messaging', function () {
        this.chat = $.connection.chatHub;
        return this;
    })
    .factory('HtmlTools', function () {
        this.htmlEncode = function (value) {
            var encodedValue = $('<div />').text(value).html();
            return encodedValue;
        }
        return this
    })
        .controller('UserController', ['$scope', '$interval', 'Users', 'Messaging', 'HtmlTools', function ($scope, $interval, Users, Messaging, HtmlTools) {
        angular.element(document).ready(function () {         
                // Open A Jquery Dialog to confirm the UserName.
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
                        "Confirm User Name": function () {
                            // Create a function that the hub can call back to display messages.
                            Messaging.chat.client.addNewMessageToPage = function (name, message) {
                                // Add the message to the page.
                                $('#discussion').append('<li><strong>' + HtmlTools.htmlEncode(name)
                                    + '</strong>: ' + HtmlTools.htmlEncode(message) + '</li>');
                            };
                            // Start the connection.
                            $.connection.hub.start().done(function () {                              
                                $('#sendmessage').click(function () {
                                    // Call the Send method on the hub.
                                    Messaging.chat.server.sendmessage($('#displayname').val(), $('#message').val());
                                    // Clear text box and reset focus for next comment.
                                    $('#message').val('').focus();
                                });
                            });
                            $('#displayname').val($('#username').val());
                            $('#headerconn').text($('#username').val() + ":   connected!");
                            $(this).dialog('close');
                        },
                        "Cancel": function () { $(this).dialog('close'); }
                    }
                });
                // Set initial focus to message input box.
                $('#message').focus();
                $("#closeconn").click(function () {                 
                    $.connection.hub.stop();
                });
        });
	    $scope.users = [];
   	    $interval(function () { Users.getUsers().then(function (dataResponse) { $scope.users = dataResponse.data; }); }, 1000);
   	    $scope.sendPrivateMessage = function (ConnectionId) {   	   
   	    Messaging.chat.server.sendPrivateMessageToUser($('#displayname').val(), $('#message').val(), ConnectionId).
        then(function (response) { alert(response); });   	       
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
