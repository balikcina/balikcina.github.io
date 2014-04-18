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
		quotetitle = data['quote'];
		quotedate = data["source_date"];
		quoteurl = data['source_url'];
		quote_id = data['id'];
		viewcount = data["view_count"];
		quotelink = 'quotes.html?quote_id=' + data['id'];
		quotecontext = data["context"];

		if(quotecontext != null && quotecontext != "" && quotecontext != " ") {
			thecontext = "<em style='font-size: 16px;'>On " + quotecontext + ": </em><p>";
		}

		else{
		 	thecontext = "";
		}
		

		$(document).attr('title', 'Balik Cina - ' + quotetitle);
		$('meta[name=og\\:title]').attr('content', 'Balik Cina!');
		$('meta[name=og\\:description]').attr('content', quotetitle);

		$("#popquote").html(function(){
			return quotetitle;
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
				return "<br><div id='commentbox" + quote_id + "' class='fb-comments' data-href='http://balikcina.com/" + $(location).attr('href') + "' data-width='" + width + "' data-numposts='10' data-colorscheme='light'></div>"
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

 					// "<div class='btn-group pull-left smallurl'>" +
 					// "<div class='well well-sm' style:'width:10px;'>" + window.location.href + "</div>"
 					// "</div>" +

 					"<div class='btn-group pull-right'>" +				
					// "<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 				// 	"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" +
 					"<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button' data-toggle='tooltip' data-placement='bottom' title='View Count'>" + "<i class='fa fa-eye'>&nbsp; </i>" + viewcount + "</i></a>" + 					
 					"<a class='btn btn-default vermiddle' href='" + playerlink + "'role='button'>" + "<i class='fa fa-heart fa-lg'>&nbsp; </i>"  + player_name + "</a>" +
 					"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button' data-toggle='tooltip' data-placement='bottom' title='Link to Article'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					// "<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					"</div>"+

					"<div class='clearfix'></div><br>" +

					"</div>";
 		});		

	});

});

});
