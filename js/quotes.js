params = function() {
  var parts, vars;
  vars = {};
  	var url = window.location.href;
    parts = url.replace(/[?&]+([^=&]+)=([^&]*)/g, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
};

jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

$( document ).ready(function() {
$.getJSON( "https://vast-scrubland-9059.herokuapp.com/quotes/" + params()['quote_id'] + ".json", function( data ) {
		quotedescription = data['source'];
		quotecontents = data['quote'];
		quotedate = data["source_date"];
		quoteurl = data['source_url'];
		quote_id = data['id'];
		viewcount = data["view_count"];
		quotelink = 'quotes.html?quote_id=' + data['id'];
		quotecontext = data["context"];
		encodedquote = replaceAll('\'', '%27', quotecontents);
		encodedquote = encodeURIComponent(encodedquote);
		encodedurl = window.location.href;
		encodedurl = encodeURIComponent(encodedurl);
		twitterlink = 'https://twitter.com/share?text=' + encodedquote + ' ' + '&url=' + encodedurl;

		if(quotecontext != null && quotecontext != "" && quotecontext != " ") {
			thecontext = "<em style='font-size: 16px;'>On " + quotecontext + ": </em><p>";
		}

		else{
		 	thecontext = "";
		}
		

		$(document).attr('title', 'Balik Cina - ' + quotecontents);
		$('meta[name=og\\:title]').attr('content', 'Balik Cina!');
		$('meta[name=og\\:description]').attr('content', quotecontents);

		$("#popquote").html(function(){
			return quotecontents;
		});

		$("#contextquote").html(function(){
			return thecontext;
		});

		$("#quotedescription").html(function(){
			return "<p>" + quotedescription + "</p>";
		});	

		// Commment Box
 		$("#showcomments").css( 'cursor', 'pointer' );
 		$("#showcomments").one("click", function() {
 			
			$("#commentshehe").append(function(){
      			width = $("#commentshehe").width();				  
				return "<br><div id='commentbox" + quote_id + "' class='fb-comments' data-href='" + $(location).attr('href') + "' data-width='" + width + "' data-numposts='10' data-colorscheme='light'></div>"
			});
			FB.XFBML.parse();
			$('#commentbox').css('display','none');
		});

		$("#showcomments").click(function() {	
			$("#commentbox").toggle();
		});


		if(data['tags'].length == 0){
			$("#taglist").append(function(){
				return "None yet :(";
			});
		}	

		for (var i=0; i < data['tags'].length; i++){
			$("#taglist").append(function(){
				return "<a href ='tags.html?tag=" + data['tags'][i] + "'>"+ data['tags'][i] + " </a>";
			});	
		}

		$.getJSON("https://vast-scrubland-9059.herokuapp.com/players/" + data['player_id'] + ".json", function(nplayerdata){
		
		player_name = nplayerdata["name"].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
		playerlink = 'players.html?name=' + player_name;
		playeravatar = nplayerdata["avatar_url"]

		$("#authorquote").html(function(){
			return "<img class='img-thumbnail smallimg' src='" + playeravatar + "'>" + player_name;
		});
		
 		$("#quotebuttons").append(function(){ 				
 			return 	"<div class='btn-toolbar' role='toolbar'>"+

 					"<div class='btn-group pull-left'>" +
 					"<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button' data-toggle='tooltip' data-placement='bottom' title='View Count'>" + "<i class='fa fa-eye'>&nbsp; </i>" + viewcount + "</i></a>" + 	
 					// "<div class='well well-sm' style:'width:10px;'>" + window.location.href + "</div>"
 					"</div>" +

 					"<div class='btn-group pull-right'>" +				
 					"<a class='btn btn-default vermiddle' href='" + twitterlink + "' target='_blank'><i class='fa fa-twitter fa-lg'></i>&nbsp;</a>" +
 					"<a class='btn btn-default vermiddle' id='fbfeed" + quote_id + "'><i class='fa fa-facebook-square fa-lg'></i>&nbsp;</a>" +	
 					"<a class='btn btn-default vermiddle' href='" + playerlink + "'role='button'>" + "<i class='fa fa-heart fa-lg'>&nbsp; </i>"  + player_name + "</a>" +
 					"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button' data-toggle='tooltip' data-placement='bottom' title='Link to Article'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					// "<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					"</div>"+

					"<div class='clearfix'></div><br>" +

					"</div>";
 		});

		$("#fbfeed" + quote_id).click(function(){
		fbquotecontents = quotecontents;
		fbquotelink = window.location.href;

 	    FB.ui(
 	    	{
      		method: 'feed',
       		name: 'Balik Cina | Beautiful Quotes by Malaysian Politicians',
       		caption: player_name,
       		description: (fbquotecontents),
       		link: fbquotelink,
       		picture: 'http://balikcina.com/img/balikcina.jpg',
       		redirect_uri: 'balikcina.com'
      		},
      		function(response) {

      		}
      	);      		
 		}); // close fbfeedbox		

	});

});

});

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}