$(document).ready(function(){

	// Movies 

	var movies = ["http://www.omdbapi.com/?t=frozen&y=&plot=short&r=json",
				"http://www.omdbapi.com/?t=Gladiator&y=&plot=short&r=json",
				"http://www.omdbapi.com/?t=ride+along&y=&plot=short&r=json",
				 "http://www.omdbapi.com/?t=Chaos+theory&y=&plot=short&r=json"]

	var series = ["http://www.omdbapi.com/?t=house+of+cards&y=&plot=short&r=json",
					"http://www.omdbapi.com/?t=simpsons&y=&plot=short&r=json",
					"http://www.omdbapi.com/?t=scrubs&y=&plot=short&r=json",
					"http://www.omdbapi.com/?t=friends&y=&plot=short&r=json"
					]			 

	


    // Function to show items in the gallery
    function displayMovie(response) {
    	var image = response.Poster;   
    	var html = "<img src='" + image + "'>";
    	$("main").append(html);
    	 } // End of displayMovie


    // Function to show items in the gallery
    function displayShow(response) {
    	var image = response.Poster;   
    	var html = "<img src='" + image + "'>";
    	$("main").append(html);
    	 } // End of displayShow



    $(movies).each(function() {
    	$.getJSON(this, displayMovie);
    }); // End of each
    
    $(series).each(function() {
    	$.getJSON(this, displayShow);
    });

    }); // document ready 