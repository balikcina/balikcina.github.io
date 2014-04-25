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
				return "<a href ='tags.html?tag=" + nplayerdata['tags'][i] + "'><span class='label label-info'>"+ nplayerdata['tags'][i] + " </span></a>&nbsp;";
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
		quotedetails = quotesdata[quote_id]["source"];
		viewcount = quotesdata[quote_id]["view_count"];
		quotelink = 'quotes.html?quote_id=' + quotesdata[quote_id]['id'];
		viewcount = "Views: " + viewcount;			
		encodedquote = replaceAll('\'', '%27', quotecontents) + ' #balikcina';
		encodedquote = encodeURIComponent(encodedquote);
		encodedurl = 'http://www.balikcina.com/' + quotelink;
		encodedurl = encodeURIComponent(encodedurl);
		twitterlink = 'https://twitter.com/share?text=' + encodedquote + ' ' + '&url=' + encodedurl;

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
 					"<h1>" + "<span id='player_name" + quote_id + "'>" + player_name + "</span>&nbsp;</h1>" + 					
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

 					"<h2><div class='quotebar' id='quote" + quote_id + "'>" +
 					quotecontents +
 					"</div></h2>" + // Close quote bar

 					"<div class='bottombar'><h3>" +
 					// "<div class='btn-group-sm pull-left' id='leftbutton'" + quote_id + "'>" +		
 					"<a class='alignleft' id='showcomments" + quote_id + "'><i class='fa fa-comment fa-lg'>&nbsp;</i></a> &nbsp;" +
 					"<a href='" + quotelink + "'><i class='fa fa-ellipsis-h fa-lg'>&nbsp;</i>Details</a> &nbsp;" +
 					"<a href='" + quoteurl + "' target='_blank'><i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a> &nbsp;" +

 					"<a class='alignright' href='" + twitterlink + "' target='_blank'><i class='fa fa-twitter fa-lg'></i>&nbsp;</a>" +
 					"<a class='alignright' id='fbfeed" + quote_id + "'><i class='fa fa-facebook-square fa-lg'></i>&nbsp;</a>" +
 					// "<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					// 	"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" +
 					"</h3></div>" + // Close bottom bar
 					"<div id='details" + quote_id + "'style='display: none;'><br>" + quotedetails + "</div>" + 
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
			$("#details" + quote_id).slideToggle("fast", function(){

			});
		});

		// Generate and Toggle FB Comment Box
 		$("#showcomments" + quote_id).css( 'cursor', 'pointer' );
 		var clicks = 0;
 		$("#showcomments" + quote_id).click(function() {
 		if(clicks == 0){	
			$("#box" + quote_id).append(function(){
      			width = $("#box" + quote_id).width()*0.95;				  
				return "<div id='commentbox" + quote_id + "' class='fb-comments' data-href='http://balikcina.com/" + $("#hiddenlink" + quote_id).html() + "' data-width='" + width + "' data-numposts='10' data-colorscheme='light'></div>"
			});
			$('#commentbox' + quote_id).css('display','none');
			FB.XFBML.parse($('#box' + quote_id)[0], function() {
   				$('#commentbox' + quote_id).show("slow");
			});			
		}
		else{
			$("#commentbox" + quote_id).toggle("slow");			
		}
		++clicks;
		});


		$("#box" + quote_id).mouseover(function(){
   			$(this).addClass('hoverquote');
		});
        
		$("#box" + quote_id).mouseout(function(){
   			$(this).removeClass('hoverquote');
		});

		$("#fbfeed" + quote_id).click(function(){
		fbquotecontents = $("#quote" + quote_id).html(); 
		fbquotelink = 'http://balikcina.com/' + $("#hiddenlink" + quote_id).html();

 	    FB.ui(
 	    	{
      		method: 'feed',
       		name: 'Balik Cina | Beautiful Quotes by Malaysian Politicians',
       		caption: $("#player_name" + quote_id).html(),
       		description: (fbquotecontents),
       		link: fbquotelink,
       		picture: 'http://balikcina.com/img/balikcina.jpg',
       		redirect_uri: 'balikcina.com'
      		},
      		function(response) {

      		}
      	);      		
 		}); // close fbfeedbox
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