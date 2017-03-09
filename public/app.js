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

/////jQuery objects
var articleArray = [
    {author: 'Jeff Goldblum',
    title: 'Jeff Goldblum', 
    image: 'image.jpg'
},
 {author: 'Jeff Goldblum',
    title: 'Jeff Goldblum', 
    image: 'image.jpg'
},
 {author: 'Jeff Goldblum',
    title: 'Jeff Goldblum', 
    image: 'image.jpg'
    }
    ]
function appendText(imageURL,title, author,date, content){
   var imageDiv = "<div class='col-lg-8' id='imgdiv'><img class='img-rounded' src='" + imageURL + "'/></div>" ;               // Create element with HTML  
   var contentDiv =  "<div class='col-md-4' id='texxxt'><span id='title'><h2>" + title + "</h2></span><br><span id='author'>" + author + "</span><br><span><sub>" + date + "</sub></span><br><br><span id='article'>" + content + "</span></div>" ;  


   var box = "<div class='row'>" + imageDiv + contentDiv + "</div>"
   $("#container").append(box);      // Append the new elements
}

$( document ).ready(function(){
    appendText("http://cdn.dailyheadlines.net/wp-content/uploads/2016/12/f41a8570f98033234e38d8be706b27c6.jpg", "Kids with Jeff", "sarah", "march 8th 2017", "long body of text about the world hopefully its true" ); 
});

    var title = '<p>title</p>'; 
    var author = 'author';
    var text = 'text'; 
    var date = 'date'
