/**
 * @author Parham
 * @since 5/02/2016
 */

angular.module('svBeaconPrototype')

  .controller('RegisterCtrl', function ($scope, $rootScope, $log, $stateParams, MyDetails, Validations) {
    $log.info('RegisterCtrl...');

    $scope.patterns = Validations.patterns;
    $scope.msgEmailPattern = Validations.msgEmail('email');
    $scope.msgEmailRequired = Validations.msgRequired('email');
    $scope.msgNameRequired = Validations.msgRequired('name');
    $scope.msgPhoneRequired = Validations.msgRequired('phone');
    $scope.msgPhonePhone = Validations.msgPhone('phone');
    $scope.showError = false;

    MyDetails.find().then(function (found) {
      $scope.myDetails = found;
    });

    $scope.save = function (myDetails, form) {
      $scope.showError = !form.$valid;

      if ($scope.showError) {
        return;
      }
      MyDetails.save(myDetails).then(function (saved) {
        $rootScope.go('app.home');
        $scope.modal.hide();
      }, function (err) {
        $scope.showError = true;
      })
    };

  });

