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
var pauseButtonTemplate = '<a class="album-song-button><span class="ion-pause></span></a>';

var currentlyPlayingSong = null;


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

/*get node list of song rows*/
var songRows = document.getElementsByClassName('album-view-song-item');


window.onload = function() {   
   setCurrentAlbum(albumPicasso);
   
    /*iterate through the parent nodes of the element*/
     /*check classnames and return the node that has that classname*/
   
  function findParentByClassName(element, class){ 
     var current = element;
     if (current){
     /*if the current node is not of the desired class and has a parentNode*/
     while(current && current.className !== class && current.parentElement !== null){
       /* check if parentNode is of the desired class*/
            current = current.parentElement; //set current child to the current parent.
     }
     }
    if(current.parentElement === null && current.className !== class)
         return null;
    
    return current;
          
    }
     
     
   }
  
   songListContainer.addEventListener('mouseover', function(event){
     
     //EVENT BUBBLING:
      //The target property on the event object stores the DOM element where the event occurred.
              if (event.target.parentElement.className === 'album-view-song-item') {
                
                // Change the content from the number to the play button's HTML
                event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         }
   });
  
   //add event listeners to each songrow to change back buttonto number.
   for(var i=0; i<songRows.length;i++){
     songRows[i].addEventListener('mouseleave',function(event){
       
       // Selects first child element, which is the song-item-number
       this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
       
     });
     
     songRows[i].addEventListener('click', function(event) {
             // Event handler call
             clickHandler(event.target);
         });
   }
 }
 
 /*get the song number item for an element*/
var getSongItem = function(element) {
  
    /*check the class of the element*/
  switch(element.clasName){
    case 'album-view-song-item':
        return element.querySelector('.song-item-number');
    case 'song-item-number':
        return element;
    case 'song-item-title':
        return findParentByClassName(element,'song-item-number');
      
      /*why isnt this returning anything*/
    case'ion-play':
    case'ion-pause':
        return findParentByClassName(element,'song-item-number');
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
  else if(songItem.getAttribute('data-song-number') === currentPlayingSong){
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  }
  
  else if(songItem.getAttribute('data-song-number') !== currentPlayingSong){
    
    var currentlyPlayingSongElement = document.querySelector('[data-song-number= "' + currentlyPlayingSong + '"]')
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number'); 

  }
 };
 