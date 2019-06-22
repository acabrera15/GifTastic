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

var createButtonsFromArray = function(arr) {
    var rowCreaterIndex = 0;
  for (var i = 0; i < arr.length; i++) {
    if (i === 0 || i % 12 === 0) {
      $(".container").append(`<div class='row' id= 'row-${i}'></div>`);
      $(`#row-${i}`).append(
        `<div class='col'><button type='button' class='btn btn-primary'>${arr[i]}</button></div>`
      );
      rowCreaterIndex = i;
    } else {
        $(`#row-${rowCreaterIndex}`).append(
            `<div class='col'><button type='button' class='btn btn-primary'>${arr[i]}</button></div>`
          );    }
  }
};
