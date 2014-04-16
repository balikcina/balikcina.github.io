$.getJSON('https://vast-scrubland-9059.herokuapp.com/players.json', function(playersdata) {

  for (var i=0; i<playersdata.length; i++){

    var player_name = playersdata[i]["name"];
    var player_id = playersdata[i]["id"];
    var player_name = player_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

    $("#fAuthor").append(function(){
      alert(player_id);
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
     data["quote"]["source_date"] = "15-12-1992"
     data["quote"]["tag_list"] = "tag1,tag2"
     data["quote"]["context"] = "on context"
    
     var jqxhr = $.ajax({type:"POST", 
                         url:"http://vast-scrubland-9059.herokuapp.com//quotes.json",
                         data:data
                        })
       jqxhr.done(function(data) {
         alert( JSON.stringify(data) );
       })
       jqxhr.fail(function() {
         alert("fail");
       })
})



