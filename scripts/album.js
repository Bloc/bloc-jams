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
  
  function updatePlayerBarSong(){
  $('.currently-playing .song-name').text(currentAlbumSong.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentAlbumSong.title + " - " + currentAlbum.artist);
  
  $('.main-controls .play-pause').html(playerBarPauseButton);
}

   
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
 
var


//ALL BUTTON ICONS
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var playerBarPlayButton = '<span class="ion-play"></span>';

var currentlyPlayingSong = null;
var currentAlbumSong = null;
var currentAlbum = null;

$(document).ready(function(){   
   setCurrentAlbum(albumGEM);
 });
 

 

 
 
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