
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetInput = encodeURI($("input#street").val());
    var cityInput = encodeURI($("input#city").val());
    var linkGoogleMaps = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + streetInput + "%20" +cityInput;

    if ($(".bgimg").length) {
        $(".bgimg").remove();
    }

    $body.append("<img class='bgimg' src=" + linkGoogleMaps + ">");

    return false;
};

$('#form-container').submit(loadData);
