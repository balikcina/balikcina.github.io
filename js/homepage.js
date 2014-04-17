$("#popquote").hide();
$("#quotebuttons").hide();

$('.carousel').carousel({
  interval: 4500,
  pause: "false"
});

function loop(quotesdata, quote_id)
{     
    $.getJSON('https://vast-scrubland-9059.herokuapp.com/players/' + quotesdata[quote_id]['player_id'] + '.json', function(nplayerdata){
		var player_name = nplayerdata["name"].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
		playeravatar = nplayerdata['avatar_url'];
		quoteurl = quotesdata[quote_id]['source_url'];
		quotecontents = quotesdata[quote_id]["quote"];
		quotedate = quotesdata[quote_id]["source_date"];
		quotecontext = quotesdata[quote_id]["context"];
		viewcount = quotesdata[quote_id]["view_count"];
		quotelink = 'quotes.html?quote_id=' + quotesdata[quote_id]['id'];
		playerlink = 'players.html?name=' + player_name;
		facebooklink = 'https://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + quotelink + "'" + "&p[title]='" + quotecontents + "'";
		
		if(quotecontext != null && quotecontext != "" && quotecontext != " ") {
			thecontext = "<em style='font-size: 12px;'>On " + quotecontext + ": </em>";
		}

		else{
		 	thecontext = "";
		}
		
		viewcount = "<small style='font-size: 12px;'>Seen: " + viewcount + "</small>";

 		$("#top-quotes").append(function(){
 				
 			return 	"<li class='list-group-item' id='box" + quote_id + "'><br>" +
 					"<div class='topbar'>"+
 					"<p class='alignleft'>" + thecontext + "</p>" +
 					"<p class='alignright'><i class='fa fa-eye'>&nbsp; </i>" + viewcount + "</i></p>" + 					
 					"</div><div style='clear: both;'></div>"+
 					"<div class='well well-sm' id='quote" + quote_id + "'>" +
 					"<h5 class='bigspace'>" + quotecontents + "</h5></div>" +

 					"<div class='btn-toolbar' role='toolbar'>" +

 					"<div class='btn-group-sm pull-left' id='leftbutton'" + quote_id + "'>" +		
 					"<a class='btn btn-default vermiddle' id='showcomments" + quote_id + "'>" + "Comments" + "</a>" +
 					
 					// "<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					// 	"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" +
 					"</div>"+ 

 					"<div class='btn-group-sm pull-right'>" +
 					"<a class='btn btn-default vermiddle' id='whosaid" + quote_id + "'" + " href='" + playerlink + "'role='button'>" + player_name + "</a>" +					
 					"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button' target='_blank'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					// "<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					
					"</div>" +

					"<div class='clearfix'></div><br>" +

					"</div></li>" +
					
					"<div id='hiddenlink" + quote_id + "'" + " style='display: none;'>" + 
					quotelink
					"</div>";
 		});		

 		$("#top-players").append(function(){
 				
 			return 	"<li class='list-group-item'><br>" +
 					"<img class='avatar img-thumbnail' src='" + playeravatar + "'>" +
 					"</li>";
 		});		

 		$("#top-quotes").fadeIn('slow');

 		$("#quote" + quote_id).css( 'cursor', 'pointer' ); 			
 		$("#quote" + quote_id).click(function() {
			window.open($('#hiddenlink' + quote_id).html(), '_self');
		});

 		$("#showcomments" + quote_id).click(function() { 			
			$("#box" + quote_id).append(function(){				  
				return "testing" + "<div class='fb-comments' data-href='http://balikcina.com/" + $("#hiddenlink" + quote_id).html() + "' data-numposts='10' data-colorscheme='light'></div>"
			});
			FB.XFBML.parse();
		});

 		// $("#whosaid" + quote_id).click(function(){
 		// 	$("leftbutton" + quote_id).html(function(){
 		// 		alert('test');
 		// 		return "<a class='btn btn-default vermiddle style='display: none;' href='" + playerlink + "'role='button'>" + player_name + "</a>";
 		// 	});
 		// });

 	}); 
}

$.getJSON('https://vast-scrubland-9059.herokuapp.com/quotes.json', function(quotesdata) {	
	var foo = range(0,quotesdata.length);
	$("#top-quotes").hide();

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

// $.getJSON('https://vast-scrubland-9059.herokuapp.com/players.json', function(playersdata) {

// 	for (var i=0; i<playersdata.length; i++){

// 		var player_name = playersdata[i]["name"];
// 		var player_url = 'players.html?name=' + player_name
// 		var player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

//  		$("#list-names").append(function(){
//  			return "<p> <a href='" + player_url + "'>" + player_name + "</a> </p>";
//  		});

//  	}
//  });

$.getJSON('https://vast-scrubland-9059.herokuapp.com/tags.json', function(tagsdata) {
	for (var i=0; i<tagsdata["player_tags"].length; i++){

		var tag_name = tagsdata["player_tags"][i]["name"];
		var tag_url = 'tags.html?tag=' + tagsdata["player_tags"][i]["name"]

 		$("#list-tags").append(function(){
 			return "<a href='" + tag_url + "'>" + tag_name + " </a>";
 		});
 	}

	for (var i=0; i<tagsdata["quote_tags"].length; i++){

		var tag_name = tagsdata["quote_tags"][i]["name"];
		var tag_url = 'tags.html?tag=' + tagsdata["quote_tags"][i]["name"]

 		$("#list-tags").append(function(){
 			return "<a href='" + tag_url + "'>" + tag_name + " </a>";
 		});
 	}


 });

