
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
    var streetInput = $("input#street").val();
    var cityInput = $("input#city").val();
    var fullAdressLink = encodeURI(streetInput + " " + cityInput);
    var linkGoogleMaps = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + fullAdressLink;

    if ($(".bgimg").length) {
        $(".bgimg").remove();
    }

    $greeting.text('So, you want to live at ' + streetInput + ", " + cityInput );
    $body.append("<img class='bgimg' src=" + linkGoogleMaps + ">");

    return false;
};

$('#form-container').submit(loadData);
