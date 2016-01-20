'use strict';

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope) {
    console.log(1)
    $scope.phones = [
        {'name': 'Nexus S',
            'snippet': 'Fast just got faster with Nexus S.'},
        {'name': 'Motorola XOOM™ with Wi-Fi',
            'snippet': 'The Next, Next Generation tablet.'},
        {'name': 'MOTOROLA XOOM™',
            'snippet': 'The Next, Next Generation tablet.'}
    ];

});

var bindExample = angular.module('bindExample', []);
bindExample.controller('ExampleController', function($scope) {
    $scope.name = 'Whirled';
    console.log(21)
});



/*
it('should check ng-bind', function() {
    var nameInput = element(by.model('name'));

    expect(element(by.binding('name')).getText()).toBe('Whirled');
    nameInput.clear();
    nameInput.sendKeys('world');
    expect(element(by.binding('name')).getText()).toBe('world');
});
*/





















































