angular.module('moduleApp129', [])
    .factory('Users', function ($http) {
        this.getUsers = function () { return $http.get('/Home/GetAllConnectedUserNamesWithConnectionId', { cache: false }); };
        return this;
    })
    .controller('UserController', ['$scope', 'Users', function ($scope, Users) {      
	$scope.users = [];

   	setInterval( function()
    {		
   	    Users.getUsers().then(function (dataResponse) { $scope.users = dataResponse.data });   	   
	
   	}, 1000);

   	$scope.sendPrivateMessage = function (ConnectionId) {
   	    var chat = $.connection.chatHub;
   	    chat.server.sendPrivateMessageToUser($('#displayname').val(), $('#message').val(), ConnectionId);
   	    alert(ConnectionId);        
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
