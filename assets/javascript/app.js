// <!-- JS Script -->

$(document).ready(function() {
    // -----------------------------------------------------------------------------------
    // function calls api and displays relevent gifs when an emotion button is clicked
    function findGifs() {
        $(".gifButton").on("click", function() {
            // empty div #gifHolder
            $("#gifHolder").html("");

            // call gifhy api
            var emotion = $(this).attr("data-value");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            emotion + "&api_key=dc6zaTOxFJmzC" + "&limit=10";
            
            // retreive data from api
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                // return 10 items from data array
                for (j=0; j<10; j++) {
                    var itemRating = response.data[j].rating;
                    var itemGif = $("<img>");
                    itemGif.attr("src", response.data[j].images.fixed_height_still.url);
                    itemGif.attr("url-still", response.data[j].images.fixed_height_still.url);
                    itemGif.attr("url-animate", response.data[j].images.fixed_height.url);                            
                    itemGif.attr("state", "still");
                    itemGif.attr("class", "card-img-top gif");
                    itemGif.attr("id", "gif" + j);
                    
                    // bootstrap layout: 
                    // create div to hold card
                    var card = $("<div>");
                    card.attr("class", "card inline-block");
                        // create div to hold cardBody
                        var cardBody = $("<div>");
                        cardBody.attr("class", "card-footer bg-white d-flex justify-content-between");
                            // create div to store gifInfo
                            var gifInfo = $("<div>");
                            gifInfo.attr("class", "p-1");
                            gifInfo.append("Rating: " + itemRating);
                            // create div to store saveButton
                            var saveButton = $("<button>");
                            saveButton.attr("class", "save p-2 btn btn-secondary");
                            saveButton.attr("id", j);
                        cardBody.append(gifInfo);
                        cardBody.append(saveButton.text("Save"));
                    card.append(itemGif);
                    card.append(cardBody);
                   
                    // display to html
                    $("#gifHolder").prepend(card);
        
                };

                // toggle between animate and unanimate when gif clicked
                $(".gif").on("click", function() {
                    var state = $(this).attr("state");
                    if (state === "still") {
                        console.log(state);
                        $(this).attr("src", $(this).attr("url-animate"));
                        $(this).attr("state", "animate");
                    }else if (state === "animate") {
                        console.log(state);
                        $(this).attr("src", $(this).attr("url-still"));
                        $(this).attr("state", "still");
                    };
                });

                // save gif to favorites array when save button clicked (work in progress)
                $(".save").on("click", function() {
                    var gifj = $(this).attr("id");
                    var savedGifUrl = $("#gif" + gifj).attr("url-animate");

                    var savedGifItem = $("<img>");
                    savedGifItem.attr("src", savedGifUrl)
                    $("#favoritesHolder").prepend(savedGifItem);
                });
                
            });
            
        });
        
    };
    
    // ------------------------------------------------------------------------------------
    // create array to hold emotions
    emotionArray = [
        "Joy",
        "Trust",
        "Fear",
        "Surprise",
        "Sadness",
        "Disgust",
        "Anger",
        "Anticipation",
        "Love",
        "Disappointment",
        "Envy",
        "Boredom",
        "Confusion",
        "Awe"];
    
    // create emotion buttons dynamically
    for (i=0; i<emotionArray.length; i++) {
        var gifButton = $("<button>");
        $("#buttonHolder").append(gifButton.text(emotionArray[i]));
        gifButton.attr("class", "gifButton btn btn-success");
        gifButton.attr("data-value", emotionArray[i]);
    };
        
    // add new emotion button
    $("#submitButton").on("click", function(event) {
        event.preventDefault();
        var inputText = $("#newEmotion").val();
        emotionArray.push(inputText);
        var newGifButton = $("<button>");
        $("#buttonHolder").append(newGifButton.text(inputText));
        newGifButton.attr("class", "gifButton btn btn-success");
        newGifButton.attr("id", "test");
        newGifButton.attr("data-value", inputText);
        
        findGifs();
    });

    findGifs();

});
