var app = angular.module('caffeinehit.controllers', []);

app.controller("YelpController", function ($scope, YelpService) {
$scope.$on('mapInitialized', function(event, map){
	$scope.map = map;
	//$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtayMnesaW9JoHB2yTuvqvzacTWdOJ_a8";	

});

	$scope.yelp = YelpService;

	$scope.doRefresh = function () {
		if (!$scope.yelp.isLoading) {
			$scope.yelp.refresh().then(function () {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	};

	$scope.loadMore = function () {
		console.log("loadMore");
		if (!$scope.yelp.isLoading && $scope.yelp.hasMore) {
			$scope.yelp.next().then(function () {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	};

	$scope.getDirections = function (cafe) {
		console.log("Getting directions for cafe");
		var destination = [
			cafe.location.coordinate.latitude,
			cafe.location.coordinate.longitude
		];

		var source = [
			$scope.yelp.lat,
			$scope.yelp.lon
		];

		launchnavigator.navigate(destination, source);
	};

	$scope.showCafeDetail = function(event, cafe){
		$scope.yelp.cafe = cafe;
		//$scope.map.scope.showInfoWindow.apply(this,[event, 'marker-info']);
		$scope.map.showInfoWindow('marker-info', this);
	}
});
