params = function() {
  var parts, vars;
  vars = {};
  	var url = window.location.href;
    parts = url.replace(/[?&]+([^=&]+)=([^&]*)/g, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
};

$('#clickmore').css('visibility','show');

$(document).attr('title', 'Balik Cina - ' + params()['tag']);

$("#updatetag").html(function(){
 	var tagname = replaceAll('%20', ' ', params()['tag']);
 	return tagname;
});	

// $.getJSON("http://vast-scrubland-9059.herokuapp.com/players.json?tag=" + params()['tag'], function( nplayerdata ) {

// 	for (var i=0; i < nplayerdata.length; i++){ 
// 		playeravatar = nplayerdata[i]['avatar_url'];
// 		playerprofile = nplayerdata[i]['description'];
// 		playertags = nplayerdata[i]['tags'];	

// 		player_name = nplayerdata[i]['name'];
// 		player_name = replaceAll('%20', ' ', player_name);
// 		player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// 		player_url = 'players.html?name=' + player_name

// 		$("#list-profiles").append(function(){		
// 			return 	"<ul class='list-group aligncenter'>"+
// 					"<div>"+
// 					"<img class='avatar img-thumbnail' src='" + playeravatar + "'>" +
// 					"</div>" +
// 					"<p> <a href='" + player_url + "'>" + player_name + "</a> </p>" +
// 					"<p>" + playerprofile + "<p><hr>";
// 		});	
//     }
// });

function getQuotes(quotesdata, quote_id){		
		quoteurl = quotesdata[quote_id]['source_url'];
		quotecontents = quotesdata[quote_id]["quote"];
		quotedate = quotesdata[quote_id]["source_date"];
		quotelink = 'quotes.html?quote_id=' + quotesdata[quote_id]['id'];
		quotedetails = quotesdata[quote_id]["source"];

		player_name = quotesdata[quote_id]['player_name'];
		playeravatar = quotesdata[quote_id]['player']['avatar_url'];
		playerlink = 'players.html?name=' + quotesdata[quote_id]['player_name'];
		viewcount = quotesdata[quote_id]["view_count"];

		quotecontext = quotesdata[quote_id]["context"];
		viewcount = "Views: " + viewcount;
		
		quote_id = quotesdata[quote_id]['id'];
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
 					"<div class='col-xs-2 nopadding'>" +
 						"<a href='" + playerlink + "'>" + "<img class='img-thumbnail' style='float:right' width='100%' src='" + playeravatar + "'></a>" +
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
 					"<div id='details" + quote_id + "'style='display: none;'><br>" + quotedetails + "</div>" + 
 					"<div class='clearfix'></div>" +

 				// 	"<div class='btn-group-sm pull-right'>" +
 				// 	"<a class='btn btn-default vermiddle' id='whosaid" + quote_id + "'" + " href='" + playerlink + "'role='button'>" + player_name + "</a>" +					
 				// 	"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button' target='_blank'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					// // "<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					//"<hr>" + 
					"</div>" + //close quote sub-box

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

page = 1;

$.getJSON("http://vast-scrubland-9059.herokuapp.com/quotes.json?tag=" + params()['tag'] + "&page=" + page, function( quotesdata ) {	

    for (var quote_id=0; quote_id<quotesdata.length; quote_id++){    	   	
        getQuotes(quotesdata, quote_id)
    };

    ++page;
});

$("#clickmore").css( 'cursor', 'pointer' );

$("#clickmore").click(function() {

	$("#clickmore").html(function() {
		return "<i class='fa fa-spinner fa-spin fa-lg text-right'></i>";
	});

	$.getJSON("http://vast-scrubland-9059.herokuapp.com/quotes.json?tag=" + params()['tag'] + "&page=" + page, function(quotesdata) {

		if (quotesdata.length == 0){
			$("#clickmore").html(function(){
				return "Oops! That\'s all folks! <a href='submit.html'>Do you have something to add?</a>";
			});	
		}	

		else {

    	for(var quote_id=0; quote_id<quotesdata.length; quote_id++){
        	getQuotes(quotesdata, quote_id);
    	}

    	$("#clickmore").html(function() {
			return "<p>See More</p>";
		});

    	}

	});

	++page;

});


function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}