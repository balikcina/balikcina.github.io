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
			return "<img id='pavatar' class='avatar img-thumbnail' src='" + playeravatar + "'>";
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

		// Much variables, wow.
		player_name = params()['name'];
		player_name = replaceAll('%20', ' ', player_name);
		player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		quoteurl = quotesdata[quote_id]['source_url'];
		quotecontents = quotesdata[quote_id]["quote"];
		quotedate = quotesdata[quote_id]["source_date"];
		quotecontext = quotesdata[quote_id]["context"];
		viewcount = quotesdata[quote_id]["view_count"];
		quotelink = 'quotes.html?quote_id=' + quotesdata[quote_id]['id'];

		//playerlink = 'players.html?name=' + player_name;

		facebooklink = 'https://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + quotelink + "'" + "&p[title]='" + quotecontents + "'";
		viewcount = "Views: " + viewcount;
		encodedquote = encodeURIComponent(quotecontents);
		encodedurl = encodeURIComponent(quotelink);
		twitterlink = 'https://twitter.com/share?text=' + encodedquote + '&url=' + encodedurl;

		if(quotecontext != null && quotecontext != "" && quotecontext != " ") {
			thecontext = "<em style='font-size: 16px;'>On " + quotecontext + ": </em>";
		}

		else{
		 	thecontext = "";
		}


		$("#player-quotes").append(function(){
 				
 			return 	"<div class='quote'>" +
 					"<div class='row'>" +

 					// Avatar sub-box
 					"<div class='col-xs-1 nopadding'>" +
 					"</div>" +

 					//Quotes sub-box
 					"<div class='col-xs-10' id='box" + quote_id + "'>" +
 					
 					"<div class='topbar'>"+
 					"<left>" +
 					"<h1>" + player_name + "&nbsp; </h1>" + 					
 					"</left>" +

 					"<right>" +
 					"<h3>" + viewcount + "</i></h3>" +
 					"</right>" + 	
 					"<div style='clear: both;'></div>" +
 					"</div>" +  // Close topbar

 					"<div class='midbar'>"+
 					thecontext +
 					"</div>" + // Close midbar
 					"<div style='clear: both;'></div>" +

 					"<div class='quotebar' id='quote" + quote_id + "'>" +
 					"<h2>" + quotecontents + "</h2>" +
 					"</div>" + // Close quote bar

 					"<div class='bottombar'><h3>" +
 					// "<div class='btn-group-sm pull-left' id='leftbutton'" + quote_id + "'>" +		
 					"<a class='alignleft' id='showcomments" + quote_id + "'><i class='fa fa-comment fa-lg'>&nbsp;</i></a> &nbsp;" +
 					"<a href='" + quotelink + "'><i class='fa fa-ellipsis-h fa-lg'>&nbsp;</i>Details</a> &nbsp;" +
 					"<a href='" + quoteurl + "' target='_blank'><i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a> &nbsp;" +

 					"<a class='alignright' href='" + twitterlink + "' target='_blank'><i class='fa fa-twitter fa-lg'></i>&nbsp;</a>" +
 					"<a class='alignright' href='" + facebooklink + "' target='_blank'><i class='fa fa-facebook-square fa-lg'></i>&nbsp;</a>" +
 					// "<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					// 	"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" +
 					"</h3></div>" + // Close bottom bar
 					"<div class='clearfix'></div>" +

 				// 	"<div class='btn-group-sm pull-right'>" +
 				// 	"<a class='btn btn-default vermiddle' id='whosaid" + quote_id + "'" + " href='" + playerlink + "'role='button'>" + player_name + "</a>" +					
 				// 	"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button' target='_blank'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					// // "<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					//"<hr>" + 
					"</div>" + //close quote sub-box

					"<div class='col-xs-1'>" +
 					"</div>" +

					"<div id='hiddenlink" + quote_id + "'>" + quotelink + "</div>" + 

					"</div></div>" + // Close quote box, rows
					"<div class='clearfix'></div>";	
 		});

 		$("#player-quotes").fadeIn('slow');

		// Hide quote link, any better way to do this?
		$('#hiddenlink' + quote_id).css('display','none');

		// Ugly animation hehe
 		$("#top-quotes").fadeIn('slow');

 		// Link to Quotes
 		$("#quote" + quote_id).css( 'cursor', 'pointer' );
 		$("#quote" + quote_id).click(function() {
			window.open($("#hiddenlink" + quote_id).html(), '_self');
		});

		// Generate and Toggle FB Comment Box
 		$("#showcomments" + quote_id).css( 'cursor', 'pointer' );
 		$("#showcomments" + quote_id).one("click", function() {	
			$("#box" + quote_id).append(function(){
      			width = $("#box" + quote_id).width()*0.95;				  
				return "<br><div id='commentbox" + quote_id + "' class='fb-comments' data-href='http://balikcina.com/" + $("#hiddenlink" + quote_id).html() + "' data-width='" + width + "' data-numposts='10' data-colorscheme='light'></div>"
			});
			FB.XFBML.parse();
			$('#commentbox' + quote_id).css('display','none');
		});

		$("#showcomments" + quote_id).click(function() {	
			$("#commentbox" + quote_id).toggle();
		});

		$("#box" + quote_id).mouseover(function(){
   			$(this).addClass('hoverquote');
		});
        
		$("#box" + quote_id).mouseout(function(){
   			$(this).removeClass('hoverquote');
		}); 				
}

$( document ).ready(function() {
$.getJSON("http://vast-scrubland-9059.herokuapp.com/get_quotes.json?name=" + params()['name'], function( quotesdata ) {	
    getPlayer(quotesdata);

    $("#player-quotes").hide();
	$("#player-quotes").html(function(){
		return '';
	});

    for (var quote_id=0; quote_id<quotesdata.length; quote_id++){    	   	
        getQuotes(quotesdata, quote_id)
    };

});
});

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}