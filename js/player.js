params = function() {
  var parts, vars;
  vars = {};
  	var url = window.location.href;
    parts = url.replace(/[?&]+([^=&]+)=([^&]*)/g, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
};

function getPlayer(quotesdata){
	$.getJSON( 'https://vast-scrubland-9059.herokuapp.com/players/' + quotesdata[0]['player_id'] + '.json', function(nplayerdata){
		player_name = params()['name'];
		playeravatar = nplayerdata['avatar_url'];
		playerprofile = nplayerdata['description'];
		
		$("#playername").html(function(){
			var player_name = params()['name'];
			player_name = replaceAll('%20', ' ', player_name);
			var player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			$(document).attr('title', 'Balik Cina - ' + player_name);
			return player_name;
		});	

		$("#avatar").html(function(){			
			return "<img class='avatar img-thumbnail' src='" + playeravatar + "'>";
		});

		$("#profile").html(function(){			
			return "<p>" + playerprofile + "<p>";
		});

		for (var i=0; i < nplayerdata['tags'].length; i++){
			$("#playertags").append(function(){
				return "<a href ='tags.html?tag=" + nplayerdata['tags'][i] + "'>"+ nplayerdata['tags'][i] + " </a>";
			});	
		}

	});
}

function getQuotes(quotesdata, quote_id){		
		quoteurl = quotesdata[quote_id]['source_url'];
		quotecontents = quotesdata[quote_id]["quote"];
		quotedate = quotesdata[quote_id]["source_date"];
		quotelink = 'quotes.html?quote_id=' + quotesdata[quote_id]['id'];
		// playerlink = 'players.html?name=' + params()['name'];

		$("#player-quotes").append(function(){
 				
 			return 	"<li class='list-group-item'>" +
 					"<div class='well well-lg'><h4>" + quotecontents + "</h4></div>" +

 					"<div class='btn-group pull-right'>" +				
					"<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" + 					
 					// "<a class='btn btn-default vermiddle' href='" + playerlink + "'role='button'>" + "<i class='fa fa-heart fa-lg'>&nbsp; </i>"  + player_name + "</a>" +
 					"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					"<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					"</div>"+
					"<div class='clearfix'></div>" +
					"</li>";
 		});

 		$("#player-quotes").fadeIn('slow');		
}

$.getJSON("http://vast-scrubland-9059.herokuapp.com/get_quotes.json?name=" + params()['name'], function( quotesdata ) {	
    getPlayer(quotesdata);
    $("#player-quotes").hide();

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