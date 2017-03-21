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
var audio = document.getElementById('my-audio');
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var ctx = document.getElementById('canvas-ctx');
var canvasCtx = ctx.getContext('2d');

navigator.mediaDevices.getUserMedia({ audio: true, video:false}).then(function(stream) {
   var source = audioCtx.createMediaStreamSource(stream);
   var analyser = audioCtx.createAnalyser();
   source.connect(analyser);

  analyser.fftSize = 256;

  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  analyser.getByteTimeDomainData(dataArray);
  canvasCtx.clearRect(0,0, canvasCtx.width, canvasCtx.height);
  function draw() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, ctx.width, ctx.height);


      var barWidth = (ctx.width / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
      for(var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]/2;
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x,ctx.height-barHeight/2,barWidth,barHeight);
        x += barWidth + 1;
      }
  };
  draw();
  /* use the stream */
}).catch(function(err) {
  /* handle the error */
});

// var source = audioCtx.createMediaElementSource(audio);
