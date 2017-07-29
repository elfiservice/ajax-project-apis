
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

    $greeting.text('So, you would like to live at ' + streetInput + " in " + cityInput + " city." );
    $body.append("<img class='bgimg' src=" + linkGoogleMaps + ">");


    //Ajax request The New York Times articls
    var apiKeyNYT = "5ed067b15e7c4deeb029547379606584";
    var requestLinkNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + fullAdressLink + "&page=1&sort=newest&api-key=" + apiKeyNYT;
    $.getJSON( requestLinkNYT, function( data ) {

        $nytHeaderElem.html("NYT Articles About <i>" + cityInput + "</i> city");
        $nytElem.removeClass("color-muted");
        articles = data.response.docs;
        articles.forEach(function(article){
            $nytElem.append('' +
            '<article class="article col-md-4">' +
            '<h4><a href="' + article.web_url + '" target="_blank">' + article.headline.main + '</a></h4>' +
            '<p>' + article.snippet + '</p>' +
            '</article>' +
            '');
        });

    }).fail(function(e) {
        $nytElem.append('<li class="article">' +
        '<p> Result not Found </p>' +
        '</li>');
        });

      //Ajax Request wikipedia
      var requestLinkWiki = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + cityInput + "&callback=wikiCallback";

      //Set a time cause the request Failed
      var wikiRequestTimeOut = setTimeout(function(){
          $wikiElem.text("Failed to get Wikipedia resources.");
      }, 8000);

      $.ajax({
          url: requestLinkWiki,
          dataType: "jsonp",
          //jsonp callback
          success: function( response ){
              console.log(response);
              var articleList = response[1];

              for(var i = 0; i < articleList.length; i++){
                  articleStr = articleList[i];
                  var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                  $wikiElem.append('<li><a href="' + url + '" target="_blank">' +
                    articleStr + '</a></li>');
              };
              //cancel the time after request success
              clearTimeout(wikiRequestTimeOut);
          }

      });

    return false;
};

$('#form-container').submit(loadData);
