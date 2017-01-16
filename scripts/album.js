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
    
  
//  Why we need to parseInt - becasue of how strictComparison's works: it checks types
  
  ///first Hover - currentlyPlayingSong is an object (null);
  ///click handler - currentlyplayingSong is a string ( here currentlyPLayingSong  is set by songNumber(which is obtained by .attr --> string type).
  ///nextSong() = curretnlypLyaingSong is a number 
  ///strings and nuumbers dont' match, thus it will always change offhover
  
  //Solution: by changing all songNumbers to in a number, we change all instances of currentPlayingSong also to number

  
    var onHover = function(event) {
      var $songItem = $(this).find('.song-item-number');
      var songNumber = parseInt($songItem.attr('data-song-number'));
      
          if (songNumber !== currentlyPlayingSong) { ////not same type.
            $songItem.html(playButtonTemplate);
          }
     };
   
     var offHover = function(event) {
      var $songItem = $(this).find('.song-item-number');
      var songNumber = parseInt($songItem.attr('data-song-number'));
       
          if (songNumber !== currentlyPlayingSong) {
            $songItem.html(songNumber);
          }
     };
  
 

   
   var clickHandler = function() {
     var $songItem = $(this).find('.song-item-number');
     var songNumber = parseInt($songItem.attr('data-song-number'));
 
     if (currentlyPlayingSong === null) {
         $songItem.html(pauseButtonTemplate);
         setSong(songNumber);
         currentAudioSong.play();
         updateSeekBarWhileSongPlays();
         updatePlayerBarSong();
       
     } else if (currentlyPlayingSong === songNumber) {
        ////WHY DO WE HAVE TO CHECK IF IT IS PAUSED OR NOT? ISN'T IT USUALLY , wouldn't this only apply to themaincontrol? I think I get it
        if (currentAudioSong.isPaused()) {
                $songItem.html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentAudioSong.play();
                updateSeekBarWhileSongPlays();
            } else {  
                $songItem.html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentAudioSong.pause();   
            }        
     } else if (currentlyPlayingSong !== songNumber) {
       //current
         var currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSong);
         currentlyPlayingSongElement.html(currentlyPlayingSong); /////LOOK OVER THIS LINE IF ANY ERRORS
       
       //new
         setSong(songNumber);
        $songItem.html(pauseButtonTemplate);
        currentAudioSong.play();
        updateSeekBarWhileSongPlays();
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
var currentAudioSong = null;
 var currentVolume = 80;


  var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };



 function updatePlayerBarSong(){
  $('.currently-playing .song-name').text(currentAlbumSong.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentAlbumSong.title + " - " + currentAlbum.artist);
  
  $('.main-controls .play-pause').html(playerBarPauseButton);
}

//LOLS you don't need trackIndex.
function nextSong(){

  //NODES OF CURRENT SONGITME AN  IT'S NUMBER.
  var $currentSongItem = getSongNumberCell(currentlyPlayingSong);
  $currentSongItem.html(currentlyPlayingSong);
  
  if (currentlyPlayingSong >= currentAlbum.songs.length){
    setSong(1);
  }
  else{
    setSong(++currentlyPlayingSong);
    // could replace currentlyPlayingSong  with trackIndex(currentAlbum, currentAlbumSong)
  }
  
  var $newSongNumberItem = getSongNumberCell(currentlyPlayingSong);
  $newSongNumberItem.html(pauseButtonTemplate);
  currentAudioSong.play();
  updateSeekBarWhileSongPlays();
  updatePlayerBarSong(); //updates the player to display a song and gives the player a pause button
}
  
function previousSong(){

  //NODES OF CURRENT SONGITME AN  IT'S NUMBER.
  var $currentSongItem = getSongNumberCell(currentlyPlayingSong);
  $currentSongItem.html(currentlyPlayingSong);
  
  if (currentlyPlayingSong <= 1){
    setSong(currentAlbum.songs.length );
  }
  else{
    setSong(--currentlyPlayingSong);
    // could replace currentlyPlayingSong  with trackIndex(currentAlbum, currentAlbumSong)
  }
    
  var $newSongNumberItem = getSongNumberCell(currentlyPlayingSong);
  $newSongNumberItem.html(pauseButtonTemplate);
  currentAudioSong.play();
  updateSeekBarWhileSongPlays();
  updatePlayerBarSong(); //updates the player to display a song and gives the player a pause button
}

//SETS UP THE DATA NEEDED BY EACH COMPONENT OF BLOCJAMS
var setSong = function(songNumber) {
  
    if (currentAudioSong) {
         currentAudioSong.stop();
     }
     currentlyPlayingSong = parseInt(songNumber);
     currentAlbumSong = currentAlbum.songs[songNumber - 1];
     // #1
     currentAudioSong = new buzz.sound(currentAlbumSong.audioUrl, {
         // #2
         formats: ['mp3'],
         preload: true
     });
 };

function getSongNumberCell(number){
    return $(document).find('[data-song-number="' + number + '"]');
}

var setVolume = function(volume){
  if(currentAudioSong)
      currentAudioSong.setVolume(volume);
}

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
  
  //obtain value to constraint between 0 and 100
    var offsetXPercent = seekBarFillRatio * 100;
  
    // #1 : make sure it is between 0 and 100
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

//sets up functionality of SEEKBARS.
//handles events on the SEEKBARS.
var setupSeekBars = function(){
  var $seekBars = $('.player-bar .seek-bar');
  
  
  $seekBars.click(function(event){
    var offsetX = event.pageX - $(this).offset().left;
    var barWidth = $(this).width();  
    var seekBarFillRatio = offsetX/barWidth;
    updateSeekPercentage($(this), seekBarFillRatio);
  });
  
  
  $seekBars.find('.thumb').mousedown(function(event){
    var $currentSeekBar = $(this).parent();
    
    $(document).bind('mousemove.thumb', function(event){
       var offsetX = event.pageX - $currentSeekBar.offset().left;
      var barWidth = $currentSeekBar.width();  
      var seekBarFillRatio = offsetX/barWidth;
      updateSeekPercentage($currentSeekBar, seekBarFillRatio);
    });
             
    $(document).bind('mouseup.thumb', function(){
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
      });
  });
}

//will update seekbar while song plays
var updateSeekBarWhileSongPlays = function(){
  
  if(currentAudioSong){
    currentAudioSong.bind('timeupdate', function(event){
      var seekBarFillRatio = this.getTime()/this.getDuration();
      var $seekBar = $('.seek-control .seek-bar');

          updateSeekPercentage($seekBar, seekBarFillRatio);
    });
    
  }
}


 
//ADD ANYTHING THAT REQUIRES A MANIPULABLE DOM STRUCTURE
 $(document).ready(function(){   
    setCurrentAlbum(albumPicasso);
    $nextButton.click(nextSong);
    $previousButton.click(previousSong);
    setupSeekBars(); 
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