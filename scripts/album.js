var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
     //add song number data to the element
      + '  <td class="song-item-number" data-song-number="' + songNumber+ '" >' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
   
   //add event listeners to template just right after it is created.
     var $row = $(template);
    
    var onHover = function(event) {
      var $songItem = $(this).find('.song-item-number');
      var songNumber = $songItem.attr('data-song-number');

      
          if (songNumber !== currentlyPlayingSong) {
            $songItem.html(playButtonTemplate);
          }
     };
   
     var offHover = function(event) {
      var $songItem = $(this).find('.song-item-number');
      var songNumber = $songItem.attr('data-song-number');
       
          if (songNumber !== currentlyPlayingSong) {
            $songItem.html(songNumber);
          }
     };
  
 

   
   var clickHandler = function() {
     var $songItem = $(this).find('.song-item-number');
     var songNumber = $songItem.attr('data-song-number');
 
     if (currentlyPlayingSong === null) {
         $songItem.html(pauseButtonTemplate);
         currentlyPlayingSong = songNumber;
         currentAlbumSong = currentAlbum.songs[songNumber-1];
        updatePlayerBarSong();
     } else if (currentlyPlayingSong === songNumber) {
         $songItem.html(playButtonTemplate);
         currentlyPlayingSong = null;
        currentAlbumSong = null;
         $('.main-controls .play-pause').html(playerBarPlayButton);
     } else if (currentlyPlayingSong !== songNumber) {
         var currentlyPlayingSongElement = $(document).find('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.html(songNumber);
         $songItem.html(pauseButtonTemplate);
         currentlyPlayingSong = songNumber;
        currentAlbumSong = currentAlbum.songs[songNumber-1];
        updatePlayerBarSong();//use data from the currentAlbumSong and currentAlbum to populate .currentlyplaying stuff and update maincontrols.
     }
 };

   
     $row.click(clickHandler); //get song-item-number
     $row.hover(onHover, offHover);

   return $row;
 };



 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     // #1
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
     // #3
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration); //indicate jQuery element.
        $albumSongList.append($newRow);
     }
 };



//ALL BUTTON ICONS
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var currentlyPlayingSong = null;
var currentAlbumSong = null;
var currentAlbum = null;


$(document).ready(function(){   
   setCurrentAlbum(albumGEM);
    $nextButton.click(nextSong);
 });

  var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };



 function updatePlayerBarSong(){
  $('.currently-playing .song-name').text(currentAlbumSong.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentAlbumSong.title + " - " + currentAlbum.artist);
  
  $('.main-controls .play-pause').html(playerBarPauseButton);
}


function nextSong(){

  //NODES OF CURRENT SONGITME AN  IT'S NUMBER.
  var $currentSongItem = $(document).find('[data-song-number="' + currentlyPlayingSong + '"]');
  var currentSongNumber = currentlyPlayingSong;
  $currentSongItem.html(currentSongNumber);//set current songitemnumber back to its songnumber
  var newSongNumber;
  
  if (currentSongNumber >= currentAlbum.songs.length){
    newSongNumber = 1;
    currentAlbumSong = currentAlbum.songs[0];
  }
  else{
    newSongNumber++;
    currentAlbumSong = currentAlbum.songs[newSongNumber - 1];
  }
    
  var $newSongNumberItem = $(document).find('[data-song-number="' + newSongNumber + '"]');
  $newSongNumberItem.html(pauseButtonTemplate);
  updatePlayerBarSong(); //updates the player to display a song and gives the player a pause button
}


function nextSong(){
  
  //have variable taht stores the current song to change it back to its songNumber. if last, wrap
  //set currentlyPlayingSong to  trackIndex(currentAlbum, currentSong) + 1 - done in order to updatePlayerBarSong() with new song info, and set the playersongBar to that info
  //change the newsongNumberItem using find() to pausebutton. 
  //
  
}

//Know what the previous song is. This includes the situation in which the next song is the first song, following the final song in the album (that is, it should "wrap" around).
//Use the trackIndex() helper function to get the index of the current song and then increment the value of the index.
//Set a new current song to currentSongFromAlbum.
//Update the player bar to show the new song.
//Update the HTML of the previous song's .song-item-number element with a number.
//Update the HTML of the new song's .song-item-number element with a pause button.

 

 
 
// //FIGURE OUT HOW TO CHECK IF THE BUTOTN HAS NO TARGET CLASSED PARENT.
//var findParentByClassName = function(element, targetClass) {
//    if (element) {
//        var currentParent = element.parentElement;
//        while (currentParent.className != targetClass && currentParent.className !== null) {//WHY  CHECK FOR NULL CLASSNAME?
//            currentParent = currentParent.parentElement;
//        }
//        return currentParent;
//    }
//};
//
//
// 