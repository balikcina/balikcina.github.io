$.getJSON('https://vast-scrubland-9059.herokuapp.com/players.json', function(playersdata) {

	for (var i=0; i<playersdata.length; i++){

		var player_name = playersdata[i]["name"];
		var player_url = 'players.html?name=' + player_name
		var player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

 		$("#list-names").append(function(){
 			return "<p> <a href='" + player_url + "'>" + player_name + "</a> </p>";
 		});

 	}
 });

function loop(quotesdata, quote_id)
{	
    $.getJSON('https://vast-scrubland-9059.herokuapp.com/players/' + quotesdata[quote_id]['player_id'] + '.json', function(nplayerdata){
		var player_name = nplayerdata["name"].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});;
		
		quoteurl = quotesdata[quote_id]['source_url'];
		quotecontents = quotesdata[quote_id]["quote"];
		quotedate = quotesdata[quote_id]["source_date"];
		quotelink = 'quotes.html?quote_id=' + quotesdata[quote_id]['id'];
		playerlink = 'players.html?name=' + player_name;		

 		$("#top-quotes").append(function(){
 				
 			return 	"<li class='list-group-item'>" +
 					"<div class='well well-lg'><h4>" + quotecontents + "</h4></div>" +
 					"<div class='btn-toolbar' role='toolbar'>" +
 					"<div class='btn-group pull-left'>" +				
					"<button type='button' class='btn btn-default'><i class='fa fa-twitter fa-lg'></i></button>" +
 					"<button type='button' class='btn btn-default'><i class='fa fa-facebook-square fa-lg'></i></button>" +
 					"</div>"+ 
 					"<div class='btn-group pull-right'>" +					
 					"<a class='btn btn-default vermiddle' href='" + playerlink + "'role='button'>" + "<i class='fa fa-heart fa-lg'>&nbsp; </i>"  + player_name + "</a>" +
 					"<a class='btn btn-default vermiddle' href='" + quoteurl + "'role='button'>" + "<i class='fa fa-clock-o fa-lg'>&nbsp; </i>" + quotedate + "</a>" +
					"<a class='btn btn-default vermiddle' href='" + quotelink + "'role='button'>See Details</a>" +
					"</div>"+
					"<div class='clearfix'></div><br>" +
					"</div></li>";
 		});		

 		$("#top-quotes").fadeIn('slow');

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
