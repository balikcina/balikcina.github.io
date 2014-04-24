quote_id = 0;

params = function() {
  var parts, vars;
  vars = {};
  	var url = window.location.href;
    parts = url.replace(/[?&]+([^=&]+)=([^&]*)/g, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
};

$.getJSON( "http://vast-scrubland-9059.herokuapp.com/get_quotes.json?name="+params()['name'], function( quotesdata ) {
	$.getJSON( 'https://vast-scrubland-9059.herokuapp.com/players/' + quotesdata[quote_id]['player_id'] + '.json', function(nplayerdata){
		var player_name = nplayerdata["name"].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
		
		quoteurl = quotesdata[quote_id]['source_url'];
		quotecontents = quotesdata[quote_id]["quote"];
		quotedate = quotesdata[quote_id]["source_date"];
		quotelink = 'https://dl.dropboxusercontent.com/u/37316277/BalikCina/quotes.html?quote_id=' + quotesdata[quote_id]['id'];
		playerlink = 'https://dl.dropboxusercontent.com/u/37316277/BalikCina/players.html?name=' + player_name;
		playeravatar = nplayerdata['avatar_url']

		$("#avatar").html(function(){			
			return "<img class='avatar img-thumbnail' src='" + playeravatar + "'>";
		});

		$("#player-quotes").append(function(){
 				
 			return 	"<li class='list-group-item'>" +
 					"<div class='well well-lg'><h4>" + quotecontents + "</h4></div>" +

 					"<div class='btn-group pull-right'>" +				
					"<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" + 					
 					"<a class='btn btn-default vermiddle' href='" + playerlink + "'role='button'>" + "<i class='fa fa-heart fa-lg'>&nbsp; </i>"  + player_name + "</a>" +
 					"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					"<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					"</div>"+
					"<div class='clearfix'></div>" +
					"</li>";
 		});		
	});
});

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}