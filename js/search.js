params = function() {
  var parts, vars;
  vars = {};
  	var url = window.location.href;
    parts = url.replace(/[?&]+([^=&]+)=([^&]*)/g, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
};

$(document).attr('title', 'Balik Cina - ' + params()['key']);

$("#searchname").html(function(){
	search_name = replaceAll('+', ' ', params()['key']);
	search_name = search_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	return search_name;
});	

$("#loadingspin").html(function(){
	return "<i class='fa fa-spinner fa-2x fa-spin'></i>";
});

$.getJSON("http://vast-scrubland-9059.herokuapp.com/search.json?key=" + params()['key'], function( searchdata ) {
	if(searchdata['players'].length == 0){

	$("#list-profiles").append(function(){
		return "<div class='text-center'><p>No profiles related to the search term :(</p></div>";
	});	
	}

	if(searchdata['quotes'].length == 0){
	$("#player-quotes").append(function(){
		return "<br><div class='text-center'><p> No quotes related to the search term :(</p></div><br>";
	});	
	}

	$("#loadingspin").html(function(){
		return "";
	});

	for (var i=0; i < searchdata['players'].length; i++){
		playeravatar = searchdata['players'][i]['avatar_url'];
		playerprofile = searchdata['players'][i]['description'];
		playertags = searchdata['players'][i]['tags'];

		player_name = searchdata['players'][i]['name'];
		player_name = replaceAll('%20', ' ', player_name);
		player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		player_url = 'players.html?name=' + player_name;

		$("#list-profiles").append(function(){		
			return 	"<ul class='list-group aligncenter'>"+
					"<div>"+
					"<img class='avatar img-thumbnail' src='" + playeravatar + "'>" +
					"</div>" +
					"<p> <a href='" + player_url + "'>" + player_name + "</a> </p>" +
					"<p>" + playerprofile + "<p><hr>";
		});	
    }

	for (var quote_id = 0; quote_id < searchdata['quotes'].length; quote_id++){ 
		
		// Much variables, wow.
		// $.getJSON('https://vast-scrubland-9059.herokuapp.com/players/' + searchdata['quotes'][quote_id]['player_id'] + '.json', function(nplayerdata){
		// 	playeravatar = nplayerdata['avatar_url'];
		// });

		player_name = searchdata['quotes'][quote_id]['player_name'];
		quoteurl = searchdata['quotes'][quote_id]['source_url'];
		quotecontents = searchdata['quotes'][quote_id]["quote"];
		quotedate = searchdata['quotes'][quote_id]["source_date"];
		quotecontext = searchdata['quotes'][quote_id]["context"];
		viewcount = searchdata['quotes'][quote_id]["view_count"];
		quotelink = 'quotes.html?quote_id=' + searchdata['quotes'][quote_id]['id'];
		playerlink = 'players.html?name=' + searchdata['quotes'][quote_id]['player_name'];
		//facebooklink = 'https://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + quotelink + "'" + "&p[title]='" + quotecontents + "'";
		viewcount = "Views: " + viewcount;

		encodedquote = replaceAll('\'', '%27', quotecontents);
		encodedquote = encodeURIComponent(encodedquote);
		encodedurl = 'http://www.balikcina.com/' + quotelink;
		encodedurl = encodeURIComponent(encodedurl);
		twitterlink = 'https://twitter.com/share?text=' + encodedquote + ' ' + '&url=' + encodedurl;

		// Empty space if no context
		if(quotecontext != null && quotecontext != "" && quotecontext != " ") {
			thecontext = "<em style='font-size: 12px;'>On " + quotecontext + ": </em>";
		}

		else{
		 	thecontext = "";
		}

		$("#player-quotes").append(function(){
 				
 			return 	"<div class='quote'>" +
 					"<div class='row'>" +

 					// Avatar sub-box
 					"<div class='col-xs-1 nopadding'>" +
 					//	"<a href='" + playerlink + "'>" + "<img class='img-thumbnail' style='float:right' width='100%' src='" + playeravatar + "'></a>" +
 					"</div>" +

 					// Quotes sub-box
 					"<div class='col-xs-10' id='box" + quote_id + "'>" +
 					"<div class='topbar'>"+
 					"<left>" +
 					"<a href='" + playerlink + "'><h1>" + player_name + "&nbsp; </h1></a>" + 					
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
 					// "<a class='alignleft' id='showcomments" + quote_id + "'><i class='fa fa-comment fa-lg'>&nbsp;</i>Comments</a> &nbsp;" +
 					"<a href='" + quotelink + "'><i class='fa fa-ellipsis-h fa-lg'>&nbsp;</i>Details</a> &nbsp;" +
 					"<a href='" + quoteurl + "' target='_blank'><i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a> &nbsp;" +

 					"<a class='alignright' href='" + twitterlink + "' target='_blank'><i class='fa fa-twitter fa-lg'></i>&nbsp;</a>" +
 					"<a class='alignright' id='fbfeed" + quote_id + "'><i class='fa fa-facebook-square fa-lg'></i>&nbsp;</a>" +
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

	//}); // close get nplayerdata
    } // close for loop
});


function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

