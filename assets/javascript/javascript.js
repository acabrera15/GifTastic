let topics = [
  "music",
  "Black Sabbath",
  "Blue Oyster Cult",
  "Led Zeppelin",
  "slipknot",
  "Metallica"
];

$(document).ready(function() {
  createButtonsFromArray(topics);
});

/*
  function takes in an array and from that array, creates buttons to display on the
  display
*/
var createButtonsFromArray = function(arr) {
  $("#buttonHolder").empty();
  var rowCreaterIndex = 0;
  var buttonHolder = $('<div class="mt-4" id="buttonHolder"></div>');
  $(".container").prepend(buttonHolder);
  for (var i = 0; i < arr.length; i++) {
    if (i === 0 || i % 12 === 0) {
      buttonHolder.prepend(`<div class='row' id= 'row-${i}'></div>`);
      $(`#row-${i}`).append(
        `<div class='col'><button type='button' class='mb-4 gifButton btn btn-primary'>${
          arr[i]
        }</button></div>`
      );
      rowCreaterIndex = i;
    } else {
      $(`#row-${rowCreaterIndex}`).append(
        `<div class='col'><button type='button' class=' mb-4 gifButton btn btn-primary'>${
          arr[i]
        }</button></div>`
      );
    }
  }
};

var queriesTheInputAndDisplaysGifsToDisplay = function(stringToQuery) {
  var APIKEY = "mnC6R0UR5Gi6CHuOXic2w54GdnD5T0Qi";
  var gifArray = [];
  $(".cardRows").remove();

  axios({
    url: `https://api.giphy.com/v1/gifs/search?q=${stringToQuery}&api_key=${APIKEY}&limit=6`,
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
      gifArray = response.data.data;
      var newRow;
      var newCardDeck;

      for (var i = 0; i < gifArray.length; i++) {
        if (i === 0 || i % 3 === 0) {
          if (i % 3 === 0 && i !== 0) {
            newRow.append(newCardDeck);
            $("#gifAndSearch").append(newRow);
            console.log("mega if");
          }
          newRow = $("<div class='row cardRows'></div>");
          newCardDeck = $("<div class='card-deck'></div>");
          console.log("if");
          newCardDeck.append(
            `<div class='card'><div class='card-body'><h5 class='card-title'>Rating: ${
              gifArray[i].rating
            }</h5><img class= "card-img-top" animated='false' gifyId="${
              gifArray[i].id
            }" src="${
              gifArray[i].images["480w_still"].url
            }" height="268px" width="246px" ></div></div>`
          );
        } else {
          console.log("else");
          newCardDeck.append(
            `<div class='card'><div class='card-body'><h5 class='card-title'>Rating: ${
              gifArray[i].rating
            }</h5><img class="card-img-top" animated='false' gifyId="${
              gifArray[i].id
            }" src="${
              gifArray[i].images["480w_still"].url
            }" height="268px" width="246px"></div></div>`
          );
        }
      }
      newRow.append(newCardDeck);

      $("#gifAndSearch").append(newRow);
    })
    .catch(function(err) {
      console.log(err);
    });
};

$(document.body).on("click", "img", function(e) {
  var APIKEY = "mnC6R0UR5Gi6CHuOXic2w54GdnD5T0Qi";
  var gifyId = $(this).attr("gifyid");
  axios({
    url: `https://api.giphy.com/v1/gifs/${gifyId}?api_key=${APIKEY}`,
    method: "GET"
  }).then(function(response) {
    if ($(e.currentTarget).attr("animated") === "false") {
      $(e.currentTarget).attr(
        "src",
        `${response.data.data.images.original.url}`
      );
      $(e.currentTarget).attr("animated", "true");
    } else if ($(e.currentTarget).attr("animated") === "true") {
      $(e.currentTarget).attr(
        "src",
        `${response.data.data.images["480w_still"].url}`
      );
      $(e.currentTarget).attr("animated", "false");
    }
  });
});

$(document.body).on("click", ".gifButton", function() {
  console.log($(this).text())
  queriesTheInputAndDisplaysGifsToDisplay($(this).text())
});

$("#submitButton").on("click", function() {
  var inputString = $("#inputString").val().trim();
  var array2 =  topics.map(function(x){ return x.toUpperCase() }) 
  if (!array2.includes(inputString.toUpperCase())) {
    topics.push(inputString);
    createButtonsFromArray(topics);
  }
  $("#inputString").val('');

});

$("#inputString").keyup(function(event) {
  if (event.originalEvent.keyCode === 13) {
    $('#submitButton').click();
  }
})