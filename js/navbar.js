$( document ).ready(function() {
    $("#gen-navbar").html(function(){
    return "<nav class='navbar navbar-default'>" +
           "<div class='container'>" +
               "<div class='navbar-header'>" +
                   "<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-responsive-collapse'>" +
                       "<span class='icon-bar'></span>" +
                       "<span class='icon-bar'></span>" +
                       "<span class='icon-bar'></span>" +
                   "</button>" +
                   "<a class='navbar-brand' href='index.html'><img src='./img/balikcinawhite.svg' height='100%'></a>" +
               "</div>" +

               "<div class='navbar-collapse collapse navbar-responsive-collapse'>" +
                   "<ul class='nav navbar-nav'>" +
                       "<li>" +
                           "<a href='government.html'>See Quotes</a>" +
                       "</li>" +
                       // "<li>" +
                       //     "<a href='opposition.html'>Opposition</a>" +
                       // "</li>" +
                       // "<li>" +
                       //     "<a href='publicfig.html'>Public Figures</a>" +
                       // "</li>" +
                       "<li>" +
                           "<a href='submit.html'>Submit a Quote</a>" +
                       "</li>" +                       // "<li>" +
                       //     "<a href='quotes.html'>Quote of the Day</a>" +
                       // "</li>" +
                        "<li>" +
                           "<a href='about.html'>About</a>" +
                        "</li>" +
                        "</ul>" +

                           // "<ul class='nav navbar-nav navbar-right'>"+
                        
                           // "<form class='navbar-form navbar-right' role='search'>" +
                           // "<div class='form-group'>"+
                           // "<input type='text' class='form-control' placeholder='Search'> " +
                           // "</div>"+
                           // "&nbsp;" +
                           // "<button type='submit' class='btn btn-default'><i class='fa fa-search'> </i> </button>" +
                           // "</form>"+                                              
                           // "</ul>" +

               "</div>" +

           "</div>";
       });
});        
        
      