
angular.module('app').config(route);

function route($routeProvider) {

	$routeProvider.otherwise({
		template : require('./screen/first-page/first-page.html'),
		controller : require('./screen/first-page/first-page.controller'),
		controllerAs : 'app'
	});
}