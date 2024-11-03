angular
  .module("TodoApp", ["ngRoute"])
  .service("TodoService", function () {
    var todos = [];
    return {
      getTodos: function () {
        return todos;
      },
      addTodo: function (todo) {
        todo.id = todos.length + 1;
        todos.push(todo);
      },
      getTodoById: function (id) {
        return todos.find((todo) => todo.id === parseInt(id));
      },
      updateTodo: function (updatedTodo) {
        var index = todos.findIndex((todo) => todo.id === updatedTodo.id);
        if (index !== -1) {
          todos[index] = updatedTodo;
        }
      },
      searchTodos: function (searchText) {
        if (!searchText) return todos;
        searchText = searchText.toLowerCase();
        return todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchText)
        );
      },
    };
  })
  .controller("DashboardController", [
    "$scope",
    "TodoService",
    function ($scope, TodoService) {
      $scope.todos = TodoService.getTodos();
      $scope.searchText = "";
      $scope.filterTodos = function () {
        $scope.todos = TodoService.searchTodos($scope.searchText);
      };

      $scope.$watch("searchText", function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.filterTodos();
        }
      });

      $scope.$watch(
        function () {
          return TodoService.getTodos();
        },
        function (newVal) {
          if (!$scope.searchText) {
            $scope.todos = newVal;
          } else {
            $scope.filterTodos();
          }
        },
        true
      );
    },
  ])
  .service("TodoService", function () {
    var todos = [];
    return {
      getTodos: function () {
        return todos;
      },
      addTodo: function (todo) {
        todo.id = todos.length + 1;
        todos.push(todo);
      },
      getTodoById: function (id) {
        return todos.find((todo) => todo.id === parseInt(id));
      },
      updateTodo: function (updatedTodo) {
        var index = todos.findIndex((todo) => todo.id === updatedTodo.id);
        if (index !== -1) {
          todos[index] = updatedTodo;
        }
      },
      searchTodos: function (searchText) {
        if (!searchText) return todos;
        searchText = searchText.toLowerCase();
        return todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchText)
        );
      },
    };
  })
  .controller("NewListController", [
    "$scope",
    "TodoService",
    "$location",
    function ($scope, TodoService, $location) {
      $scope.todo = {
        title: "",
        description: "",
        category: "important",
      };
      $scope.addTodo = function () {
        TodoService.addTodo($scope.todo);
        $location.path("/");
      };
    },
  ])
  .controller("DetailsController", [
    "$scope",
    "$routeParams",
    "TodoService",
    "$location",
    function ($scope, $routeParams, TodoService, $location) {
      $scope.todo = TodoService.getTodoById($routeParams.id);
      $scope.isEditing = false;

      $scope.saveTodo = function () {
        TodoService.updateTodo($scope.todo);
        $location.path("/");
      };
    },
  ]);
