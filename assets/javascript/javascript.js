/*
  inital topics
*/
let topics = [
  "music",
  "Black Sabbath",
  "Blue Oyster Cult",
  "Led Zeppelin",
  "slipknot",
  "Metallica"
];

/*
  creates buttons from array when the document is ready
*/
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
        `<div class='col'><button type='button' class='h-75 w-100 mb-4 gifButton btn btn-primary'>${
          arr[i]
        }</button></div>`
      );
      rowCreaterIndex = i;
    } else {
      $(`#row-${rowCreaterIndex}`).append(
        `<div class='col'><button type='button' class=' h-75 w-100 mb-4 gifButton btn btn-primary'>${
          arr[i]
        }</button></div>`
      );
    }
  }
};

/*
function takes in a string and creates a query using axios to gify and
will output the returned gifs to the display
*/
var queriesTheInputAndDisplaysGifsToDisplay = function(stringToQuery) {
  var APIKEY = "mnC6R0UR5Gi6CHuOXic2w54GdnD5T0Qi";
  var gifArray = [];
  $(".cardRows").remove();

  axios({
    url: `https://api.giphy.com/v1/gifs/search?q=${stringToQuery}&api_key=${APIKEY}&limit=10&tag=rock`,
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
          newCardDeck = $("<div class='mb-4 card-deck'></div>");
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

/*
when an img is clicked, the gif still is converted into a functional gif and 
if it is a functional gif, it will be converted into a still gif
*/
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

/*
  when a button is clicked, the text of the buttons gets used
  as a query for new gif
*/
$(document.body).on("click", ".gifButton", function() {
  console.log($(this).text())
  queriesTheInputAndDisplaysGifsToDisplay($(this).text())
});

/*
  once the submit button is clicked, a new button is created 
  with the text that was input
*/
$("#submitButton").on("click", function() {
  var inputString = $("#inputString").val().trim();
  var array2 =  topics.map(function(x){ return x.toUpperCase() }) 
  if (!array2.includes(inputString.toUpperCase()) && inputString != '') {
    topics.push(inputString);
    createButtonsFromArray(topics);
  }
  $("#inputString").val('');

});

/*
  if enter is hit on the input line, then it will
  click the submit button
*/
$("#inputString").keyup(function(event) {
  if (event.originalEvent.keyCode === 13) {
    $('#submitButton').click();
  }
})