 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };
  var albumGEM = {
     title: 'Heartbeat',
     artist: 'G.E.M.',
     label: 'HummingBird',
     year: '2015',
     albumArtUrl: 'assets/images/album_covers/GEMalbum.jpg',
    songs: [
         { title: 'Heartbeat', duration: '5:56' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
    
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
     var songNumber = $(this).attr('data-song-number');
 
     if (currentlyPlayingSong === null) {
         $(this).html(pauseButtonTemplate);
         currentlyPlayingSong = songNumber;
     } else if (currentlyPlayingSong === songNumber) {
         $(this).html(playButtonTemplate);
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songNumber) {
         var currentlyPlayingSongElement = $(document).find('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.html(songNumber);
         $(this).html(pauseButtonTemplate);
         currentlyPlayingSong = songNumber;
     }
 };
   
     $row.find('.song-item-number').click(clickHandler); //get song-item-number
     $row.hover(onHover, offHover);

   return $row;
 };


 var setCurrentAlbum = function(album) {
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





//THE BUTTON ICONS
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

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