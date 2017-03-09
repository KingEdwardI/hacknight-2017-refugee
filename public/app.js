function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}

function appendText(imageURL,title, author,date, content, docLink){
   var imageDiv = "<div class='col-lg-8' id='imgdiv'><img class='sizeImg img-rounded' src='" + imageURL + "'/></div>" ;               // Create element with HTML  
   var contentDiv =  "<div class='col-md-4' id='texxxt'><span id='title'><h2><a href='" + docLink+ "'>" + title + "</a></h2></span><br><span id='author'>" + author + "</span><br><span><sub>" + date + "</sub></span><br><br><span id='article'>" + content + "</span></div>" ;  


   var box = "<div class='row'>" + imageDiv + contentDiv + "</div>"
   $("#container").append(box);      // Append the new elements
}



$( document ).ready(function(){

    $.get('http://localhost:8000/articles', function(data, status) {
         for(var obj of data){
            if(obj.image){
                appendText(obj.image, obj.title, obj.source, obj.pubDate, obj.snippet, obj.url);
            }else{
                appendText("http://cdn.dailyheadlines.net/wp-content/uploads/2016/12/f41a8570f98033234e38d8be706b27c6.jpg", obj.title, obj.source, obj.pubDate, obj.snippet, obj.url);
            }

            var link = "<a href='" + obj.url + "'>" + obj.title + "</a>";
            
            $('#mySidenav').append(link);
        
         }
    });
});

    var title = '<p>title</p>'; 
    var author = 'author';
    var text = 'text'; 
    var date = 'date'
