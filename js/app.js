$(document).ready(function(){
   var imageInformation;
	// Movies 

	var movies = ["http://www.omdbapi.com/?t=frozen&y=&plot=short&r=json",
				"http://www.omdbapi.com/?t=Gladiator&y=&plot=short&r=json",
				"http://www.omdbapi.com/?t=ride+along&y=&plot=short&r=json",
				 "http://www.omdbapi.com/?t=Chaos+theory&y=&plot=short&r=json"];

    // Series/shows
	var series = ["http://www.omdbapi.com/?t=house+of+cards&y=&plot=short&r=json",
					"http://www.omdbapi.com/?t=simpsons&y=&plot=short&r=json",
					"http://www.omdbapi.com/?t=gilmore+girls&y=&plot=short&r=json",
					"http://www.omdbapi.com/?t=how+i+met+your&y=&plot=short&r=json"
					];		 

    // Flickr images
	var flickrImage = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var flickrOptions = {
        tags: "landscape",
        format: "json" 
    };

    // Function to show items in the gallery
    function displayMovie(response) {
    	var image = response.Poster; 
        var plot = response.Plot;  
        var title = response.Title;
    	var html = "<figure class='movies'>" + "<img src='" + image + "' title='" + title + "'><figcaption>" + plot + "</figcaption>" + "</figure>";
    	$("main").append(html);
    	 } // End of displayMovie


    // Function to show items in the gallery
    function displayShow(response) {
    	var image = response.Poster;  
        var plot = response.Plot;  
        var title = response.Title; 
    	var html = "<figure class='show'>" + "<img src='" + image + "' title='" + title + "'><figcaption>" + plot + "</figcaption>" + "</figure>";
    	$("main").append(html);
    	 } // End of displayShow


    //Function to show items in the gallery
    function displayImage(response){
        
        $.each(response.items, function( i, flickrItem){
            var image = flickrItem.media.m;
            var title = flickrItem.title;
            var date = flickrItem.date_taken;
            var html = "<figure class='flickr'>" + "<img src='" + image + "' title='" + title + "'><figcaption>" + date + "</figcaption></figure>";
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
            $(".flickr").show('fast');
            $(".show").hide("slow");
            $(".movies").hide("slow");
        } else {
            $("figure").show("fast");
        }
    }); // end of sort

 
// photoswipe

// Function for the fetching of images for the lightbox

function fetchImages(category) {
    $('main').on('mouseenter', function(){
                imageInformation = [];
            $(category).each( function(){
                var gallery = $(this);

                getImageInformation = function() {

                    gallery.find("img").each(function(){
                        var imageSRC = $(this).attr("src");
                        var imageSize = 95000;
                        var imageWidth = 300;
                        var imageHeight = 350;
                        var figcapt = $(this).siblings("figcaption").text();
                        var name = $(this).attr("title");




                        var item = {
                            src : imageSRC,
                            w   : imageWidth,
                            h   : imageHeight,
                            title: figcapt,
                            author: name

                        };

                        imageInformation.push(item);

                    }); 
                    return imageInformation;
                };
                imageInformation = getImageInformation();
            });

            }); 
}

fetchImages("main");

$(document).on("change", function(){

             if($("#sort").val() === "movies") {
                 fetchImages(".movies");             
        } else if($("#sort").val() === "shows") {  
                fetchImages(".show");    
        } else if( $("#sort").val() === "landscape") {         
                   fetchImages(".flickr");
        } else {
            fetchImages("main");
        }

});


// bind click event to figure for lightbox

    var pswp =  $('.pswp')[0];
    $('main').on("click", "figure", function(){
        
        // Options

        var clickedItem = $(this).index();

        var options = {
            index: clickedItem,
            addCaptionHTMLFn: function(item, captionEl, isFake) {
                if(!item.title) {
                    captionEl.children[0].innerHTML = '';
                    return false;
                }

                captionEl.children[0].innerHTML = "<strong>" + item.author + "</strong><br>" + item.title;
                return true;
            } // end of function
    }; // end of options

        // start lightbox 

        var lightbox = new PhotoSwipe(pswp,PhotoSwipeUI_Default, imageInformation, options );
        lightbox.init();
    }); // end of photoswipe




    }); // document ready 





