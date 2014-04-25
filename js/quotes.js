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
		submitname = data['submitted_by'];
		submitmail = data['submitted_by_email'];
		quotecontents = data['quote'];
		quotedate = 'Source: ' + data["source_date"];
		quoteurl = data['source_url'];
		quote_id = data['id'];
		viewcount = data["view_count"];
		viewcount = "Views: " + viewcount;
		quotelink = 'quotes.html?quote_id=' + data['id'];
		quotecontext = data["context"];
		encodedquote = replaceAll('\'', '%27', quotecontents) + ' #balikcina';
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

		// Commment Box
 		$("#showcomments").css( 'cursor', 'pointer' );

 		var clicks = 0;
 		$("#showcomments").click(function() {

 		if(clicks == 0){
			$("#commentshehe").append(function(){
      			width = $("#commentshehe").width();				  
				return "<div id='commentbox" + quote_id + "' class='fb-comments' data-href='" + $(location).attr('href') + "' data-width='" + width + "' data-numposts='10' data-colorscheme='light'></div>"
			});

			$('#commentbox'+ quote_id).css('display','none');

			FB.XFBML.parse($("#commentshehe")[0], function() {
   				$('#commentbox' + quote_id).show("slow");
			});				
		}

		else{
			$("#commentbox" + quote_id).toggle("slow");			
		}

		++clicks;			
		});

		$("#extlinks").html(function(){
			return "<p>" + "<a href='" + quoteurl + "' target='_blank'>" + quoteurl + "</a></p>";
		});	

		$("#quotedescription").html(function(){
			return "<p>" + quotedescription + "</p>";
		});	

		if(data['tags'].length == 0){
			$("#taglist").append(function(){
				return "None yet :(";
			});
		}	

		for (var i=0; i < data['tags'].length; i++){
			$("#taglist").append(function(){
				return "<a href ='tags.html?tag=" + data['tags'][i] + "'><span class='label label-info'>"+ data['tags'][i] + " </span></a>&nbsp;";
			});	
		}

		$("#submitname").append(function(){
			return "<p>" + submitname + "</p>" + "<p>" + submitmail + "</p>";
		});	

		$.getJSON("https://vast-scrubland-9059.herokuapp.com/players/" + data['player_id'] + ".json", function(nplayerdata){
		
		player_name = nplayerdata["name"].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
		playerlink = 'players.html?name=' + player_name;
		playeravatar = nplayerdata["avatar_url"]

		$("#top-quotes").html(function(){
			return '';
		});

 		$("#top-quotes").append(function(){
 				
 			return 	"<div class='quotepage'>" +

 					// Quotes sub-box
 				"<div class='row'>" + 					
 					"<div class='col-xs-3' id='box" + quote_id + "'>" +
 					"<a href='" + playerlink + "'>" + "<img class='img-thumbnail center' width='100%' src='" + playeravatar + "'></a>" +
 					"</div>" + // close avatar column


 					"<div class='col-xs-9'>"+ // open quote column
 					"<div class='topbar'>" +
 					"<h1>" + "<span id='player_name" + quote_id + "'>" + player_name + "</span>&nbsp;</h1>" + 							
	 				"</div>" +  // Close topbar

 					"<div class='midbar'>"+
 					thecontext +
 					"</div>" + // Close midbar

 					"<h2><div class='quotebar' id='quote" + quote_id + "'>" +
 					quotecontents +
 					"</div></h2><br>" + // Close quote bar
 					"</div>" + //close quote column
 				"</div>" + //close row
 					
 				"<div class='row'>" +
 					"<div class='col-xs-12'>" +

 					"<div class='bottombar'><h3>" +
 					// "<div class='btn-group-sm pull-left' id='leftbutton'" + quote_id + "'>" +		
 					//"<a class='alignleft' id='showcomments" + quote_id + "'><i class='fa fa-comment fa-lg'>&nbsp;</i></a> &nbsp;" +
 					//"<a href='" + quotelink + "'><i class='fa fa-ellipsis-h fa-lg'>&nbsp;</i>Details</a> &nbsp;" +
 					"<a href='" + quoteurl + "' target='_blank'><i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a> &nbsp;" +

 					"<a class='alignright' href='" + twitterlink + "' target='_blank'><i class='fa fa-twitter fa-lg'></i>&nbsp;</a>" +
 					"<a class='alignright' id='fbfeed" + quote_id + "'><i class='fa fa-facebook-square fa-lg'></i>&nbsp;</a>" +
 					// "<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					// 	"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" +
 					"</h3></div>" + // Close bottom bar
 					"<left><p><h3>" + viewcount + "</h3></p></left>" +

 					"<div class='clearfix'></div>" +
					"</div>" + //close bottom bar
					"</div>" + //close column
				"</div>" + //close row

					"<div id='hiddenlink" + quote_id + "'>" + quotelink + "</div>" + 

					"</div>" + // Close container
					"<div class='clearfix'></div>";	

 		});

		// Hide quote link, any better way to do this?
		$('#hiddenlink' + quote_id).css('display','none');

		// Ugly animation hehe
 		$("#top-quotes").fadeIn('slow');

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