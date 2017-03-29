window.onload = function() {
  if (navigator.mediaDevices) {
    console.log('getUserMedia supported.');

    var constraints = { audio: true };
    var chunks = [];
    var loading = null;
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {

      var mediaRecorder = new MediaRecorder(stream);
      // visualize(stream);
      var record = document.getElementById('play-btn');
      var stop = document.getElementById('stop-btn');
      record.onclick = function() {
        mediaRecorder.start(3000);
        console.log(mediaRecorder.state);
        console.log("recorder started");
        record.style.background = "red";
        record.style.color = "black";
      }

      stop.onclick = function() {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        record.style.background = "";
        record.style.color = "";
      }

      mediaRecorder.onstop = function(e) {
        console.log("IFLOADING_",loading);

        console.log("data available after MediaRecorder.stop() called.");

        var clipName = prompt('Enter a name for your sound clip');

        var clipContainer = document.createElement('article');
        var clipLabel = document.createElement('p');
        var audio = document.createElement('audio');
        var deleteButton = document.createElement('button');

        var chichi = document.getElementById('recorder');
        chichi.appendChild(clipContainer);
        console.log(clipContainer);
        clipContainer.className = "article-height";
        clipContainer.classList.add('clip');
        audio.setAttribute('controls', '');
        deleteButton.innerHTML = "Delete";
        clipLabel.innerHTML = clipName;

        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        audio.controls = true;

        var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=pcm'});
        chunks = [];//first possible window reinit chunks
        var audioURL = URL.createObjectURL(blob);
        audio.src = audioURL;
        console.log("recorder stopped");


        blobToBase64(blob, function(data) {
           console.log("insideCBconverttobuf___",data);
           postAudioBlob(data);
        });

        deleteButton.onclick = function(e) {
          evtTgt = e.target;
          evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        }
      }

      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
        console.log("ondataavailableStreamData_",e.data);
        loading = true;
        e.load = loading;
        console.log("maybe",e.load); 

        //add loading while streaming        
      }
    }).catch(function(err) {
      console.log('The following error occured: ' + err);
    })

    var postAudioBlob = function(obj) {
      var xhr = new XMLHttpRequest();
          xhr.open('POST', '/', true);
          xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
          xhr.send(obj);
    }

    var blobToBase64 = function(blob, cb) {
      var reader = new FileReader();
      reader.onload = function() {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        cb(base64);
      };
      reader.readAsDataURL(blob);
    };

 }//if mediaDevices


}//window.onload
