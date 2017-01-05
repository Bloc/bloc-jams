  var pointsArray = document.getElementsByClassName('point');

/*var animatePoints = function(points){
  
  function revealPoint(index){
    points[index].style.opacity = 1;
    points[index].style.transform = "scaleX(1) translateY(0)"; 
    points[index].style.msTransform = "scaleX(1) translateY(0)"; 
    points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
  }
  
  forEach(points,revealPoint);

};*/

/*WHY DOESN'T THE ABOVE WORK? COULD NOT ANIMATE HMM....*/

var animatePoints = function(points){
  forEach(points,revealPoint);
}

function revealPoint(index){
    points[index].style.opacity = 1;
    points[index].style.transform = "scaleX(1) translateY(0)"; 
    points[index].style.msTransform = "scaleX(1) translateY(0)"; 
    points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
}



window.onload = function() {
  
   if (window.innerHeight > 950){
   animatePoints(pointsArray);
 }  
  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
 
  window.addEventListener('scroll', function(event){
    
    /*when would this ever be null?*/
    if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance)
      animatePoints(pointsArray);
  });
 }


