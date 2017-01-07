  var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points){

  function revealPoint(point){
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)"; 
    point.style.msTransform = "scaleX(1) translateY(0)"; 
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
  }
  
  forEach(points,revealPoint); //this is passing in the point

}

/*WHY DOESN'T THE ABOVE WORK? COULD NOT ANIMATE HMM....*/


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


