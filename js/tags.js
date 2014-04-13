params = function() {
  var parts, vars;
  vars = {};
  	var url = window.location.href;
    parts = url.replace(/[?&]+([^=&]+)=([^&]*)/g, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
};

$(document).attr('title', 'Balik Cina - ' + params()['tag']);

$("#tagname").html(function(){
	var tagname = replaceAll('%20', ' ', params()['tag']);
	return tagname;
});	

$.getJSON("http://vast-scrubland-9059.herokuapp.com/players.json?tag=" + params()['tag'], function( nplayerdata ) {

	for (var i=0; i < nplayerdata.length; i++){ 
		playeravatar = nplayerdata[i]['avatar_url'];
		playerprofile = nplayerdata[i]['description'];
		playertags = nplayerdata[i]['tags'];	

		player_name = nplayerdata[i]['name'];
		player_name = replaceAll('%20', ' ', player_name);
		player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		player_url = 'players.html?name=' + player_name

		$("#list-profiles").append(function(){		
			return 	"<ul class='list-group aligncenter'>"+
					"<div>"+
					"<img class='avatar img-thumbnail' src='" + playeravatar + "'>" +
					"</div>" +
					"<p> <a href='" + player_url + "'>" + player_name + "</a> </p>" +
					"<p>" + playerprofile + "<p><hr>";
		});	
    }
});

function getQuotes(quotesdata, quote_id){		
		quoteurl = quotesdata[quote_id]['source_url'];
		quotecontents = quotesdata[quote_id]["quote"];
		quotedate = quotesdata[quote_id]["source_date"];
		quotelink = 'quotes.html?quote_id=' + quotesdata[quote_id]['id'];
		playerlink = 'players.html?name=' + quotesdata[quote_id]['player_name'];

		$("#player-quotes").append(function(){
 				
 			return 	"<li class='list-group-item'>" +
 					"<div class='well well-lg'><h4>" + quotecontents + "</h4></div>" +

 					"<div class='btn-group pull-right'>" +				
					"<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" + 					
 					"<a class='btn btn-default vermiddle' href='" + playerlink + "'role='button'>" + "<i class='fa fa-heart fa-lg'>&nbsp; </i>"  + quotesdata[quote_id]['player_name'] + "</a>" +
 					"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					"<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					"</div>"+
					"<div class='clearfix'></div><br>" +
					"</li>";
 		});

 		$("#player-quotes").fadeIn('slow');		
}

$.getJSON("http://vast-scrubland-9059.herokuapp.com/quotes.json?tag=" + params()['tag'], function( quotesdata ) {	

    for (var quote_id=0; quote_id<quotesdata.length; quote_id++){    	   	
        getQuotes(quotesdata, quote_id)
    };

});


function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}