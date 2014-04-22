$.getJSON('https://vast-scrubland-9059.herokuapp.com/players.json', function(playersdata) {

  for (var i=0; i<playersdata.length; i++){

    var player_name = playersdata[i]["name"];
    var player_id = playersdata[i]["id"];
    var player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

    $("#fAuthor").append(function(){
      return "<option value='" + player_id + "'>"  + player_name + "</option>";
    });
  }

 });


$("#submitbutton").click(function(){
    var dataArray = $("#submitform").serializeArray();
    var datasaya = {};

    for (i=0; i<dataArray.length; i++) {
      datasaya[dataArray[i].name] = dataArray[i].value;
    }

     var data = {}
     data["quote"] = {}
     data["quote"]["quote"] = datasaya['fQuote']
     data["quote"]["player_id"] = datasaya['fAuthor']
     data["quote"]["source"] = datasaya['fDescription']
     data["quote"]["source_url"] = datasaya['fSource']
     data["quote"]["source_date"] = datasaya['fDate']
     data["quote"]["tag_list"] = datasaya['fTags']
     data["quote"]["context"] = datasaya['fContext']
     data["quote"]["submitted_by"] = datasaya['fName']
     data["quote"]["submitted_by_email"] = datasaya['fEmail']
    
     var jqxhr = $.ajax({type:"POST", 
                         url:"http://vast-scrubland-9059.herokuapp.com//quotes.json",
                         data:data
                        })
       jqxhr.done(function(data) {
         alert("Quote received!");
       })
       jqxhr.fail(function() {
         alert("Oops, something went wrong! Did you fill up everything?");
       })
})



