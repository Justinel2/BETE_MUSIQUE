// BETE MUSIQUE WEBSITE
// Developed by Justine Lardeux for BETE MUSIQUE
// Design by BETE MUSIQUE
// Alternative Domain:
//https://justinel2.github.io/BETE_MUSIQUE/index.html


let $button;
let $subscribeButton;
let $subscribeImage;
let $metadataSpace;
let $audio;
let newSpace;


let on = true;
let bannerCounter = 0;

$(document).ready(setup);

function setup() {
  $button = $('#player-control');
  $metadataSpaceFirst = $('.banner-text');
  $subscribeButton = $('#subscribe-button');

  $audio = $('#audio');

  updateMetadata();
  animateBanner($metadataSpaceFirst);
  $button.on('click',handlePlayer);
  $subscribeButton.on('click',openSubscribe);

  setInterval(updateMetadata, 20000);
  setInterval(manageBannerIterations, 16000);
}

function handlePlayer() {
  if (on) {
    $(this).children('img').attr('src', 'icons/pause-bsn.gif');
    on = false;
    $audio.get(0).play();
  }
  else {
    $(this).children('img').attr('src', 'icons/play-bsn.gif');
    on = true;
    $audio.get(0).pause();
  }
}

function openSubscribe() {
  // let xhr = new XMLHttpRequest();
  //   xhr.onreadystatechange = function() {
  //     if (this.readyState === 4 && this.status === 200) {
  //       let content = this.responseText;
  //       $('#about').html(content);
  //     }
  //   }
  //   xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://mailchi.mp/2dc7aa6f91ea/betemusique/");
  //   xhr.send();
}

function updateMetadata() {
  $.ajax({
  url: "https://betemusique.airtime.pro/api/live-info-v2",
  beforeSend: function( xhr ) {
    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
  }
})
  .done(function( data ) {
    if ( console && console.log ) {
      let metadatas = JSON.parse(data);
      displayMetadata(metadatas);
      // console.log(metadatas);
    }
  });
}

function displayMetadata(m){
  if (m.shows.current) {
    if (m.shows.next.length != 0) {
      let text = "Live: " + m.shows.current.name + " (" + m.shows.current.starts.slice(11,16)
                + " - " + m.shows.current.ends.slice(11,16) + ") ~ Next: "  + m.shows.next[0].name;
      $metadataSpaceFirst.text(text);
    }
    else {
      let text = "Live: " + m.shows.current.name + " (" + m.shows.current.starts.slice(11,16)
                  + " - " + m.shows.current.ends.slice(11,16) + ")";
      $metadataSpaceFirst.text(text);
    }
  }
  else {
    if (m.shows.next.length != 0) {
      let text = "Off Air ~ Next: "  + m.shows.next[0].name + " (" + m.shows.next[0].starts.slice(11,16)
                  + " - " + m.shows.next[0].ends.slice(11,16) + ")";
      $metadataSpaceFirst.text(text);
    }
  }
}

function animateBanner(e){
    $(e).animate({marginLeft: '-100vw'}, 30000, "linear");
}

function manageBannerIterations() {
  newSpace = $metadataSpaceFirst.clone();
  newSpace.css("marginLeft","100vw");
  newSpace.appendTo( ".player-info");
  bannerCounter++
  if (bannerCounter >= 2) {
    $(".player-info").find("span:first-of-type").remove();
  }
  animateBanner(newSpace);
}
