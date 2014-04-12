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

$.getJSON( "https://vast-scrubland-9059.herokuapp.com/quotes/" + params()['quote_id'] + ".json", function( data ) {
		quotedescription = data['source'];
		quotetitle = data['quote'];
		quotedate = data["source_date"];
		quoteurl = data['source_url'];
		quotelink = 'quotes.html?quote_id=' + data['id'];

		$(document).attr('title', 'Balik Cina - ' + quotetitle);
		$('meta[name=og\\:title]').attr('content', 'Balik Cina!');
		$('meta[name=og\\:description]').attr('content', quotetitle);

		$("#popquote").html(function(){
			return quotetitle;
		});

		$("#quotedescription").html(function(){
			return "<p>" + quotedescription + "</p>";
		});	

		for (var i=0; i < data['tags'].length; i++){
			$("#taglist").append(function(){
				return "<a href ='tags.html?tag=" + data['tags'][i] + "'>"+ data['tags'][i] + " </a>";
			});	
		}

		$.getJSON("https://vast-scrubland-9059.herokuapp.com/players/" + data['player_id'] + ".json", function(nplayerdata){
		
		player_name = nplayerdata["name"].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
		playerlink = 'players.html?name=' + player_name;
		
 		$("#quotebuttons").append(function(){ 				
 			return 	"<div class='btn-group pull-right'>" +				
					"<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" + 					
 					"<a class='btn btn-default vermiddle' href='" + playerlink + "'role='button'>" + "<i class='fa fa-heart fa-lg'>&nbsp; </i>"  + player_name + "</a>" +
 					"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					// "<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					"</div>"+
					"<div class='clearfix'></div><br>" +
					"</li>";
 		});		

	});

});


