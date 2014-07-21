/**
 *
 *  Example Application
 *
 */
(function () {

  'use strict';

  angular.module('AppExample', [])

  .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.main = {};
    $scope.users = [];
    
    $scope.loadUsers = function() {
      $http.get('/api/users').success(function(data) {
        $scope.users = data.users;
      });
    };
    
    $scope.selectUser = function(user) {
      $scope.selectedUser = user;
      $scope.userCopy = angular.copy(user);
    };
  }]);

})();


 
/**
 *
 *  Specs
 *
 */
describe('AppExample |', function () {
  var $scope, ctrl;

  beforeEach(module('AppExample'));

  describe('MainCtrl |', function () {
    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {
        $scope: $scope
      });
    }));

    it('should have a main variable', function() {
      expect($scope.main).toBeDefined();
    });
    
    it('should make a get request', function() {
      $scope.loadUsers();
      
      $httpBackend.expectGET('/api/users').respond({
        users: [] 
      });
      $httpBackend.flush();
      expect($scope.users).toBeDefined();
    });
    
    it('should select a user', function() {
      // Setup
      var user = {
        id: 1
      };
      
      // Execute
      $scope.selectUser(user);
      
      // Test
      expect($scope.selectedUser.id).toEqual(1);
      expect($scope.userCopy.id).toEqual(1);
    });
  });
});



/**
 *
 *  IGNORE - Test Runner
 *
 */
(function () {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function (spec) {
    return htmlReporter.specFilter(spec);
  };

  var currentWindowOnload = window.onload;

  window.onload = function () {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    execJasmine();
  };

  function execJasmine() {
    jasmineEnv.execute();
  }

})();
