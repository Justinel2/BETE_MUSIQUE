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
let animationMargin;
let text;
// let iterationNumber;

let on = true;
let bannerCounter = 0;

$(document).ready(setup);

function setup() {
  $button = $('#player-control');
  $metadataSpaceFirst = $('.banner-text');
  $subscribeButton = $('#subscribe-button');
  animationMargin = $('#audio').css("margin-left");

  $audio = $('#audio');

  updateMetadata();
  animateBanner($metadataSpaceFirst);
  $button.on('click',handlePlayer);
  $subscribeButton.on('click',openSubscribe);

  setInterval(updateMetadata, 22000);
  setInterval(manageBannerIterations, 20000);
}

function handlePlayer() {
  if (on) {
    $(this).children('img').attr('src', 'icons/pause-bsn.png');
    on = false;
    $audio.get(0).play();
  }
  else {
    $(this).children('img').attr('src', 'icons/play-bsn.png');
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
  text;
  if (m.shows.current) {
    if (m.shows.next.length != 0) {
      text = "Live: " + m.shows.current.name + " (" + m.shows.current.starts.slice(11,16)
                + " - " + m.shows.current.ends.slice(11,16) + ") ~ Next: "  + m.shows.next[0].name;
      $metadataSpaceFirst.text(text);
    }
    else {
      text = "Live: " + m.shows.current.name + " (" + m.shows.current.starts.slice(11,16)
                  + " - " + m.shows.current.ends.slice(11,16) + ")";
      $metadataSpaceFirst.text(text);
    }
  }
  else {
    if (m.shows.next.length != 0) {
      text = "Off Air ~ Next: "  + m.shows.next[0].name + " (" + m.shows.next[0].starts.slice(11,16)
                  + " - " + m.shows.next[0].ends.slice(11,16) + ")";
      $metadataSpaceFirst.text(text);
    }
  }
}

function animateBanner(e){
  if (animationMargin === "-200px") {
    $(e).animate({left: '-800vw'}, 64000, "linear");
  }
  else {
    $(e).animate({left: '-200vw'}, 32000, "linear");
  }
}

function manageBannerIterations() {

  //Get position of the last letter
  // var lastChar = text[text.length -1];
  // console.log(lastChar.offset.left);

  let rightMargin = $metadataSpaceFirst.css("left");
  console.log(rightMargin);

  newSpace = $metadataSpaceFirst.clone();
  newSpace.css("left","50%");
  newSpace.appendTo( ".player-info");
  bannerCounter++
  if (bannerCounter >= 2) {
    $(".player-info").find("span:first-of-type").remove();
  }
  animateBanner(newSpace);

}
