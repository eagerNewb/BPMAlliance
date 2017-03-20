var soundID = "nosecurity";

function loadSound () {
  createjs.Sound.registerSound("assets/nosecurity.mp3", soundID);
}

function playSound (soundfile, callback) {
   createjs.Sound.play(soundID);
}

// #on.click.function(event){
   
// }
