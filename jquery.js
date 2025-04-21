"use strict";

// Run once the page is completely loaded and is ready
$(document).ready(() => {
    // When the user hovers over the group picture, make it larger and rotate it slightly
    $("#group-pic").on("mouseover", () => {
        $("#group-pic").css("transform", "scale(1.1) rotate(5deg)");
        $("#group-pic").css("transition", "transform 0.5s");
    });

    // When the user moves the mouse out of the group picture, make it smaller and rotate it back to normal
    $("#group-pic").on("mouseout", () => {
        $("#group-pic").css("transform", "scale(1) rotate(0deg)");
    });

    // Checks when the user clicks on the mission statement
    $("#mission").on("click", () => {
        // If the mission statement has not been clicked yet, then change the text and make it animate in
        if ($("#mission").text() != "The Software Development Club is a space for Software Engineers and others to learn, collaborate, and deploy meaningful software projects in an industry-like environment.") {
            // Text replacement
            $("#mission").text("The Software Development Club is a space for Software Engineers and others to learn, collaborate, and deploy meaningful software projects in an industry-like environment.");
            
            // Animation
            $("#mission").animate({
                fontSize: "2em",
                opacity: 0.5
            }, 1000, () => {
                $("#mission").animate({
                    fontSize: "1em",
                    opacity: 1
                }, 1000);
            });
        }
        console.log("Mission statement clicked!");
    });

    // Checks when the user hovers over the mission statement
    $("#mission").on("mouseover", () => {
        // If the mission statement has not been clicked yet, then change the text color to blue and underline it
        // Otherwise, do not change the text color or underline it
        if ($("#mission").text() != "The Software Development Club is a space for Software Engineers and others to learn, collaborate, and deploy meaningful software projects in an industry-like environment.") {
            $("#mission").css("color", "blue");
            $("#mission").css("cursor", "pointer");
            $("#mission").css("text-decoration", "underline");   
        }
        else {
            $("#mission").css("cursor", "default");
        }
    });

    // Resets the mission statement when the user moves the mouse out of the mission statement
    $("#mission").on("mouseout", () => {
        $("#mission").css("color", "black");
        $("#mission").css("text-decoration", "none");
    });

    // Predictive Search Results
    var data = ["Software Development", "Software Engineering", "Web Development", "Mobile Development", "Game Development"];
    
    // Whenever the user inputs something into the search bar, filter the data and display the results
    $("#search").on("input", function() {
        var query = $(this).val().toLowerCase();
        $("#search-results").empty();
        
        if (query) {
            var results = data.filter(function(item) {
                return item.toLowerCase().includes(query);
            });
            
            results.forEach(function(item) {
                $("#search-results").append("<div>" + item + "</div>");
            });
        }
    });
});