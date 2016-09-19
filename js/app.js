$(document).ready(function(){

	// Movies 

	var movies = ["http://www.omdbapi.com/?t=frozen&y=&plot=short&r=json",
				"http://www.omdbapi.com/?t=Gladiator&y=&plot=short&r=json",
				"http://www.omdbapi.com/?t=ride+along&y=&plot=short&r=json",
				 "http://www.omdbapi.com/?t=Chaos+theory&y=&plot=short&r=json"]

    // Series/shows
	var series = ["http://www.omdbapi.com/?t=house+of+cards&y=&plot=short&r=json",
					"http://www.omdbapi.com/?t=simpsons&y=&plot=short&r=json",
					"http://www.omdbapi.com/?t=gilmore+girls&y=&plot=short&r=json",
					"http://www.omdbapi.com/?t=how+i+met+your&y=&plot=short&r=json"
					]			 

    // Flickr images
	var flickrImage = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?" 
    var flickrOptions = {
        tags: "landscape",
        format: "json" 
    }

    // Function to show items in the gallery
    function displayMovie(response) {
    	var image = response.Poster;   
    	var html = "<figure class='movies'>" + "<a href='" + image + "'" + " class='swipebox'>" + "<img src='" + image + "'>" + "</a></figure>";
    	$("main").append(html);
    	 } // End of displayMovie


    // Function to show items in the gallery
    function displayShow(response) {
    	var image = response.Poster;   
    	var html = "<figure class='show'>" + "<img src='" + image + "'>" + "</figure>";
    	$("main").append(html);
    	 } // End of displayShow


    //Function to show items in the gallery
    function displayImage(response){
        
        $.each(response.items, function( i, flickrItem){
            var image = flickrItem.media.m;
            var html = "<figure class='flickr'>" + "<img src='";
             html += image + "'>" + "</figure>";
             $("main").append(html);
             if( i === 1){
                return false;
             }
        });

    } // end of displayImage



         // Adding movies, flickr-images and shows to the page

    $(movies).each(function() {
    	$.getJSON(this, displayMovie);
    }); // End of each
    
    $(series).each(function() {
    	$.getJSON(this, displayShow);
    });

    $.getJSON(flickrImage, flickrOptions, displayImage );





    // Sort gallery based on sort-box
    $("select").on("change", function(){
        if($("#sort").val() === "movies") {
            $(".show").hide("slow");
            $(".flickr").hide("slow");
            $(".movie").show("fast");
        } else if($("#sort").val() === "shows") {
            $(".show").show("fast");
            $(".flickr").hide("slow");
            $(".movies").hide("slow");
        } else if( $("#sort").val() === "landscape") {
            $(".flickr").show("fast");
            $(".show").hide("slow");
            $(".movies").hide("slow");
        } else {
            $("figure").show("fast");
        }
    }); // end of sort







    }); // document ready 