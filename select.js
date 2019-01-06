let root_url = "http://comp426.cs.unc.edu:3001/";
let planes = [];
let airlines = [];
let airports = [];
var flights = [];
var airlineId = [];
var planeId = [];
var airportId = [];
let arrivals = [];
let arrivalsId = [];
var finalTime = "";
let airportsTotal = [];
var map;
var markerArray;
var planeIcon;
let planesTotal = [];
let airlinetotal = [];
let arrivalsTotal = [];
var jsonData;
var jsonAirlines;
var jsonAirports;
var jsonFlights;
var jsonPlanes;
var jsonInstances;
var sourceID = 3448;
let destinationsTotal = [];
let timingsTotal = [];
let date2 = "";
let timings = [];
let destinations = [];
let destinationsId =[];
var dropDown = false;
var clicked = 0;

var highlighter = -1;
var flightdate = "";
let arrivalFinal = [];
let destinationsFinal = [];
$(document).ready(function(){
  let body = $('body');
     var h = document.getElementById("h"); 
    $('#h').on('click', () => { 
        body.empty(); 
        //console.log('buidling page'); 
        body.append('<canvas id = "myc"></canvas>');
        
        var resources = document.createElement("p"); 
        resources.innerHTML="Resources"; 
        resources.id="resource";
        var flight_txt = document.createElement("p"); 
        
        flight_txt.innerHTML="Flights"; 
        flight_txt.id="fl_txt"; var map_txt = document.createElement("p"); 
        
        map_txt.innerHTML="Map"; 
        map_txt.id="maptxt"; 
        var plane_img = document.createElement("img");
        
        plane_img.id="plane";
        plane_img.src="pln.png";
        var map_img = document.createElement("img");
        map_img.id="map";
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
            //console.log('entered map');
        }); 
        $('#plane').on('click', () => {
            window.location="select.html";
            //console.log('entered flight'); 
        });
         $('#logout').on('click',()=>{
        window.location="final.html";
    });
    
    });
  body.append('<div class="dropdown">')
  //$('.dropdown').append('<button onclick="myFunction()" class="dropbtn">Dropdown</button>');
//  $('.dropdown').append('<div id="myDropdown" class="dropdown-content">');
  $('.dropdown').append(' <input type="text" placeholder="Where are you coming from?" id="myInput" onkeyup="filterFunction()">');
  $('.dropdown').append('<div id="myDropdown" class="dropdown-content">');
//  console.log("yes");
    $.ajax('http://comp426.cs.unc.edu:3001/airports',
      {
        type: 'GET',
        dataType: 'json',
        xhrFields: {withCredentials: true},
        success: (response) => {
          let codes = [];
          for(var i = 0; i<response.length; i++){
          //  airlines.push(response[i].name);
          //  airlinetotal.push(response[i].id);
            arrivals.push(response[i].city);
            arrivalsTotal.push(response[i].id);
            codes.push(response[i].code);
          }
          for(var i = 0; i<arrivals.length; i++){
            $('.dropdown-content').append('<a id="Mihir'+i+'" value = "'+i+'" type = "arrivals">' + arrivals[i]+ ' (' + codes[i] + ')' +'</a>');
          }

          $('a').click(
            function(){

              if($(this).attr('type') == 'arrivals'){
              $('#myInput').val(arrivals[$(this).attr('value')]);
              $('.dropdown-content').css({display:"none"});
            //  myFunction();
              $.ajax('http://comp426.cs.unc.edu:3001/airports?filter[city]='+arrivals[$(this).attr('value')]+'',
                {
                  type: 'GET',
                  dataType: 'json',
                  xhrFields: {withCredentials: true},
                  success: (response) => {
                    for(var  i = 0; i<response.length; i++){
                      arrivalsId.push(response[i].id);
                    }
                }
              });
            }

            }
          )
        }
    });

    body.append('<div class="dropdownTwo">')
    //$('.dropdownTwo').append('<button onclick="myFunctionTwo()" class="dropbtn">Dropdown</button>');
    //$('.dropdownTwo').append('<div id="myDropdownTwo" class="dropdown-contentTwo">');
    $('.dropdownTwo').append(' <input type="text" placeholder="Search Destination.." id="myInputTwo" onkeyup="filterFunctionTwo()">');
    $('.dropdownTwo').append('<div id="myDropdownTwo" class="dropdown-contentTwo">');
    $.ajax('http://comp426.cs.unc.edu:3001/airports',
      {
        type: 'GET',
        dataType: 'json',
        xhrFields: {withCredentials: true},
        success: (response) => {
          let codes = [];
          for(var i = 0; i<response.length; i++){
          //  airlines.push(response[i].name);
          //  airlinetotal.push(response[i].id);
            destinations.push(response[i].city);
            destinationsTotal.push(response[i].id);
            codes.push(response[i].code);
          }
      //    console.log(destinations);
          for(var i = 0; i<destinations.length; i++){
            $('.dropdown-contentTwo').append('<a id="Mihir'+i+'" value = "'+i+'" type = "departures">' + destinations[i]+  ' (' + codes[i]  + ')' + '</a>');
          }

          $('a').click(
            function(){
              if($(this).attr('type') == 'departures'){
              $('#myInputTwo').val(arrivals[$(this).attr('value')]);
              $('.dropdown-contentTwo').css({display:"none"});
              destinationsId = [];
            //  myFunction();
              $.ajax('http://comp426.cs.unc.edu:3001/airports?filter[city]='+destinations[$(this).attr('value')]+'',
                {
                  type: 'GET',
                  dataType: 'json',
                  xhrFields: {withCredentials: true},
                  success: (response) => {
                    for(var  i = 0; i<response.length; i++){
                      destinationsId.push(response[i].id);
            //          console.log(destinationsId);
              //        console.log('hello');
                    }
                }
              });
            }

            }
          )
        }
    });
    //body.append('  <table id = "calendar"><tr><th colspan="7" id = "title">Calendar</th></tr><tr><th>Monday</th><th>Tuesday</th><th>Wenesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th></tr></table>');
    
    
    $('#upload').click(function(){
      
      flightdate = $("#datepicker").val()
      //console.log(flightdate)
        
       if(arrivalsId.length == 0){
        // console.log('null airline');
         for(var i = 0; i<arrivalsTotal.length; i ++){
          // console.log("arrivals");
           arrivalsId.push(arrivalsTotal[i]);
         }
       }
       if(destinationsId.length == 0){
         //console.log('plane id null');
         for(var i = 0; i<destinationsTotal.length; i++){
           //console.log('departures');
           destinationsId.push(destinationsTotal[i]);
         }
       }
       updateTimings();

       // console.log(arrivalsId);
       // console.log(destinationsId);f
       console.log(timings);
       if(timings.length != 0) {
        body.empty();
       var count = 0;
       $.ajax('http://comp426.cs.unc.edu:3001/airlines',
         {
           type: 'GET',
           dataType: 'json',
           xhrFields: {withCredentials: true},
           async:false,
           success: (response) => {
             for(var i = 0; i<timings.length; i++){
               for(var j =0; j<response.length; j++){
                 if(response[j].id == timings[i].airline_id){
                   airlines.push(response[j].name);
                 }

               }
             }
           }
         });
         $.ajax('http://comp426.cs.unc.edu:3001/planes',
           {
             type: 'GET',
             dataType: 'json',
             xhrFields: {withCredentials: true},
             async:false,
             success: (response) => {
               for(var i = 0; i<timings.length; i++){
                 for(var j =0; j<response.length; j++){
                   if(response[j].id == timings[i].plane_id){
                     planes.push(response[j].name);
                   }

                 }
               }
             }
           });
       $.ajax('http://comp426.cs.unc.edu:3001/airports',
         {
           type: 'GET',
           dataType: 'json',
           xhrFields: {withCredentials: true},
           async:false,
           success: (response) => {
             for(var i = 0; i<timings.length; i++){
               for(var j =0; j<response.length; j++){
                 if(response[j].id == timings[i].arrival_id){
                   arrivalFinal.push(response[j].city);
                 }
                 if(response[j].id == timings[i].departure_id){
                   
                   destinationsFinal.push(response[j].city);
                 }
               }
             }
           }
         });
              
            
               for(var i = 0; i<timings.length; i++){
                 body.append('<div class = "booked" id = "'+i+'">');
                 let jsondeparts = JSON.stringify(timings[i].departs_at);
                 let jsonarives = JSON.stringify(timings[i].arrives_at);
                 $('#'+i+'').append('<label class = "textRegular">'+ fixtimes(jsondeparts.substring(12,17))+ ' - '+ fixtimes(jsonarives.substring(12,17)) + '</label><br>');
                 $('#'+i+'').append('<label class = "textRegular">'+arrivalFinal[i]+' to ' + '</label>');
                 $('#'+i+'').append('<label class = "textRegular">'+destinationsFinal[i]+'</label><br>');
                 $('#'+i+'').append('<label class = "textRegular">'+airlines[i]+'</label><br>');
                 $('#'+i+'').append('<label class = "textRegular">'+planes[i]+'</label>');
                $('#'+i+'').append('<button type="button" id ="'+i+' button" value = "'+i+'">Select</button>');
                 body.append('<br>');
                 $('#'+i+' button').click(function(){
                   if($(this).attr('type')=='button'){
                    var id = $(this).attr('value');
                    body.empty();
                       let can = document.createElement("canvas");
                       can.id="can";
                       
                    body.append('<form id = "form">');
                    $('form').append('First Name: <br>')
                    $('form').append('  <input type="text" id = "fntxt" name="firstname"><br>');
                    $('form').append('Last Name: <br>')
                    $('form').append('  <input type="text" id = "lntxt" name="lastname"><br>');
                    
                    $('form').append('Email: <br>')
                    $('form').append('  <input type="text" name="email"><br>');
                    $('form').append('Age: <br>')
                    $('form').append('  <input type="text" id = "agetxt" name="age"><br>');
                    $('form').append('Gender: <br>')
                    $('form').append('  <input type="text" id = "gendertxt" name="gender"><br>');
                    $('form').append('<button id = "SubmitId">Submit</button>');
                   body.append('<br>');
                   finalTime = timings[id];
                   $('#SubmitId').click(function(){
                     $.ajax({
                           url: 'http://comp426.cs.unc.edu:3001/tickets',
                           type: 'POST',
                           data: {
                             "ticket": {
                                "first_name": $('#fntxt').val(),
                                "last_name": $('#lntxt').val(),
                                "age": $('#agetxt').val(),
                                "gender": $('#gendertxt').val(),
                             },
                           },
                           xhrFields: { withCredentials: true },
                         });
                  });
                  }
                 });
               }


               
               $('#clickMe').click(function(){
                 body.empty();

               });
    }

    else {
        alert("This flight does not exist");
    }

    });

});
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
function calendar(){
  var table = document.getElementById("calendar");
  var row = [];
  var cell = [];
  var date = new Date();
  var firstDay = new Date(2000, 1, 1);
  var counter = 1;
 
  for(var i = 0; i<7; i++){
    row[i] = table.insertRow(table.length);
  for(var j = 0; j<7; j++){
    if(counter>daysInThisMonth()){
      break;
    }
    cell[i] = new Array(7);
    cell[i][j] = row[i].insertCell();
    if(i == 0){
      if(j>=firstDay.getDay()-1){
        cell[i][j].innerHTML = counter;
        cell[i][j].setAttribute("value", counter);
        cell[i][j].addEventListener('click', function()
        {
         timings = [];
         date2 = (date.getFullYear()+'-'+date.getMonth()+'-' + this.innerHTML);
         flightdate = firstDay.getFullYear() + '-' + '0' + firstDay.getMonth() + '-' + '0' + this.innerHTML;
         //console.log(flightdate);
       });
        counter++;
      }
    }
    else{
      cell[i][j].innerHTML = counter;
      counter++;
      cell[i][j].setAttribute("value", i);
      cell[i][j].addEventListener('click', function()
      {
        timings = [];
        date2 = (date.getFullYear()+'-'+date.getMonth()+'-' + this.innerHTML);
        flightdate = firstDay.getFullYear() + '-' + '0' + firstDay.getMonth() + '-' + '0' + this.innerHTML;
        //console.log(flightdate);
     });
    }
  }

}


//console.log(timingsTotal + "is all of the timings");
}
function daysInThisMonth() {
var now = new Date();
return new Date(2000, 01, 0).getDate();
}
function myFunction() {
    document.getElementById("myDropdown").classList = true;
}
function myFunctionTwo() {
    document.getElementById("myDropdownTwo").classList.toggle("show");

}
function myFunctionThree() {
    document.getElementById("myDropdownThree").classList.toggle("show");
}
function aFunction(i){
  document.getElementById("myDropdownTwo").classList.toggle("show");
}




function updateTimings(){

  for(var i = 0; i<arrivalsId.length; i++){
  $.ajax('http://comp426.cs.unc.edu:3001/flights?filter[arrival_id]='+arrivalsId[i]+'',
    {
      type: 'GET',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      async:false,
      success: (response) => {
        //console.log(flightdate)

          for(var i = 0; i<response.length; i++){
              for(var k = 0; k<destinationsId.length; k++){
                  var year2 = JSON.stringify(response[i].departs_at).substring(1,11);
                    
                  if(response[i].departure_id == destinationsId[k] && flightdate == year2){
                  timings.push(response[i]);
                  console.log(timings)
                  }
                }
          }
        }
      });
    }
}


function filterFunction() {
  arrivalsId = [];
  $('.dropdown-content').css({display:"block"});
    let input = document.getElementById("myInput");
    if(input.value == ""){
      $('.dropdown-content').css({display:"none"});

    }
    let filter = input.value.toLowerCase();
    let div = document.getElementById("myDropdown");
    let a = div.getElementsByTagName("a");
    //a = (a) => a.filter((v,i) => a.indexOf(v) === i);
   
    for (var i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toLowerCase().indexOf(filter) > -1) {
                a[i].style.display = "";

        } else {
            a[i].style.display = "none";
        }
    }
}
function filterFunctionTwo() {
  destinationsId = [];
  $('.dropdown-contentTwo').css({display:"block"});
    let input = document.getElementById("myInputTwo");
    if(input.value == ""){
      $('.dropdown-contentTwo').css({display:"none"});

    }
    let filter = input.value.toLowerCase();
    let div = document.getElementById("myDropdownTwo");
    let a = div.getElementsByTagName("a");
    
    //console.log(a)
    for (var i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toLowerCase().indexOf(filter) > -1) {
                a[i].style.display = "";

        } else {
            a[i].style.display = "none";
        }
    }
}
function fixtimes (time) {
   var parts = time.split(':'),
        hour = parts[0],
        minutes = parts[1];

    if (hour > 12) {
       time = (hour - 12) + ':' + minutes + ' pm';
    } else if (hour == 0) {
        time = 12 + ':' + minutes + ' am';
    } else if (hour == 12) {
        time += ' pm';
    } else {
        time += ' am';
    }

    return time;

}
// var flightdate = "2019-01-04"
//  loadJSON(function(response) {
//   // Parse JSON string into object
//     jsonData = JSON.parse(response);
//     jsonAirlines = jsonData['airlines'];
//     jsonAirports = jsonData['airports'];
//     jsonFlights = jsonData['flights'];
//     jsonPlanes = jsonData['planes'];
//     jsonInstances = jsonData['instances'];
//  });
//  function onUpdateSlider(value) {
//     var hour = parseInt(value / 60);
//     var min = value % 60;
//     hour = hour < 10 ? "0" + hour : hour;
//     min = min < 10 ? "0" + min : min;
//     document.getElementById("time_show").innerHTML = hour + ":" + min;
// }
// function initMap() {

//     // The map, centered at Uluru
//     map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 2, center: {lat: 35.9130556, lng: -79.0561111}});

//     //create marker icon
//     planeIcon = new google.maps.MarkerImage(
//         "plane-icon.png", null, null, null, new google.maps.Size(25, 25) //plane icon size
//     );

//     markerArray = [];
//     jsonFlights.forEach(function result(value, index, ar) {

//         var flight = value;
//         var departure = getAirportFromID(flight.departure_id);
//         var arrival = getAirportFromID(flight.arrival_id);

//         var curPos = getCenter(Math.radians(parseFloat(departure.latitude)), Math.radians(parseFloat(departure.longitude)), Math.radians(parseFloat(arrival.latitude)), Math.radians(parseFloat(arrival.longitude)));

//         var marker = new google.maps.Marker({position: curPos, map: map, icon: planeIcon});

//         var infowindow;
//         marker.addListener('mouseover', function() {

//             var airline = getAirlineFromID(flight.airline_id);
//             contentString = "<div>Flight Number : " + flight.number + "</div>"
//                             + "<div>Airline : " + airline.name + "</div>"
//                             + "<div>Departure : " + departure.name + "</div>"
//                             + "<div>Arrival : " + arrival.name + "</div>";
//             infowindow = new google.maps.InfoWindow({
//                 content: contentString
//             });
//             infowindow.open(map, this);
//         });

//         // assuming you also want to hide the infowindow when user mouses-out
//         marker.addListener('mouseout', function() {
//             infowindow.close();
//         });
//         markerArray.push(marker);
//     });
// }
// function getAirlineFromID(id) {
//     for(var i = 0; i < jsonAirlines.length; i ++) {
//         var airline = jsonAirlines[i];
//         if(airline.id == id) {
//             return airline;
//         }
//     }
//     return "";
// }
// function getAirportFromID(id) {
//      for(var i = 0; i < jsonAirports.length; i ++) {
//         var airport = jsonAirports[i];
//         if(airport.id == id) {
//             return airport;
//         }
//     }
//     return "";
// }
// function getFlightFromID(id) {
//      for(var i = 0; i < jsonFlights.length; i ++) {
//         var flight = jsonFlights[i];
//         if(flight.id == id) {
//             return flight;
//         }
//     }
//     return "";
// }
// function getPlaneFromID(id) {
//      for(var i = 0; i < jsonPlanes.length; i ++) {
//         var plane = jsonPlanes[i];
//         if(plane.id == id) {
//             return plane;
//         }
//     }
//     return "";
// }
// function getInstancesFromID(id) {
//     var instances = [];
//      for(var i = 0; i < jsonInstances.length; i ++) {
//         var instance = jsonInstances[i];
//         if(instance.flight_id == id) {
//             instances.push(instance);
//         }
//     }
//     return "";
// }
// function onClickFilter() {
//   var year = document.getElementById('input_year').value;
//       var month = document.getElementById('input_month').value;
//       var day = document.getElementById('input_day').value;
//       if(year == "" || month == "" || day == "") {
//           initMap();
//           return;
//       }
//       var time = document.getElementById('time_show').innerHTML;
//       var date = year + "-" + month + "-" + day;
//       filterPlanesbyTime(date, time);}
// function filterPlanesbyTime(date, time) {
//     //remove all markers from map
//     for(var i = 0; i< markerArray.length; i ++)
//         markerArray[i].setMap(null);
//     markerArray = [];

//     var filterDate = new Date(date + " " + time);
//     jsonInstances.forEach(function result(value, index, ar) {

//         var instance = value;
//         if(instance.is_cancelled == false) {

//             var flight = getFlightFromID(instance.flight_id);
//             var departure = getAirportFromID(flight.departure_id);
//             var arrival = getAirportFromID(flight.arrival_id);

//            var departureDate = new Date(instance.date + " " + flight.departs_at);
//            console.log(instance.date);
//            var arrivalDate = new Date(instance.date + " " + flight.arrives_at);
//             // if(departureDate > arrivalDate) {
//             //    arrivalDate.setDate(arrivalDate.getDate() + 1);
//             // }
//             if(departure.id == sourceID && instance.date == flightdate) {

//                 var curPos = getCenter(Math.radians(parseFloat(arrival.latitude)), Math.radians(parseFloat(arrival.longitude)), Math.radians(parseFloat(arrival.latitude)), Math.radians(parseFloat(arrival.longitude)));

//                 var marker = new google.maps.Marker({position: curPos, map: map, icon: planeIcon});
//                 var infowindow;
//                 marker.addListener('mouseover', function() {
//                     var airline = getAirlineFromID(flight.airline_id);
//                     contentString = "<div>Flight Number : " + flight.number + "</div>"
//                                     + "<div>Airline : " + airline.name + "</div>"
//                                     + "<div>Departure : " + departure.name + "</div>"
//                                     + "<div>Arrival : " + arrival.name + "</div>";
//                     infowindow = new google.maps.InfoWindow({
//                         content: contentString
//                     });
//                     infowindow.open(map, this);
//                 });

//                 // assuming you also want to hide the infowindow when user mouses-out
//                 marker.addListener('mouseout', function() {
//                     infowindow.close();
//                 });
//                 markerArray.push(marker);
//            }
//         }
//     });
// }

// function getCenter(lat1, lon1, lat2, lon2) {
//     var Bx = Math.cos(lat2) * Math.cos(lon2-lon1);
//     var By = Math.cos(lat2) * Math.sin(lon2-lon1);
//     var latMid = Math.atan2(Math.sin(lat1) + Math.sin(lat2),
//                         Math.sqrt( (Math.cos(lat1)+Bx)*(Math.cos(lat1)+Bx) + By*By ) );
//     var lonMid = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);
//     return new google.maps.LatLng({lat: Math.degrees(latMid), lng: Math.degrees(lonMid)});
// }

// // Converts from degrees to radians.
// Math.radians = function(degrees) {
//   return degrees * Math.PI / 180;
// };

// // Converts from radians to degrees.
// Math.degrees = function(radians) {
//   return radians * 180 / Math.PI;
// };