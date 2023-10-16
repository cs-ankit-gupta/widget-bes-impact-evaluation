/* Copyright start
  Copyright (C) 2008 - 2023 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
  'use strict';
  (function () {
      angular
          .module('cybersponse')
          .controller('editBesImpactEvaluation100Ctrl', editBesImpactEvaluation100Ctrl);
  
      editBesImpactEvaluation100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config'];
  
      function editBesImpactEvaluation100Ctrl($scope, $uibModalInstance, config) {
          $scope.cancel = cancel;
          $scope.save = save;
          $scope.config = config;
  
          function cancel() {
              $uibModalInstance.dismiss('cancel');
          }
  
          function save() {
              $uibModalInstance.close($scope.config);
          }
  
      }
  })();