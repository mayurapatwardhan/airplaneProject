var root_url = "http://comp426.cs.unc.edu:3001/";

$(document).ready(() => {
    var user = $('<input/>').attr({
    type: 'text',
    value: '',
    id: 'login_user',
    style: 'position:fixed; top:250px;left:650px; zindex:2; height:20px; width: 250px'
});
    var password = $('<input/>').attr({
    type: 'text',
    value: '',
    id: 'login_pass',
    style: 'position:fixed; top:300px;left:650px; zindex:2;height:20px; width: 250px'
});
    
    var log_btn = $('<input/>').attr({
    type: 'button',
    value: 'Login',
    id: 'login_btn',
    style: 'position:fixed; top:350px;left:650px; zindex:2; height:30px; font-size:15px; border:1px solid black; border-radius:5px; background:none'
});
    
    var sign = $('<input/>').attr({
    type: 'button',
    value: "Don't have an account? Register here",
    id: 'signup',
    style: 'position:fixed; top:450px;left:640px; zindex:2; height:30px; font-size:15px; border:none; background:none; text-decoration:underline'
});
    var user_text=document.createElement("div");
    user_text.innerHTML="Username:";
    user_text.style.position = "fixed";
    user_text.style.top = "250px";
    user_text.style.left = "555px";
    user_text.style.fontSize="20px";
    
    var pass_text=document.createElement("div");
    pass_text.innerHTML="Password:";
    pass_text.style.position = "fixed";
    pass_text.style.top = "305px";
    pass_text.style.left = "555px";
    pass_text.style.fontSize="20px";
    
    $('body').append(user);
    $('body').append(user_text);
    $('body').append(password);
    $('body').append(pass_text);
    $('body').append(log_btn);
    $('body').append(sign);

    var l = document.getElementById('login_btn');
 
    $('#login_btn').on('click', () => {
	let u = $('#login_user').val();
	let p = $('#login_pass').val();
        
	console.log(u);
	console.log(p);
        
	 if(l.value=="Sign-up"){
         if(p.length<6){
            alert("Password must be at least 6 characters");
            return;
        }
         	$.ajax(root_url + 'users',
            {   type: 'POST', 
                xhrFields: {withCredentials: true}, 
                data: { "user": {
                		"username": u, 
                		"password": p
			}
                },
                success: (response) => {
                    l.value="Login";
                    var us = document.getElementById('login_user');
                    us.value=" ";
                    var pas = document.getElementById('login_pass');
                    pas.value=" ";
                    var c = document.getElementById('myCanvas');
                    c.style.backgroundColor="transparent"; 
                },
            });
         
     }else{
         $.ajax(root_url + 'sessions',
            {   type: 'POST', 
                xhrFields: {withCredentials: true}, 
                data: { "user": {
                		"username": u, 
                		"password": p
			}
                },
                success: (response) => {
                    console.log("logged in!");
                    build_home_page();
                },
             error: (XMLHttpRequest, textStatus, errorThrown)=> {
                 alert("Username/Password is incorrect")
             },
            });
     }
	
    });
    
    $('#signup').on('click', () => {
        console.log('entered here');
        l.value="Sign-up";
        var c = document.getElementById('myCanvas');
        c.style.backgroundColor="#521d9b";
    });
    
    
});
//http://clipart-library.com/clipart/n1245201.htm   
//https://www.vectorstock.com/royalty-free-vector/airplane-flight-paths-over-earth-globe-vector-1783030

var build_home_page = function () {
    
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
    
};



