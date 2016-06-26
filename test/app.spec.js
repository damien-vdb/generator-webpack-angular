describe('app', function() {

	describe('FirstPageController', function() {
		var ctrl;

		beforeEach(function() {
			angular.mock.module('app');

			angular.mock.inject(function($controller) {
				ctrl = $controller('FirstPageController', {});
			});
		});

		it('should contain the starter url',
				function() {
					expect(ctrl.url).toBe(
							'https://github.com/preboot/angular-webpack');
				});
	});
});