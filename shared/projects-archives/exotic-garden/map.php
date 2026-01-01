<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<div id="map-canvas"></div>

<script>
    function initialize() {
        var myLatlng = new google.maps.LatLng(38.7294042, -9.1558277);
        var mapOptions = {
            zoom: 9,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        //=====Initialise Default Marker    
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'marker'
        //=====You can even customize the icons here
        });

        //=====Initialise InfoWindow
        var infowindow = new google.maps.InfoWindow({
        content: "<B>Skyway Dr</B>"
    });

    //=====Eventlistener for InfoWindow
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
</script>