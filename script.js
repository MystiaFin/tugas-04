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
      deleteTodo: function (id) {
        var index = todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          todos.splice(index, 1);
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

      $scope.deleteTodo = function (id) {
        TodoService.deleteTodo(id);
        $scope.todos = TodoService.getTodos();
      };
    },
  ])
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
  ])
  .controller("SidebarController", [
    "$scope",
    "TodoService",
    function ($scope, TodoService) {
      $scope.categories = [
        { name: "important", visible: true },
        { name: "jobs", visible: true },
        { name: "other", visible: true },
      ];

      $scope.todos = TodoService.getTodos();

      $scope.toggleSidebar = function () {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("open");
      };

      $scope.toggleCategory = function (category) {
        category.visible = !category.visible;
      };
    },
  ]);
