function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        zoomControl: true,
        center: {lat: current_latitude, lng: current_longitude},
        zoom: 5,
        // styles : [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#e4e8e9"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#7de843"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#9bd0e8"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]
    });

    // new AutocompleteDirectionsHandler(map);
}

/**
 * @constructor
 */

 function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'DRIVING';
    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');
    var modeSelector = document.getElementById('mode-selector');
    var originLatitude = document.getElementById('origin_latitude');
    var originLongitude = document.getElementById('origin_longitude');
    var destinationLatitude = document.getElementById('destination_latitude');
    var destinationLongitude = document.getElementById('destination_longitude');

    var polylineOptionsActual = new google.maps.Polyline({
        strokeColor: '#111',
        strokeOpacity: 0.8,
        strokeWeight: 4
    });

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: false, polylineOptions: polylineOptionsActual});
    this.directionsDisplay.setMap(map);

    var originAutocomplete = new google.maps.places.Autocomplete(
        originInput);
    var destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput);

    originAutocomplete.addListener('place_changed', function(event) {
        var place = originAutocomplete.getPlace();

        if (place.hasOwnProperty('place_id')) {
            if (!place.geometry) {
                    // window.alert("Autocomplete's returned place contains no geometry");
                    return;
                }
                originLatitude.value = place.geometry.location.lat();
                originLongitude.value = place.geometry.location.lng();
            } else {
                service.textSearch({
                    query: place.name
                }, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        originLatitude.value = results[0].geometry.location.lat();
                        originLongitude.value = results[0].geometry.location.lng();
                    }
                });
            }
        });


    destinationAutocomplete.addListener('place_changed', function(event) {
        var place = destinationAutocomplete.getPlace();

        if (place.hasOwnProperty('place_id')) {
            if (!place.geometry) {
                // window.alert("Autocomplete's returned place contains no geometry");
                return;
            }
            destinationLatitude.value = place.geometry.location.lat();
            destinationLongitude.value = place.geometry.location.lng();
        } else {
            service.textSearch({
                query: place.name
            }, function(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    destinationLatitude.value = results[0].geometry.location.lat();
                    destinationLongitude.value = results[0].geometry.location.lng();
                }
            });
        }
    });

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.place_id) {
            // window.alert("Please select an option from the dropdown list.");
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
    });

};

AutocompleteDirectionsHandler.prototype.route = function() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    
    var me = this;

    this.directionsService.route({
        origin: {'placeId': this.originPlaceId},
        destination: {'placeId': this.destinationPlaceId},
        travelMode: this.travelMode
    }, function(response, status) {
        console.log(response)
        if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
        } else {
            // window.alert('Directions request failed due to ' + status);
        }
    });
};


function initMap2(s_late, s_long, d_late, d_long, mileage, obj =null) {
    map = new google.maps.Map(document.getElementById('map'),{
        mapTypeControl: false,
        zoomControl: true,
        center: {lat: current_latitude, lng: current_longitude},
        zoom: 13,
        gestureHandling: 'greedy',
        styles : [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#e4e8e9"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#7de843"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#9bd0e8"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]
    });

    var marker = new google.maps.Marker({
        map: map,
        icon: '/asset/img/marker-start.png',
        anchorPoint: new google.maps.Point(0, -29)
    });

    var markerSecond = new google.maps.Marker({
        map: map,
        icon: '/asset/img/marker-end.png',
        anchorPoint: new google.maps.Point(0, -29)
    });

    var bounds = new google.maps.LatLngBounds();

    source = new google.maps.LatLng(s_late , s_long);
    destination = new google.maps.LatLng(d_late, d_long);

    marker.setPosition(source);
    markerSecond.setPosition(destination);
    var polylineOptionsActual = new google.maps.Polyline({
        strokeColor: '#070707',
        strokeOpacity: 0.8,
        strokeWeight: 4
    });
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, polylineOptions: polylineOptionsActual});
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            marker.setPosition(result.routes[0].legs[0].start_location);
            markerSecond.setPosition(result.routes[0].legs[0].end_location);
        }
    });

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            var km = response.rows[0].elements[0].distance.text;
            var h = response.rows[0].elements[0].duration.text;
            var f = 0.0;
            var k = ((response.rows[0].elements[0].distance.value)/1000).toFixed(2);
            if(!mileage[1]){ 
                $('#movement_fuel_required_div').html('<input type="text" class="form-control input-sm movement_fuel_required mv_validate" name="fuel" readonly>')          
                $('.movement_fuel_required').parent().prev().text('Fuel Required (LT)')          
                f = (k / mileage[0]).toFixed(2);
                n = Math.abs(f);
                decimal = n - Math.floor(n)
                if(decimal >= 0.5){
                    f = Number(f).toFixed(0)
                }
                else{
                    f = Number(f).toFixed(0);
                    f = parseFloat(f) + .50;
                }
                $('.movement_fuel_required').val(f);
                $('.movement_fuel_required').prop('readonly', true);
                if(f == 0.0){              
                    $('.movement_fuel_required').prop('readonly', false);
                    $('.movement_fuel_required').val('')
                }
            }
            else{
               
                $('#movement_fuel_required_div').html('<select class="form-control input-sm movement_fuel_required movement_fuel_required_petrol_change mv_validate" name="fuel"><option value="'+Math.ceil(k / (Number(((mileage[0].split(',')[0]).replace('KMPL', '')).trim())).toFixed(2))+'" selected>'+Math.ceil(k / (Number(((mileage[0].split(',')[0]).replace('KMPL', '')).trim())).toFixed(2))+' LT PETROL</option><option value="'+Math.ceil((k / ((mileage[0].split(',')[1]).replace('KMKG','')).trim()).toFixed(2))+'">'+Math.ceil((k / ((mileage[0].split(',')[1]).replace('KMKG','')).trim()).toFixed(2))+' KG CNG</option></select><input type="hidden" class="form-control input-sm fuel_which_class" name="fuel_which" value="PETROL">')    
                $('.movement_fuel_required').parent().prev().text('Fuel Required')
            }
            document.getElementById("time_duration_map").innerHTML=duration;
            document.getElementById("distance_duration_map").innerHTML=distance;
            $('.movement_distance').val(km)
            $('.movement_time').val(h)
            $('.movement_time_map').val((response.rows[0].elements[0].duration.value/60).toFixed(0))
            if(obj && !mileage[1]){
                fixFuelMovement(obj)
            }
        }
    });

}