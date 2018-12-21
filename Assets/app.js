
   
var animal = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=UXbgDnRIVTHvxfPvK3sDPZRjEjjEUvqc&limit=5";
var animals = ["Cat", "Dog", "Pig", "Cow", "Lion", "Sloth", "Zebra", "Snake", "Horse", "Bear"];

//Rung the function to create the buttons from the aray on page load
renderButtons();


//listen event to add animals to the array and create and dynamically create a button for it.
$("#add-animal").on("click", function(event) // This function handles events where one button is clicked
{ 
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButtons();
});


//Function that builds the buttons fromt animals array variable
function renderButtons() 
{
    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++)
    {
        var a = $("<button>");
        a.addClass("animal");  
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }


    //ajax call to load the gifs and ratings
    $("button").on("click", function()
    {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) 
        {
            var results = response.data;

            for (var i = 0; i < results.length; i++) 
            {
                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.addClass("gif");

                //function to toggle gifs from still to animate and vice versa.
                (function (index, animalImage)
                {
                    var isStill = true;
                    $(animalDiv).on("click", function() 
                    {
                        if (isStill)
                        {
                            animalImage.attr("src", results[index].images.fixed_height.url);
                        }
                        else
                        {
                            animalImage.attr("src", results[index].images.fixed_height_still.url);  
                        }
                        isStill = !isStill;
                    });
                })(i, animalImage)

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#animal-view").prepend(animalDiv);

            }

        });
    });

}

