// <!-- JS Script -->

$(document).ready(function() {
    // -----------------------------------------------------------------------------------
    // function calls api and displays relevent gifs when an emotion button is clicked
    
    function moreGifs(emotion, limit, addToLimit) {
        $("#showMore").on("click", function() {
            let newLimit = limit + addToLimit;
            console.log(newLimit);
            findGifs(emotion, newLimit);
        });
    }

    function findGifs(emotion, limit) {
        // empty div #gifHolder and #moreGifsButtonHolder
        $("#gifHolder").html("");
        $("#moreGifsButtonHolder").html("");
        // call gifhy api
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=dc6zaTOxFJmzC" + "&limit=" + limit;
        // retreive data from api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // return items from data array
            for (j=0; j<limit; j++) {
                var itemRating = response.data[j].rating;
                var itemTitle = response.data[j].title;
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
                card.attr("class", "card");
                    // create div tp store gifTitle
                    var cardTitle = $("<div>");
                    cardTitle.append(itemTitle);
                    cardTitle.attr("class", "card-header bg-white text-center text-capitalize")
                    // create div to hold cardBody
                    var cardBody = $("<div>");
                    cardBody.attr("class", "card-footer bg-white d-flex justify-content-between");
                        // create div to store gifInfo
                        var gifInfo = $("<div>");
                        gifInfo.attr("class", "p-1 text-capitalize");
                        gifInfo.append("Rated " + itemRating);
                        // create div to store saveButton
                        var saveButton = $("<button>");
                        saveButton.attr("class", "save p-2 btn btn-secondary");
                        saveButton.attr("id", j);
                    cardBody.append(gifInfo);
                    cardBody.append(saveButton.text("Save"));
                card.append(cardTitle);
                card.append(itemGif);
                card.append(cardBody);
                
                // display gifs to html
                $("#gifHolder").append(card);

            };

            // create button to display more gifs
            var moreGifsButton = $("<button>");
            moreGifsButton.attr("class", "btn btn-success btn-block");
            moreGifsButton.attr("id", "showMore");
            moreGifsButton.text("Show More");
            $("#moreGifsButtonHolder").append(moreGifsButton);

            // display more gifs when Show More button clicked
            var addToLimit = 10;
            console.log("search for " + limit + "+" + addToLimit + emotion + " gifs")
            moreGifs(emotion, limit, addToLimit)

                    
            // toggle between animate and unanimate when gif clicked
            $(".gif").on("click", function() {
                var state = $(this).attr("state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("url-animate"));
                    $(this).attr("state", "animate");
                }else if (state === "animate") {
                    $(this).attr("src", $(this).attr("url-still"));
                    $(this).attr("state", "still");
                };
            });
                    
            // save gif to favorites array when save button clicked (work in progress)
            $(".save").on("click", function() {
                var gifj = $(this).attr("id");
                var savedGifUrl = $("#gif" + gifj).attr("url-animate");
                console.log(savedGifUrl);
                favArray.push(savedGifUrl);
                console.log(favArray);
                // empty favoritesHolder before repopulating
                $("#favoritesHolder").html("");
                for (k=0; k<favArray.length; k++) {
                    var savedGifItem = $("<img>");
                    savedGifItem.attr("src", favArray[k]);
                    savedGifItem.attr("class", "card-img-top gif");
                    savedGifItem.attr("id", "favGif" + k);
                    $("#favoritesHolder").prepend(savedGifItem);
                };
            });
            
                    
        });
    }
            
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
    // create aray to hold favorited items
    var favArray=[];

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
        
        $(".gifButton").on("click", function() {
            var emotion = $(this).attr("data-value");
            var limit = 10;

            findGifs(emotion, limit);
        });

    });

    $(".gifButton").on("click", function() {
        var emotion = $(this).attr("data-value");
        var limit = 10;

        findGifs(emotion, limit);    
    });
});
