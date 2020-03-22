var app = angular.module('vimeoApp', ['ui.bootstrap']);

app.controller('vimeoAppCtrl', function ($scope, $http) {

    $scope.responseData = null;
    var vm = this;
    var value = "Pritam";
    $scope.startFrom = 0;
    $scope.showPagination = false;
    $scope.showLoader = true;
    vm.accountData;


    //Call the services
    // let url = "../assets/JSON/mock.json";
    let url = 'http://starlord.hackerearth.com/bankAccount';
    $http.get(url).then(function (response) {

        if (response.data) {
            $scope.showLoader = false;
            // console.log(response);
            vm.accountData = response.data;

            $scope.showPagination = true;
            console.log("Response Data", vm.accountData);
            vm.loadPagination(vm.accountData);
        }
        $scope.responseData = vm.accountData;
    });

    vm.loadPagination = function (data) {
        $scope.curPage = 1,
            $scope.itemsPerPage = 10,
            $scope.maxSize = 5;

        this.items = data;


        $scope.numOfPages = function () {
            return Math.ceil(data.length / $scope.itemsPerPage);

        };

        $scope.$watch('curPage + numPerPage', function () {
            var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
            $scope.filteredItems = data.slice(begin, end);
        });
    }

    $scope.searchTransaction = function (text) {
        console.log("TExxxxxxx", text);
        vm.searchedData = [];
        vm.accountData.forEach(element => {
            if (element["Transaction Details"].toUpperCase().indexOf(text.toUpperCase()) > -1) {
                vm.searchedData.push(element);
            }
        });
        vm.loadPagination(vm.searchedData);
    }
    $scope.sortItemAsn = function (items, dateFlag, vDateFlage) {
        if (dateFlag) {
            $scope.filteredItems = items.slice().sort((a, b) => {
                return   new Date(b.Date) - new Date(a.date)
            });
        } else if (vDateFlage) {
            $scope.filteredItems = items.slice().sort((a, b) => {
                return   new Date(b["Value Date"]) - new Date(a["Value Date"])
            });
        } else {
            $scope.filteredItems = items.sort((a, b) => 
              Number(b["Balance AMT"].replace(/,/g,'')) - Number(a["Balance AMT"].replace(/,/g,''))
            )
        }
        console.log("Sorted", $scope.filteredItems)

    }
    $scope.sortItemDes = function (items, dateFlag, vDateFlage) {
        if (dateFlag) {
            $scope.filteredItems = items.slice().sort((a, b) => {
                return  new Date(a.Date) - new Date(b.date)
            });
        } else if (vDateFlage) {
            $scope.filteredItems = items.slice().sort((a, b) => {
                return   new Date(a["Value Date"]) - new Date(b["Value Date"])
            });
        } else {
            $scope.filteredItems = items.sort((a, b) => 
              Number(a["Balance AMT"].replace(/,/g,'')) - Number(b["Balance AMT"].replace(/,/g,''))
            )
        }
        console.log("Sorted", $scope.filteredItems)
    }

});