var soundID = "nosecurity";
createjs.Sound.alternateExtensions = ["mp3"];
// createjs.Sound.on("fileload", this.loadHandler, this);
createjs.Sound.registerSound("assets/nosecurity.mp3", soundID);
var instance = createjs.Sound.play(soundID);  //this is the instance object
var playPauseBtn = document.getElementById('play-btn');
//pause and play song
playPauseBtn.addEventListener('click', playPause);
// volumeControl.addEventListener('change', volumeUpDown(volumeControlVal));
function playPause(){
	// console.log("btn has been clicked", event)
     if(instance.playState == createjs.Sound.PLAY_SUCCEEDED){
     	 instance.stop()
     }else{
     	 instance.play(soundID)
     }
}

function volumeUpDown(volume){
    var instanceVolume = volume * 1/100;
	instance.volume = instanceVolume;	
	console.log(instanceVolume)	 

}









