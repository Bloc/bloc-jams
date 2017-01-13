 

/*reusable js html template CACHED - fast*/
var buildCollectionItemTemplate = function() {
     var template =    
    '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>';
  
  return $(template); //jQuery an object, so that the element that is added has jQuery methods. 
}


$(window).load(function(){
  
  /*GENERATE CONTENT USING TEMPLATE*/
  var $collectionContainer = $('.album-covers');
        /*empty it out*/
  $collectionContainer.empty();
  for(var i=0; i<12; i++){
    var $newThumbnail = buildCollectionItemTemplate();
    $collectionContainer.append($newThumbnail); 
  }  
});








 
 
 