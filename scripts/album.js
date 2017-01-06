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
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
   
     return template;
 };

//creates an album with its song list
 var setCurrentAlbum = function(album){
   
     // #1 get handles for each element
   var albumTitle = document.getElementsByClassName('album-view-title')[0];
   var albumArtist = document.getElementsByClassName('album-view-artist')[0];
   var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
   var albumImage = document.getElementsByClassName('album-cover-art')[0];
   var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
   
     // #2 set album info
   albumImage.setAttribute('src', album.albumArtUrl);
   albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
   albumTitle.firstChild.nodeValue = album.title;
   albumArtist.firstChild.nodeValue = album.artist;
 
     // #3 clear song list
    albumSongList.innerHTML = '';
 
     // #4
   for(var i=0; i<album.songs.length; i++){
     albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
   } 
 
 };

undefinedfd
f
DocumentFragmentd
falsedf
d

 window.onload = function() {

  setCurrentAlbum(albumGEM);
  
  var albums = [albumGEM,albumMarconi,albumPicasso];  
  var index = 0;
   
  albumImage.addEventListener("click",function(event){
     setCurrentAlbum(albums[(index+4)%3]);
    i++;
  }); 
}


