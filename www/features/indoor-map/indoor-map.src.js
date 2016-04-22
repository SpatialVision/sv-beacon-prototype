/**
 * @author Parham
 * @since 20/04/2016
 */

angular.module('svBeaconPrototype')

  .controller('IndoorMapCtrl', function ($scope, $log, $state, $interval, $stateParams, $ionicPopup, MapDefaults, Location, leafletData) {
    $log.info('IndoorMapCtrl...');
    var officeBoundaries = [
        [-37.81635916590862, 144.95643094182014],
        [-37.81626381573271, 144.95675414800644],
        [-37.81660919467391, 144.95691373944283],
        [-37.81670136608138, 144.95659321546555]
      ],
      center = {lat: -37.81643332707141, lng: 144.95671659708023}, map;


    function _initMap(found) {
      leafletData.getMap().then(function (lmap) {
        var polyLine = L.polyline(officeBoundaries);

        var imageUrl = 'https://idaweb.blob.core.windows.net/imageblobcontainer/50453515-be2d-493b-91f2-a3e1c2083d5e';

        // TopLeft, TopRight, BottomRight, BottomLeft
        var transformedImage = L.imageTransform(imageUrl, officeBoundaries);
        transformedImage.addTo(lmap);

        lmap.fitBounds(polyLine.getBounds());
        lmap.zoomIn();

        _moveAround();

      });
    }

    function _moveAround() {
      var points = [
        [-37.8166335618388, 144.95664484798908],
        [-37.816625616025036, 144.95665960013866],
        [-37.816621378257366, 144.956676363945],
        [-37.81661555132639, 144.9566951394081],
        [-37.816603367741976, 144.95670653879642],
        [-37.8165975408096, 144.95671726763248],
        [-37.816591713876754, 144.95673201978207],
        [-37.81658588694344, 144.95675012469292],
        [-37.816581119452216, 144.95676688849926],
        [-37.81657847084584,144.9567849934101],
        [-37.816539801181996, 144.95677158236504],
        [-37.81651384482093, 144.95676085352898],
        [-37.81649053706037, 144.95675683021545],
        [-37.81646722929244, 144.95675012469292]
    ];
      var index = 0;
      $interval(function () {
        if(index === points.length){
          index = 0;
        }
        updateMarker({lat: points[index][0], lng: points[index][1]}, $scope);
        index++;
      }, 1000)
    }

    function updateMarker(latlng, $scope) {
      var newLocation = Location.createMarker(latlng);
      if ($scope.markers) {
        $scope.markers.location.lat = newLocation.lat;
        $scope.markers.location.lng = newLocation.lng;
      }

      $scope.markers = {};
      $scope.markers.location = newLocation;

      return newLocation;
    }

    angular.extend($scope, {
      defaults: {
        scrollWheelZoom: true,
        maxZoom: 25,
        zoomControl: false
      },
      maxBounds: {
        southWest: {
          lat: officeBoundaries[3][0],
          lng: officeBoundaries[3][1]
        },
        northEast: {
          lat: officeBoundaries[1][0],
          lng: officeBoundaries[1][1]
        }

      },
      maxBoundsViscosity: 1.0,
      center: Location.createCenter(center),
      markers: {location: Location.createMarker(center)},
      layers: MapDefaults.defaultLayers,
      events: {
        map: {enable: ['click', 'dragend']},
        markers: {enable: ['click', 'dragend']}
      }
    });

    _initMap();

  });
