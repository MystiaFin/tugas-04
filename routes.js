angular.module("TodoApp").config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");

    $routeProvider
      .when("/", {
        templateUrl: "pages/dashboard.html",
        controller: "DashboardController",
      })

      .when("/details/:id", {
        templateUrl: "pages/details.html",
        controller: "DetailsController",
      })

      .when("/new-list", {
        templateUrl: "pages/new-list.html",
        controller: "NewListController",
      })

      .otherwise({
        redirectTo: "/",
      });
  },
]);
