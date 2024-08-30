// Script File

// Home Section Starts
var menuBtn = document.querySelector('.main-navbar .menu-btn');
var menuList = document.querySelector('.main-navbar .nav-list');
var menuListItems = document.querySelectorAll('.nav-list li a');


// For LOGIN
var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
var a = document.getElementById("log");
var b = document.getElementById("reg");
var w = document.getElementById("other");

function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
  w.style.visibility = "hidden";
  b.style.color = "#fff";
  a.style.color = "#000";
}

function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0px";
  w.style.visibility = "visible";
  a.style.color = "#fff";
  b.style.color = "#000";
}
  
// CheckBox Function
function goFurther(){
  if (document.getElementById("chkAgree").checked == true) {
    document.getElementById('btnSubmit').style = 'background: linear-gradient(to right, #FA4B37, #DF2771);';
  }
  else{
    document.getElementById('btnSubmit').style = 'background: lightgray;';
  }
}

function google() {
  	window.location.assign("https://accounts.google.com/signin/v2/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue&csig=AF-SEnbZHbi77CbAiuHE%3A1585466693&flowName=GlifWebSignIn&flowEntry=AddSession", "_blank");
}
// login end

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menuList.classList.toggle('active');
});

for(var i = 0; i < menuListItems.length; i++){
	menuListItems[i].addEventListener('click', menuItemClicked);
}
function menuItemClicked(){
	menuBtn.classList.remove('active');
	menuList.classList.remove('active');
}

var homeSection = document.querySelector('.home');
window.addEventListener('scroll', pageScrollFunction);
window.addEventListener('load', pageScrollFunction);

function pageScrollFunction(){
	if(window.scrollY > 120){
		homeSection.classList.add('active');
	}
	else{
		homeSection.classList.remove('active');
	}
}
// Home Section Ends

// Partners Section Starts 
$('.partners-slider').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left'></i>",
             "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        500:{
            items:2
        },
        700:{
            items:3
        },
        1000:{
        	items:5
        }
    }
})
// Partners Section Ends 

// Testimonials Section Starts
$('.testimonials-slider').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:6000,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left'></i>",
             "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        }
    }
})
// Testimonials Section Ends



$(document).ready(function(){
  $(".banner").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 2000, // Slide change interval in milliseconds
      autoplayHoverPause: true,
      dots: true, // Show navigation dots
      nav: false // Hide navigation arrows
  });
});

// Handle GET Request for Login Page
$(document).ready(function() {
  $('.submit-btn').on('click', function(event) {
    event.preventDefault();
    
    $.ajax({
      url: 'login.html', // Ensure the correct path
      type: 'GET',
      success: function(response) {
        alert('Login page loaded successfully!');
        console.log(response);
      },
      error: function(xhr) {
        alert('Failed to load login page.');
      }
    });
  });
});

// Handle GET Request for Signup Page
$(document).ready(function() {
  $('#btnSubmit').on('click', function(event) {
    event.preventDefault();
    
    $.ajax({
      url: 'signup.html', // Use the correct path
      type: 'GET',
      success: function(response) {
        alert('Signup page loaded successfully!');
        console.log(response);
      },
      error: function(xhr) {
        alert('Failed to load signup page.');
      }
    });
  });
});

// Handle Login Form Submission
$(document).ready(function() {
  $('.input-group').on('submit', function(event) {
    event.preventDefault();
    
    const username = $('#username').val();
    const password = $('#password').val();
    
    $.ajax({
      url: 'http://localhost:3000/login', // Server-side route, not an HTML file
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function(response) {
        if (response.message) {
          alert('Login successful!');
          window.location.href = '/index.html';
        } else {
          alert(response.message);
        }
      },
      error: function(xhr) {
        alert('Login failed. Please check your credentials.');
      }
    });
  });
});

// Handle Signup Form Submission
$(document).ready(function() {
  $('.input-group1').on('submit', function(event) {
    event.preventDefault();
    
    const username = $('#username').val();
    const password = $('#password').val();
    
    $.ajax({
      url: 'http://localhost:3000/signup', // Server-side route, not an HTML file
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function(response) {
        if (response.message) {
          alert('Signup successful!');
          window.location.href = '/index.html';
        } else {
          alert(response.message);
        }
      },
      error: function(xhr) {
        alert('Signup failed. Please check your credentials.');
      }
    });
  });
});


