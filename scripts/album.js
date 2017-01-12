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
     albumArtUrl: 'assets/images/album_covers/GEMALBUM.png',
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
 
     return template;
 };


 var setCurrentAlbum = function(album) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

//THE BUTTON ICONS
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
/*get node list of song rows*/
var songRows = document.getElementsByClassName('album-view-song-item');


window.onload = function(){   
   setCurrentAlbum(albumPicasso);
   
    /*iterate through the parent nodes of the element*/
     /*check classnames and return the node that has that classname*/
   songListContainer.addEventListener('mouseover', function(event){
     //EVENT BUBBLING:
      //The target property on the event object stores the DOM element where the event occurred.
     var songItem = getSongItem(event.target);
     var songNumber = songItem.getAttribute('data-song-number');
     
     //what's the point of checking if the parent class is album-view-song-item?
              if (event.target.parentElement.className === 'album-view-song-item' &&  songNumber !== currentlyPlayingSong) {
                // Change the content from the number to the play button's HTML
                songItem.innerHTML = playButtonTemplate;
         }
   });
  
   //add event listeners to each songrow to change back buttonto number.
   for(var i=0; i<songRows.length;i++){
     
     //WHY CAN'T WE JUST USE EVENT BUBBLING FOR THIS?   
     songRows[i].addEventListener('mouseleave',function(event){
       
       // get songnumber node and get the songNumber
       var songItem = getSongItem(event.target);
       var songNumber = songItem.getAttribute('data-song-number');
      

       /*only change back to number if it is not the currentlyPlayingSong*/
       if(songNumber !== currentlyPlayingSong)
          songItem.innerHTML = songNumber;
     });
     
     songRows[i].addEventListener('click', function(event) {
             // Event handler call
             clickHandler(event.target);
         });
   }
 }

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        /* why do nothing here?*/
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};



var clickHandler = function(targetElement) {
  
  //GET THE SONG NUMBER ITEM OF THE ROW THAT THE CLICKED ELEMENT IS IN
    var songItem = getSongItem(targetElement);  
  
  /*if song is not playing*/
  if(currentlyPlayingSong === null){
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number'); 
  }
  /*if song is already playing, pause it */
  else if(songItem.getAttribute('data-song-number') === currentlyPlayingSong){
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  }
  
  else if(songItem.getAttribute('data-song-number') !== currentlyPlayingSong){
    
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]')
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number'); 

  }
 };

  function findParentByClassName(element, targetClass){ 
     if (element){
        var parent = element.parentElement;
     /*if the current node is not of the desired class and has a parentNode*/
       while(parent.className !== targetClass){
          parent = parent.parentElement; //set current child to the current parent.
       }
      return parent;
     }  
  }

 

 
 
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