$("#popquote").hide();
$("#quotebuttons").hide();

$('.carousel').carousel({
  interval: 4500,
  pause: "false"
});

function loop(quotesdata, quote_id)
{     
    $.getJSON('https://vast-scrubland-9059.herokuapp.com/players/' + quotesdata[quote_id]['player_id'] + '.json', function(nplayerdata){
		
		// Much variables, wow.
		player_name = nplayerdata["name"].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
		playeravatar = nplayerdata['avatar_url'];
		quoteurl = quotesdata[quote_id]['source_url'];
		quotecontents = quotesdata[quote_id]["quote"];
		quotedate = quotesdata[quote_id]["source_date"];
		quotecontext = quotesdata[quote_id]["context"];
		viewcount = quotesdata[quote_id]["view_count"];
		quotelink = 'quotes.html?quote_id=' + quotesdata[quote_id]['id'];
		playerlink = 'players.html?name=' + player_name;
		viewcount = "Views: " + viewcount;
		encodedquote = replaceAll('\'', '%27', quotecontents);
		encodedquote = encodeURIComponent(encodedquote);
		encodedurl = 'http://balikcina.com/' + quotelink;
		encodedurl = encodeURIComponent(encodedurl);
		twitterlink = 'https://twitter.com/share?text=' + encodedquote + ' ' + '&url=' + encodedurl;

		// Empty space if no context
		if(quotecontext != null && quotecontext != "" && quotecontext != " ") {
			thecontext = "<em style='font-size: 12px;'>On " + quotecontext + ": </em>";
		}

		else{
		 	thecontext = "";
		}
		
		
		// Generate quote boxes
 		$("#top-quotes").append(function(){
 				
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

 		// $("#whosaid" + quote_id).click(function(){
 		// 	$("leftbutton" + quote_id).html(function(){
 		// 		alert('test');
 		// 		return "<a class='btn btn-default vermiddle style='display: none;' href='" + playerlink + "'role='button'>" + player_name + "</a>";
 		// 	});
 		// });

 	}); 
}

$.getJSON('https://vast-scrubland-9059.herokuapp.com/quotes.json', function(quotesdata) {
	$("#quotenum").html(function(){
		return quotesdata.length;
	});

	var foo = range(0,quotesdata.length);

	$("#top-quotes").html(function(){
		return '';
	});

    for (var i=1; i<=10; i++){
    	var quote_id = foo.splice(Math.floor(Math.random() * quotesdata.length-1-i), 1)[0];    	   	
        loop(quotesdata, quote_id)
    };
});


function range(start, end) {
    var foo = [];
    for (var i = start; i < end; i++) {
        foo.push(i);
    }
    return foo;
}


// // Get tags
// $.getJSON('https://vast-scrubland-9059.herokuapp.com/tags.json', function(tagsdata) {
// 	for (var i=0; i<tagsdata["player_tags"].length; i++){

// 		var tag_name = tagsdata["player_tags"][i]["name"];
// 		var tag_url = 'tags.html?tag=' + tagsdata["player_tags"][i]["name"]

//  		$("#list-tags").append(function(){
//  			return "<a href='" + tag_url + "'>" + tag_name + " </a>";
//  		});
//  	}

// 	for (var i=0; i<tagsdata["quote_tags"].length; i++){

// 		var tag_name = tagsdata["quote_tags"][i]["name"];
// 		var tag_url = 'tags.html?tag=' + tagsdata["quote_tags"][i]["name"]

//  		$("#list-tags").append(function(){
//  			return "<a href='" + tag_url + "'>" + tag_name + " </a>";
//  		});
//  	}


//  });

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}