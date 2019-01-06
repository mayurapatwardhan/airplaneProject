
    
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'http://comp426.cs.unc.edu:3001/seed_data.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

var jsonData;
var jsonAirlines;
var jsonAirports;
var jsonFlights;
var jsonPlanes;
var jsonInstances;

 loadJSON(function(response) {
  // Parse JSON string into object
    jsonData = JSON.parse(response);
    jsonAirlines = jsonData['airlines'];
    jsonAirports = jsonData['airports'];
    jsonFlights = jsonData['flights'];
    jsonPlanes = jsonData['planes'];
    jsonInstances = jsonData['instances'];
 });
// Initialize and add the map
var map;
var markerArray;
var planeIcon;

//change slider
function onUpdateSlider(value) {
    var hour = parseInt(value / 60);
    var min = value % 60;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    document.getElementById("time_show").innerHTML = hour + ":" + min;
}

function initMap() {
     var h = document.getElementById("home");
    
    h.onclick=function(){
         console.log('buidling page');
    let body = $('body');
    body.empty();
    body.append('<canvas id = "myc"></canvas>'); 
    
    var resources = document.createElement("p");
    resources.innerHTML="Resources";
    resources.id="resource";
    
    var flight_txt = document.createElement("p");
    flight_txt.innerHTML="Flights";
    flight_txt.id="fl_txt";
    
    var map_txt = document.createElement("p");
    map_txt.innerHTML="Map";
    map_txt.id="maptxt";
    
    var plane_img = document.createElement("img");
    plane_img.id="plane"
    plane_img.src="pln.png";
    
    var map_img = document.createElement("img");
    map_img.id="map"
    map_img.src="mp.jpg";
        
        var log_out = document.createElement("button");
    log_out.innerHTML="Log Out";
    log_out.id="logout";
        
    body.append(resources);
    body.append(map_txt);
    body.append(flight_txt);
    body.append(plane_img);
    body.append(map_img);
        body.append(log_out);
     
     $('#map').on('click', () => {
         window.location="index.html";
        console.log('entered map');        
    });
    $('#plane').on('click', () => {
         window.location="select.html";
        console.log('entered flight');        
    });
         $('#logout').on('click',()=>{
        window.location="final.html";
    });
        
    }
    
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 2, center: {lat: 35.9130556, lng: -79.0561111}});

    //create marker icon
    planeIcon = new google.maps.MarkerImage(
        "plane-icon.png", null, null, null, new google.maps.Size(25, 25) //plane icon size
    );  
    
    markerArray = [];
    jsonFlights.forEach(function result(value, index, ar) {

        var flight = value;
        var departure = getAirportFromID(flight.departure_id);
        var arrival = getAirportFromID(flight.arrival_id);

        var curPos = getCenter(Math.radians(parseFloat(departure.latitude)), Math.radians(parseFloat(departure.longitude)), Math.radians(parseFloat(arrival.latitude)), Math.radians(parseFloat(arrival.longitude)));

        var marker = new google.maps.Marker({position: curPos, map: map, icon: planeIcon});

        var infowindow;
        marker.addListener('mouseover', function() {

            var airline = getAirlineFromID(flight.airline_id);
            contentString = "<div>Flight Number : " + flight.number + "</div>"
                            + "<div>Airline : " + airline.name + "</div>"
                            + "<div>Departure : " + departure.name + "</div>"
                            + "<div>Arrival : " + arrival.name + "</div>";
            infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.open(map, this);
        });

        // assuming you also want to hide the infowindow when user mouses-out
        marker.addListener('mouseout', function() {
            infowindow.close();
        });
        markerArray.push(marker);
    });
}

//Search airline from id, return empty string if no result
function getAirlineFromID(id) {
    for(var i = 0; i < jsonAirlines.length; i ++) {
        var airline = jsonAirlines[i];
        if(airline.id == id) {
            return airline;
        }
    }
    return "";
}

//Search airport from id, return empty string if no result
function getAirportFromID(id) {
     for(var i = 0; i < jsonAirports.length; i ++) {
        var airport = jsonAirports[i];
        if(airport.id == id) {
            return airport;
        }
    }
    return "";
}

//Search flight from id, return empty string if no result
function getFlightFromID(id) {
     for(var i = 0; i < jsonFlights.length; i ++) {
        var flight = jsonFlights[i];
        if(flight.id == id) {
            return flight;
        }
    }
    return "";
}

//Search plane from id, return empty string if no result
function getPlaneFromID(id) {
     for(var i = 0; i < jsonPlanes.length; i ++) {
        var plane = jsonPlanes[i];
        if(plane.id == id) {
            return plane;
        }
    }
    return "";
}

//Search instances from id, return empty string if no result
function getInstancesFromID(id) {
    var instances = [];
     for(var i = 0; i < jsonInstances.length; i ++) {
        var instance = jsonInstances[i];
        if(instance.flight_id == id) {
            instances.push(instance);
        }
    }
    return "";
}

//Click Filter Button Event
function onClickFilter() {
    var year = document.getElementById('input_year').value;
    var month = document.getElementById('input_month').value;
    var day = document.getElementById('input_day').value;
    if(year == "" || month == "" || day == "") {
        initMap();
        return;
    }
    var time = document.getElementById('time_show').innerHTML;
    var date = year + "-" + month + "-" + day;
    filterPlanesbyTime(date, time);
}

function filterPlanesbyTime(date, time) {
    //remove all markers from map
    for(var i = 0; i< markerArray.length; i ++)
        markerArray[i].setMap(null);
    markerArray = [];

    var filterDate = new Date(date + " " + time);
    jsonInstances.forEach(function result(value, index, ar) {

        var instance = value;
        if(instance.is_cancelled == false) {
            
            var flight = getFlightFromID(instance.flight_id);
            var departureDate = new Date(instance.date + " " + flight.departs_at);
            var arrivalDate = new Date(instance.date + " " + flight.arrives_at);
            if(departureDate > arrivalDate) {
                arrivalDate.setDate(arrivalDate.getDate() + 1);
            }
            if(departureDate <= filterDate && filterDate <= arrivalDate) {
                var departure = getAirportFromID(flight.departure_id);
                var arrival = getAirportFromID(flight.arrival_id);
                var curPos = getCenter(Math.radians(parseFloat(departure.latitude)), Math.radians(parseFloat(departure.longitude)), Math.radians(parseFloat(arrival.latitude)), Math.radians(parseFloat(arrival.longitude)));

                var marker = new google.maps.Marker({position: curPos, map: map, icon: planeIcon});
                var infowindow;
                marker.addListener('mouseover', function() {
                    var airline = getAirlineFromID(flight.airline_id);
                    contentString = "<div>Flight Number : " + flight.number + "</div>"
                                    + "<div>Airline : " + airline.name + "</div>"
                                    + "<div>Departure : " + departure.name + "</div>"
                                    + "<div>Arrival : " + arrival.name + "</div>";
                    infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    infowindow.open(map, this);
                });

                // assuming you also want to hide the infowindow when user mouses-out
                marker.addListener('mouseout', function() {
                    infowindow.close();
                });
                markerArray.push(marker);
            }
        }
    });
}

function getCenter(lat1, lon1, lat2, lon2) {
    var Bx = Math.cos(lat2) * Math.cos(lon2-lon1);
    var By = Math.cos(lat2) * Math.sin(lon2-lon1);
    var latMid = Math.atan2(Math.sin(lat1) + Math.sin(lat2),
                        Math.sqrt( (Math.cos(lat1)+Bx)*(Math.cos(lat1)+Bx) + By*By ) );
    var lonMid = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);
    return new google.maps.LatLng({lat: Math.degrees(latMid), lng: Math.degrees(lonMid)}); 
}

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};