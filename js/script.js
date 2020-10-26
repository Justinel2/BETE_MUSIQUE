
// - Subsribe as frame in div instead of losing music
// - What's up with the live music - always schedule or?
// - Colors - faux bas with true white and black

//https://justinel2.github.io/BETE_MUSIQUE/index.html


let $button;
let $subscribeImage;
let $metadataSpace;
let $audio;
let newSpace;


let on = true;
let bannerCounter = 0;

$(document).ready(setup);

function setup() {
  $button = $('#player-control');
  $subscribeImage = $('#subscription');
  $metadataSpaceFirst = $('.banner-text');

  $audio = $('#audio');

  updateMetadata();
  animateBanner($metadataSpaceFirst);
  $button.on('click',handlePlayer);

  setInterval(updateMetadata, 20000);
  setInterval(manageBannerIterations, 6000);
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
      console.log(metadatas);
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
      console.log("noshow");
      $metadataSpaceFirst.text(text);
    }
  }
}

function animateBanner(e){
    $(e).animate({marginLeft: '-70vw'}, 12000, "linear");
    console.log("go");
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
