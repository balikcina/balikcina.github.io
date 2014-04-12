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
	return params()['key'];
});	

$.getJSON("http://vast-scrubland-9059.herokuapp.com/search.json?key=" + params()['key'], function( searchdata ) {

	for (var i=0; i < searchdata['players'].length; i++){ 
		playeravatar = searchdata['players'][i]['avatar_url'];
		playerprofile = searchdata['players'][i]['description'];
		playertags = searchdata['players'][i]['tags'];
		

		player_name = searchdata['players'][i]['name'];
		player_name = replaceAll('%20', ' ', player_name);
		player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		player_url = 'players.html?name=' + player_name
`
		$("#list-profiles").append(function(){		
			return 	"<ul class='list-group aligncenter'>"+
					"<div>"+
					"<img class='avatar img-thumbnail' src='" + playeravatar + "'>" +
					"</div>" +
					"<p> <a href='" + player_url + "'>" + player_name + "</a> </p>" +
					"<p>" + playerprofile + "<p><hr>";
		});	
    }

	for (var i=0; i < searchdata['quotes'].length; i++){ 
		quoteurl = searchdata['quotes'][i]['source_url'];
		quotecontents = searchdata['quotes'][i]["quote"];
		quotedate = searchdata['quotes'][i]["source_date"];
		quotelink = 'quotes.html?quote_id=' + searchdata['quotes'][i]['id'];
		playerlink = 'players.html?name=' + searchdata['quotes'][i]['player_name'];
		

		$("#player-quotes").append(function(){
 				
 			return 	"<li class='list-group-item'>" +
 					"<div class='well well-lg'><h4>" + quotecontents + "</h4></div>" +

 					"<div class='btn-group pull-right'>" +				
					"<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" + 					
 					"<a class='btn btn-default vermiddle' href='" + playerlink + "'role='button'>" + "<i class='fa fa-heart fa-lg'>&nbsp; </i>"  + searchdata['quotes'][i]['player_name'] + "</a>" +
 					"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					"<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					"</div>"+
					"<div class='clearfix'></div><br>" +
					"</li>";
 		});

 		$("#player-quotes").fadeIn('slow');		
    }


});


function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}