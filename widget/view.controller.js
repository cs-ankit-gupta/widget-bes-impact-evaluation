/* Copyright start
  Copyright (C) 2008 - 2023 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
(function () {
  angular
    .module('cybersponse')
    .controller('besImpactEvaluation100Ctrl', besImpactEvaluation100Ctrl);

  besImpactEvaluation100Ctrl.$inject = ['$scope', '$window', '$timeout', 'CommonUtils', 'config', '_', 'toaster', '$http', '$sce', '$state', 'WizardHandler', 'API', 'Entity', '$resource', 'PagedCollection', '$q', 'widgetService'];

  function besImpactEvaluation100Ctrl($scope, $window, $timeout, CommonUtils, config, _, toaster, $http, $sce, $state, WizardHandler, API, Entity, $resource, PagedCollection, $q, widgetService) {
    $scope.id = $state.params.id;
    $scope.note = { 'data': "" }
    $scope.impactTab = {
      open: true
    };
    $scope.entityTab = {
      open: true
    };
    $scope.digitalTab = {
      open: true
    };
    $scope.criteriaTab = {
      open: true
    };
    $scope.routableTab = {
      open: true
    };
    $scope.selectAll = {
      isSelected: false
    };
    $scope.module = $state.params.module;
    $scope.moveNext = moveNext;
    $scope.movePrevious = movePrevious;
    $scope.saveAndCloseWidget = saveAndCloseWidget;
    $scope.isEntityAndDCSSelected = isEntityAndDCSSelected;
    $scope.convertHexToRgbA = CommonUtils.convertHexToRgbA;
    $scope.checkDistributionProviderValue = checkDistributionProviderValue
    $scope.checkGenerationResourceValue = checkGenerationResourceValue
    $scope.displaySubCriteria = displaySubCriteria
    $scope.selectAllOperations = selectAllOperations
    $scope.entityNextPage = 'Assess Criteria'
    $scope.entitySubCriteria = {
      "Distribution Provider (DP)": [
        "UVLS / UFLS",
        "NERC / SPS / RAS",
        "Cranking Path",
        "None"
      ]
    }
    $scope.selectedDPValue = { data: "" }
    $scope.digitalControlSystemsSubCriteria = {
      "Generation Resource": [
        { "itemValue": "Nuclear", "isSelected": false },
        { "itemValue": "Gas", "isSelected": false },
        { "itemValue": "Coal", "isSelected": false },
        { "itemValue": "Hydro", "isSelected": false },
        { "itemValue": "Biomass", "isSelected": false },
        { "itemValue": "Battery", "isSelected": false },
        { "itemValue": "Petcoke", "isSelected": false },
        { "itemValue": "Wind", "isSelected": false },
        { "itemValue": "Solar", "isSelected": false },
        { "itemValue": "Hydro", "isSelected": false },
        { "itemValue": "Biomass", "isSelected": false },
        { "itemValue": "Battery", "isSelected": false }
      ]
    }
    $scope.WizardHandler = WizardHandler;
    $scope.entityType = []
    $scope.criteriaOptions = ["High", "Medium", "Low"];
    $scope.criteriaOutput = "Low";
    $scope.externalRoutableConnectivity = false;
    $scope.impactRatingCriteria = {
      "commonData": {
        "Generation Resource": [
          {
            "name": "The system is associated with generation at a single plant location, with an aggregate highest rated net Real Power capability equal to or exceeding 1500 MW in a single Interconnection.",
            "criteriaNumber": "2.1",
            "isSelected": false
          },
          {
            "name": "The system is associated with a Generation Facility informed by its PC or TP as necessary to avoid an Adverse Reliability Impact in the planning horizon of more than one year.",
            "criteriaNumber": "2.3",
            "isSelected": false
          },
          {
            "name": "The system is associated with a Generation or Transmission Facility that has been identified by its RC, PC, or TP as critical to the derivation of Interconnection Reliability Operating Limits (IROLs) and their associated contingencies.",
            "criteriaNumber": "2.6",
            "isSelected": false
          }
        ],
        "Cranking Path": [],
        "UVLS / UFLS": [
          {
            "name": "The system is associated with a group of Elements that performs automatic (not initiated by a human operator) undervoltage or underfrequency Load shedding of 300 MW or more, under a load shedding program that is subject to one or more requirements in a NERC or regional reliability standard.",
            "criteriaNumber": "2.10",
            "isSelected": false
          }
        ],
        "Transmission Station / Substation": [
          {
            "name": "The system is associated with Transmission Facilities operated at 500 kV or higher, not including the collector bus for a Generation Resource.",
            "criteriaNumber": "2.4",
            "isSelected": false
          },
          {
            "name": "The system is associated with Transmission Facilities operating between 200 kV and 499 kV, where a single station or substation has at least 5 lines connected between 200 kV to 299 kV, or at least 3 lines connected between 300 kV to 399 kV, not including the collector bus for a Generation Resource.",
            "criteriaNumber": "2.5",
            "isSelected": false
          },
          {
            "name": "The system is associated with a Generation or Transmission Facility that has been identified by its RC, PC, or TP as critical to the derivation of Interconnection Reliability Operating Limits (IROLs) and their associated contingencies.",
            "criteriaNumber": "2.6",
            "isSelected": false
          },
          {
            "name": "The system is associated with Transmission Facilities identified as essential to meeting Nuclear Plant Interface Requirements.",
            "criteriaNumber": "2.7",
            "isSelected": false
          },
          {
            "name": "The system is associated with Transmission Facilities, including generation interconnection Facilities, providing the generation interconnection for a Generation Resource with an aggregate highest rated net Real Power capability equal to or exceeding 1500 MW in a single Interconnection.",
            "criteriaNumber": "2.11",
            "isSelected": false
          },
          {
            "name": "The system is associated with Transmission Facilities, including generation interconnection Facilities, providing the generation interconnection for a Generation Resource informed by its PC or TP as necessary to avoid an Adverse Reliability Impact in the planning horizon of more than one year.",
            "criteriaNumber": "2.3",
            "isSelected": false
          }
        ],
        "Blackstart Resource": [
          {
            "name": "The system is associated with generation at a single plant location, with an aggregate highest rated net Real Power capability equal to or exceeding 1500 MW in a single Interconnection.",
            "criteriaNumber": "2.1",
            "isSelected": false
          },
          {
            "name": "The system is associated with a Generation Facility informed by its PC or TP as necessary to avoid an Adverse Reliability Impact in the planning horizon of more than one year.",
            "criteriaNumber": "2.3",
            "isSelected": false
          },
          {
            "name": "The system is associated with a Generation or Transmission Facility that has been identified by its RC, PC, or TP as critical to the derivation of Interconnection Reliability Operating Limits (IROLs) and their associated contingencies.",
            "criteriaNumber": "2.6",
            "isSelected": false
          }
        ],
        "SPS / RAS": [
          {
            "name": "The system is associated with a Special Protection System (SPS), Remedial Action Scheme (RAS), or automated switching System that could cause one or more Interconnection Reliability Operating Limits (IROLs) violations for failure to operate as designed, or cause a reduction in one or more IROLs.",
            "criteriaNumber": "2.9",
            "isSelected": false
          }
        ],
        "Reactive Resource": [
          {
            "name": "The system is associated with reactive resources with an aggregate maximum Reactive Power nameplate rating of 1000 MVAR or greater at a single location, but not located at a Generation Facility.",
            "criteriaNumber": "2.2",
            "isSelected": false
          }
        ]
      },
      "Control Center / Backup Control Center": {
        "Balancing Authority (BA)": [
          {
            "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Balancing Authority for generation equal to or greater than an aggregate of 3000 MW in a single Interconnection.",
            "criteriaNumber": "1.2",
            "isSelected": false
          },
          {
            "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Balancing Authority with one or more controlled assets that is a Generation Facility informed by its PC or TP as necessary to avoid an Adverse Reliability Impact in the planning horizon of more than one year.",
            "criteriaNumber": "2.3",
            "isSelected": false
          },
          {
            "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Balancing Authority with one or more controlled assets that is a Generation or Transmission Facility that has been identified by its RC, PC, or TP as critical to the derivation of Interconnection Reliability Operating Limits (IROLs) and their associated contingencies.",
            "criteriaNumber": "2.6",
            "isSelected": false
          },
          {
            "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Balancing Authority with one or more controlled assets that contain a Special Protection System (SPS), Remedial Action Scheme (RAS), or automated switching System that could cause one or more Interconnection Reliability Operating Limits (IROLs) violations for failure to operate as designed, or cause a reduction in one or more IROLs.",
            "criteriaNumber": "2.9",
            "isSelected": false
          },
          {
            "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Balancing Authority for generation equal to or greater than an aggregate of 1500 MW in a single Interconnection.",
            "criteriaNumber": "2.13",
            "isSelected": false
          }
        ],
        "Generator Operator (GOP)": [
          {
            "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Generator Operator for an aggregate highest rated net Real Power capability equal to or exceeding 1500 MW in a single Interconnection, where no single Generation Resource is rated at 1500 MW or higher.",
            "criteriaNumber": "2.11",
            "isSelected": false
          },
          {
            "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Generator Operator.",
            "criteriaNumber": "1.4",
            "isSelected": false,
            "yes": [
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Generator Operator for one or more controlled assets that contain generation at a single plant location, with an aggregate highest rated net Real Power capability equal to or exceeding 1500 MW in a single Interconnection.",
                "criteriaNumber": "2.1",
                "isSelected": false
              },
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Generator Operator for one or more controlled assets that contain a Generation Facility informed by its PC or TP as necessary to avoid an Adverse Reliability Impact in the planning horizon of more than one year.",
                "criteriaNumber": "2.3",
                "isSelected": false
              },
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Generator Operator for one or more controlled assets that contain a Generation or Transmission Facility that has been identified by its RC, PC, or TP as critical to the derivation of Interconnection Reliability Operating Limits (IROLs) and their associated contingencies.",
                "criteriaNumber": "2.6",
                "isSelected": false
              },
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Generator Operator for one or more controlled assets that contain a Special Protection System (SPS), Remedial Action Scheme (RAS), or automated switching System that could cause one or more Interconnection Reliability Operating Limits (IROLs) violations for failure to operate as designed, or cause a reduction in one or more IROLs.",
                "criteriaNumber": "2.9",
                "isSelected": false
              }
            ]
          }
        ],
        "Reliability Coordinator (RC)": [
          {
            "name": "The system is used by and located at a Control Center or backup Control Center that is used to perform the functional obligations of the Reliability Coordinator.",
            "criteriaNumber": "1.1",
            "isSelected": false
          }
        ],
        "Transmission Owner (TO)": [
        ],
        "Distribution Provider (DP)": [],
        "Generator Owner (GO)": [
        ],
        "Transmission Operator (TOP)": [
          {
            "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Transmission Operator.",
            "criteriaNumber": "1.3",
            "isSelected": false,
            "yes": [
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Transmission Operator for one or more controlled assets that contain reactive resources with an aggregate maximum Reactive Power nameplate rating of 1000 MVAR or greater at a single location, but not located at a Generation Facility.",
                "criteriaNumber": "2.2",
                "isSelected": false
              },
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Transmission Operator for one or more controlled assets that contain Transmission Facilities operated at 500 kV or higher, not including the collector bus for a Generation Resource.",
                "criteriaNumber": "2.4",
                "isSelected": false
              },
              {
                "name": "Is  the system used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Transmission Operator for one or more controlled assets that contain Transmission Facilities operating between 200 kV and 499 kV, where a single station or substation has at least 5 lines connected between 200 kV to 299 kV, or at least 3 lines connected between 300 kV to 399 kV, not including the collector bus for a Generation Resource.",
                "criteriaNumber": "2.5",
                "isSelected": false
              },
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Transmission Operator for one or more controlled assets that contain Transmission Facilities identified as essential to meeting Nuclear Plant Interface Requirements.",
                "criteriaNumber": "2.7",
                "isSelected": false
              },
              // {
              //   "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Transmission Operator for one or more controlled assets that contain Transmission Facilities, including generation interconnection Facilities, providing the generation interconnection for a Generation Resource with an aggregate highest rated net Real Power capability equal to or exceeding 1500 MW in a single Interconnection.",
              //   "criteriaNumber": "2.11",
              //   "isSelected": false
              // },
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Transmission Operator for one or more controlled assets that contain a Special Protection System (SPS), Remedial Action Scheme (RAS), or automated switching System that could cause one or more Interconnection Reliability Operating Limits (IROLs) violations for failure to operate as designed, or cause a reduction in one or more IROLs.",
                "criteriaNumber": "2.9",
                "isSelected": false
              },
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Transmission Operator for one or more controlled assets that contain Transmission Facilities, including generation interconnection Facilities, providing the generation interconnection for a Generation Resource informed by its PC or TP as necessary to avoid an Adverse Reliability Impact in the planning horizon of more than one year.",
                "criteriaNumber": "2.3",
                "isSelected": false
              },
              {
                "name": "The system is used by and located at a Control Center or backup Control Center used to perform the functional obligations of the Transmission Operator for one or more controlled assets that contain a control system that performs automatic (not initiated by a human operator) undervoltage or underfrequency Load shedding of 300 MW or more, under a load shedding program that is subject to one or more requirements in a NERC or regional reliability standard.",
                "criteriaNumber": "2.10",
                "isSelected": false
              }
            ]
          }],
        "Interchange Coordinator (IC) / Interchange Authority (IA)": []
      },
      "High": {
        "confirmedList": [
          "1.1",
          "1.2"
        ],
        "unConfirmedList": {
          "Control Center / Backup Control Center": {
            "2.1": {
              "subCriteria": ["1.4"]
            },
            "2.2": {},
            "2.3": {},
            "2.4": {},
            "2.5": {},
            "2.6": {},
            "2.7": {},
            "2.9": {
              "entityType": "Balancing Authority (BA)",
              "subCriteria": ["1.3", "1.4"]
            },
            "2.10": {},
            "2.11": {
              "subCriteria": ["1.3"]
            }
          }
        }
      },
      "Medium": {
        "confirmedList": [
          "1.3",
          "1.4",
          "2.13"
        ],
        "unConfirmedList": {
          "Generation Resource": {
            "2.1": {},
            "2.3": {},
            "2.6": {}
          },
          "Blackstart Resource": {
            "2.1": {},
            "2.3": {},
            "2.6": {}
          },
          "Reactive Resource": {
            "2.2": {}
          },
          "Transmission Station / Substation": {
            "2.3": {},
            "2.4": {},
            "2.6": {},
            "2.7": {},
            "2.11": {}
          },
          "SPS / RAS": {
            "2.9": {}
          },
          "UVLS / UFLS": {
            "2.10": {}
          },
          "Control Center / Backup Control Center": {
            "2.11": {}
          }
        }
      },
      "Low": {
        "confirmedList": [
          "2.5"
        ],
        "unConfirmedList": {
          "Control Center / Backup Control Center": {
            "2.9": {}
          }
        }
      }
    }
    $scope.pagedCollectionList = [];
    $scope.gridOptions = {
      csOptions: {
        allowAdd: false,
        allowDelete: false,
        allowClone: false,
        showPagination: true
      },
      enableSorting: false,
      enableFiltering: false,
      enableGridMenu: false,
      enableSelectAll: false,
      enableRowSelection: false,
      enableRowHeaderSelection: false,
      selectWithCheckboxOnly: false,
      enableColumnResizing: false,
      enableColumnMoving: false,
      paginationPageSizes: [5, 10, 30],
      refresh: false
    };
    var correlatedDataValues = [
      {
        'name': 'assets',
        'defaultColumns': ['id', 'hostname', 'macAddress', 'level', 'zone', 'bESCyberAssetCategory', 'location'],
      }
    ];

    // Load Entity data
    _init()
    function _init() {
      var entity = new Entity($scope.module);
      entity.get($scope.id, {
        $relationships: true
      }).then(function () {
        $scope.entity = entity;
      });
    }

    // Load relationship data defined in "correlatedDataValues"
    _loadRelationship()
    function _loadRelationship() {
      var pagedCollectionList = [];
      var promises = [];
      for (let i = 0; i < correlatedDataValues.length; i++) {
        var relationshipEntity = new Entity(correlatedDataValues[i].name);
        var params = {
          id: $scope.id,
          fieldName: correlatedDataValues[i].name
        };
        pagedCollectionList.push(new PagedCollection($state.params.module, relationshipEntity, params, null, null, correlatedDataValues[i].defaultColumns, null, null, false));
        angular.extend(pagedCollectionList[i].query, { limit: 10 });
        promises.push(pagedCollectionList[i].load(null, null, relationshipEntity.name).$promise);
      }
      $q.all(promises).then(function () {
        $scope.pagedCollectionList = pagedCollectionList;
      });
    }

    // loads default Entity and Digital Control System of record
    function loadDefaultEntityAndDCS() {
      $scope.entity.originalData.entityType.forEach(item1 => {
        $scope.entity.fields.entityType.options.forEach(item2 => {
          if (item1.itemValue === item2.itemValue) {
            item2.isSelected = true;
          }
          item2.itemValue = item2.itemValue.replace(/-/g, '/').replace(/\[/g, '(').replace(/\]/g, ')');
        })
      })
      $scope.entity.originalData.digitalControlSystems.forEach(item1 => {
        $scope.entity.fields.digitalControlSystems.options.forEach(item2 => {
          if (item1.itemValue === item2.itemValue) {
            item2.isSelected = true;
          }
          item2.itemValue = item2.itemValue.replace(/-/g, '/');
        })
      })
    }

    // Checks if any of the Entity and Digital Control System is Selected or not
    function isEntityAndDCSSelected() {
      const selectedEntity = $scope.entity.fields.entityType.options.some(option => option.isSelected);
      const selectedDigitalControl = $scope.entity.fields.digitalControlSystems.options.some(option => option.isSelected);
      $scope.isOnlyDistributionProviderSelected = $scope.entity.fields.entityType.options.every(item => (item.itemValue !== 'Distribution Provider (DP)') === !item.isSelected);
      $scope.isOnlyGenerationResourceSelected = $scope.entity.fields.digitalControlSystems.options.every(item => (item.itemValue !== 'Generation Resource') === !item.isSelected);
      if (!$scope.isOnlyDistributionProviderSelected && !$scope.isOnlyGenerationResourceSelected) {
        $scope.entityNextPage = 'Assess Criteria';
      }
      // if ($scope.isOnlyDistributionProviderSelected || $scope.isOnlyGenerationResourceSelected) {
      //   $scope.disableEntityContinue = true
      // }
      // else {
      $scope.disableEntityContinue = !(selectedEntity && selectedDigitalControl);
      // }
    }

    // function isEntityAndDCSSelected() {
    //   const selectedEntity = $scope.entity.fields.entityType.options.map(option => option.isSelected);
    //   $scope.isOnlyDistributionProviderSelected = checkOnlySelected('Distribution Provider (DP)', $scope.entity.fields.entityType.options)
    //   $scope.isOnlyGenerationResourceSelected = checkOnlySelected('Generation Resource', $scope.entity.fields.digitalControlSystems.options)
    //   if (!$scope.isOnlyDistributionProviderSelected && !$scope.isOnlyGenerationResourceSelected) {
    //     $scope.entityNextPage = 'Assess Criteria'
    //   }
    //   const selectedDigitalControl = $scope.entity.fields.digitalControlSystems.options.map(option => option.isSelected)
    //   if (selectedEntity.includes(true) && selectedDigitalControl.includes(true)) {
    //     $scope.disableEntityContinue = false
    //   }
    //   else {
    //     $scope.disableEntityContinue = true
    //   }
    // }

    // function checkOnlySelected(name, searchPath) {
    //   for (var i = 0; i < searchPath.length; i++) {
    //     var item = searchPath[i];
    //     if (item.itemValue === name) {
    //       if (!item.isSelected) {
    //         return false;
    //       }
    //     } else {
    //       if (item.isSelected) {
    //         return false;
    //       }
    //     }
    //   }
    //   return true
    // }

    function checkDistributionProviderValue(option) {
      $scope.isDPValueNone = option === 'None'
      if ($scope.isDPValueNone) {
        $scope.entityNextPage = 'Exit'
        toaster.error({
          body: 'CIP does not appear to be applicable based on this preliminary information.'
        });
      }
      else if (!$scope.isGRValueNuclear) {
        $scope.entityNextPage = 'Assess Criteria'
        $scope.selectedDPValue.data = option
      }
    }

    function checkGenerationResourceValue() {
      $scope.isGRValueNuclear = checkOnlySelected('Nuclear', $scope.digitalControlSystemsSubCriteria['Generation Resource'])
      if ($scope.isGRValueNuclear) {
        $scope.entityNextPage = 'Exit'
        toaster.error({
          body: 'CIP does not appear to be applicable based on this preliminary information. Kindly review the Electronic Code of Federal Regulations (10 CFR 72.54) for applicability.'
        });
      }
      else if (!$scope.isDPValueNone) {
        $scope.entityNextPage = 'Assess Criteria'
        // $scope.disableEntityContinue = false
      }
    }

    // Function load Criteria as per choosen Entity and Digital Control System
    function loadCriteria() {
      $scope.impactRatingCriteriaList = []
      $scope.selectedEntityList = []
      $scope.entity.fields.digitalControlSystems.options.forEach(item => {
        if (item.itemValue === 'Control Center / Backup Control Center' && item.isSelected) {
          $scope.entity.fields.entityType.options.forEach(criteria => {
            if (criteria.isSelected && $scope.impactRatingCriteria['Control Center / Backup Control Center'][criteria.itemValue].length > 0) {
              $scope.selectedEntityList.push(criteria.itemValue)
              $scope.impactRatingCriteriaList.push(...$scope.impactRatingCriteria['Control Center / Backup Control Center'][criteria.itemValue])
            }
          })
        }
        else if (item.isSelected && $scope.impactRatingCriteria['commonData'][item.itemValue].length > 0) {
          $scope.impactRatingCriteriaList.push(...$scope.impactRatingCriteria['commonData'][item.itemValue])
        }
      })
    }

    // Select All criteria
    function selectAllOperations() {
      angular.forEach($scope.impactRatingCriteriaList, function (impact) {
        impact.isSelected = $scope.selectAll.isSelected
      })
      displaySubCriteria()
    }

    // Display Sub Criteria if any
    function displaySubCriteria() {
      if ($scope.selectedEntityList.length > 0) {
        $scope.selectedEntityList.forEach(entity => {
          $scope.impactRatingCriteria['Control Center / Backup Control Center'][entity].forEach(item => {
            if (item.isSelected && 'yes' in item) {
              item['yes'].forEach(data => {
                if (!containsObject($scope.impactRatingCriteriaList, data)) {
                  $scope.impactRatingCriteriaList.push(data)
                }
              })
            }
            else {
              loadCriteria();
            }
          })
        })
      }
      allSelected = $scope.impactRatingCriteriaList.every(function (impact) {
        return impact.isSelected;
      })
      if (allSelected) {
        $scope.selectAll.isSelected = true
      }
      else {
        $scope.selectAll.isSelected = false
      }
    }

    // get selected criteria
    function checkCriteriaSelected() {
      $scope.selectedCriteria = [];
      $scope.impactRatingCriteriaList.forEach((criteria) => {
        if (criteria.isSelected) {
          $scope.selectedCriteria.push(criteria.criteriaNumber);
        }
      });
    }

    // set criteria output
    function setCriteriaOutput() {
      if (checkImpact("High")) {
        $scope.criteriaOutput = "High"
      }
      else if (checkImpact("Medium")) {
        $scope.criteriaOutput = "Medium"
      }
    }

    // Check Impact
    function checkImpact(impactType) {
      // Check confirmedList
      if ($scope.impactRatingCriteriaList.some(selectedItem => $scope.impactRatingCriteria[impactType].confirmedList.includes(selectedItem.criteriaNumber) && selectedItem.isSelected)) {
        return true;
      }

      // Check unConfirmedList
      for (const [key, value] of Object.entries($scope.impactRatingCriteria[impactType].unConfirmedList)) {
        const isMatch = $scope.entity.fields.digitalControlSystems.options.some(item => item.itemValue === key && item.isSelected);

        if (isMatch && $scope.impactRatingCriteriaList.some(data => {
          if (data.isSelected && data.criteriaNumber in value) {
            return Object.keys(value[data.criteriaNumber]).length === 0 || value[data.criteriaNumber].subCriteria.some(item => $scope.selectedCriteria.includes(item)) || $scope.entity.fields.entityType.options.some(entity => entity.itemValue === value[data.criteriaNumber].entityType && entity.isSelected)
            // return Object.keys(value[data.criteriaNumber]).length === 0 || $scope.selectedCriteria.includes(value[data.criteriaNumber].subCriteria) || $scope.entity.fields.entityType.options.some(entity => entity.itemValue === value[data.criteriaNumber].entityType && entity.isSelected) // value[data.criteriaNumber].some(subItem => subItem in $scope.impactRatingCriteriaList);
          }
        })) {
          return true;
        }
      }
      return false;
    }

    // Save and Close Widget
    function saveAndCloseWidget() {
      var bESImpact = $scope.entity.fields.bESImpact.options.find(item => item.itemValue === $scope.criteriaOutput);
      var entityType = $scope.entity.fields.entityType.options.filter(function (item) {
        return item.isSelected === true;
      })
      var digitalControlSystems = $scope.entity.fields.digitalControlSystems.options.filter(function (item) {
        return item.isSelected === true
      })
      const epochDate = Date.now() / 1000;

      // Add selected criteria
      let selectedCriteria = ''
      if ($scope.selectedCriteria.length === 0) {
        selectedCriteria = 'No Criteria Selected!';
      }
      else {
        selectedCriteria = '<ol type="1">';
        for (let i = 0; i < $scope.impactRatingCriteriaList.length; i++) {
          if ($scope.impactRatingCriteriaList[i].isSelected)
            selectedCriteria += '<li><span class="font-size-14">' + $scope.impactRatingCriteriaList[i].name + '</span></li>';
        }
        selectedCriteria += '</ol>'
      }

      $resource(API.API_3_BASE + $scope.entity.module + '/' + $scope.entity.id, null, {
        'update': {
          method: 'PUT'
        }
      }).update({ 'entityType': entityType, 'digitalControlSystems': digitalControlSystems, 'bESImpact': bESImpact, 'lastAssessmentDate': epochDate, 'selectedCriteria': selectedCriteria }).$promise.then(function () {
      });

      // Add comment
      var noteData = 'No Notes available!'
      if ($scope.note.data !== "") {
        noteData = $scope.note.data
      }
      const date = new Date(epochDate * 1000);
      let noteAsComment = '<h4>Details of the last Impact Level Assessment: </h4><p>Assessment Date: ' + date.toLocaleString() + '</p><p>Impact Level: <span style="color:' + $scope.impactColor + '">' + bESImpact.itemValue + '</span></p><p>Entity Type: <ol type="1">' + entityType.map(item => `<li>${item.itemValue}</li>`).join('\n') + '</ol>' + '</p><p>Digital Control System: <ol type="1">' + digitalControlSystems.map(item => `<li>${item.itemValue}</li>`).join('\n') + '</ol>' + '</p><p>Criteria: ' + selectedCriteria + '</p><p>Notes: ' + noteData
      $resource(API.API_3_BASE + 'comments', null, {
        'update': {
          method: 'POST'
        }
      }).update({
        "content": noteAsComment,
        "recordTags": [],
        "type": "/api/3/picklists/ff599189-3eeb-4c86-acb0-a7915e85ac3b",
        "people": [],
        "files": [],
        "peopleUpdated": false,
        "bESCyberSystems": [
          $scope.entity.originalData["@id"]
        ]
      }).$promise.then(function () {
      });

      toaster.success({
        body: 'Successfully evaluated and marked impact on the System ' + $scope.entity.originalData.title
      });
      $timeout(function () {
        $window.location.reload();
      }, 3000);
      $scope.close();
    }

    function containsObject(mainList, subObject) {
      return mainList.some(item => JSON.stringify(item) === JSON.stringify(subObject));
    }

    function moveNext() {
      $scope.WizardHandler.wizard('besImpactEvaluation').next();
      if ($scope.WizardHandler.wizard('besImpactEvaluation').currentStep().wzTitle === 'Associated Assets') {
        loadDefaultEntityAndDCS()
      }
      if ($scope.WizardHandler.wizard('besImpactEvaluation').currentStep().wzTitle === 'Entity & Control Systems') {
        if ($scope.entityNextPage === 'Exit') {
          $scope.close();
        }
        loadCriteria();
      }
      if ($scope.WizardHandler.wizard('besImpactEvaluation').currentStep().wzTitle === 'Impact Rating Criteria') {
        checkCriteriaSelected()
        setCriteriaOutput()
        $scope.impactColor = $scope.entity.fields.bESImpact.options.find(item => item.itemValue === $scope.criteriaOutput).color
        const impactColorElement = document.getElementById('impactColorElement');
        var impactColorRGB = $scope.convertHexToRgbA(CommonUtils.isUndefined($scope.impactColor) ? '#000' : $scope.impactColor);
        impactColorElement.style.borderColor = $scope.impactColor;
        impactColorElement.style.background = 'linear-gradient(to right, ' + impactColorRGB + ' 5%, transparent 100%)';
      }
    }
    function movePrevious() {
      if ($scope.WizardHandler.wizard('besImpactEvaluation').currentStep().wzTitle === "Summary") {
        $scope.criteriaOutput = "Low"
      }
      if ($scope.WizardHandler.wizard('besImpactEvaluation').currentStep().wzTitle === "Impact Rating Criteria") {
        $scope.selectAll.isSelected = false
      }
      $scope.WizardHandler.wizard('besImpactEvaluation').previous();
    }
  }
})();