var socket = io() || {};
socket.isReady = false;
var account;
var isShareScreen = false

window.addEventListener('load', function() {

	var execInUnity = function(method) {
		if (!socket.isReady) return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		
		if(window.unityInstance!=null)
		{
		  //fit formats the message to send to the Unity client game, take a look in NetworkManager.cs in Unity
		  window.unityInstance.SendMessage("NetworkManager", method, args.join(':'));
		
		}
		
	};//END_exe_In_Unity 

	
	socket.on('PONG', function(socket_id,msg) {
				      		
	  var currentUserAtr = socket_id+':'+msg;
	  
	 if(window.unityInstance!=null)
		{
		 
		  window.unityInstance.SendMessage ('NetworkManager', 'OnPrintPongMsg', currentUserAtr);
		
		}
	  
	});//END_SOCKET.ON

					      
	socket.on('JOIN_SUCCESS', function(id,name,posX,posY,posZ,model) {
				      		
	  var currentUserAtr = id+':'+name+':'+posX+':'+posY+':'+posZ+':'+model;
	  
	   if(window.unityInstance!=null)
		{
		 
		  window.unityInstance.SendMessage ('NetworkManager', 'OnJoinGame', currentUserAtr);
		
		}
	  
	});//END_SOCKET.ON
	
		
	socket.on('SPAWN_PLAYER', function(id,name,posX,posY,posZ,model) {
	
	    var currentUserAtr = id+':'+name+':'+posX+':'+posY+':'+posZ+':'+model;
		
		if(window.unityInstance!=null)
		{
	     // sends the package currentUserAtr to the method OnSpawnPlayer in the NetworkManager class on Unity
		  window.unityInstance.SendMessage ('NetworkManager', 'OnSpawnPlayer', currentUserAtr);
		
		}
		
	});//END_SOCKET.ON
	

	
    socket.on('UPDATE_MOVE_AND_ROTATE', function(id,posX,posY,posZ,rotation) {
		
	    var currentUserAtr = id+':'+posX+':'+posY+':'+posZ+':'+rotation;
		 	
		if(window.unityInstance!=null)
		{
		   window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateMoveAndRotate',currentUserAtr);
		}
		
	});//END_SOCKET.ON
	
		socket.on('UPDATE_PLAYER_ANIMATOR', function(id,key,value,type) {
	
	     var currentUserAtr = id+':'+key+':'+value+':'+type;
		
		
		if(window.unityInstance!=null)
		{
	     // sends the package currentUserAtr to the method OnUpdateAnim in the NetworkManager class on Unity
		  window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateAnim', currentUserAtr);
		
		}
		
	});//END_SOCKET.ON
	
	
	socket.on('UPDATE_USER_LIST', function(id,name,publicAddress) {
	
	    var currentUserAtr = id+':'+name+':'+publicAddress;
		
		if(window.unityInstance!=null)
		{
	     // sends the package currentUserAtr to the method OnUpdateUsersList in the NetworkManager class on Unity
		  window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateUsersList', currentUserAtr);
		
		}
		
	});//END_SOCKET.ON
	
	 socket.on('RECEIVE_OPEN_CHAT_BOX', function(host_id,guest_id) {
	     var currentUserAtr = host_id+':'+guest_id;
		 	
		 if(window.unityInstance!=null)
		{
		   window.unityInstance.SendMessage ('NetworkManager', 'OnReceiveOpenChatBox',currentUserAtr);
		}
		
	});//END_SOCKET.ON
	
	  socket.on('UPDATE_MESSAGE', function(id,message) {
	     var currentUserAtr = id+':'+message;
		 	
		 if(window.unityInstance!=null)
		{
		   window.unityInstance.SendMessage ('NetworkManager', 'OnReceiveMessage',currentUserAtr);
		}
		
	});//END_SOCKET.ON
	

	
    socket.on('UPDATE_PRIVATE_MESSAGE', function(_chat_box_id,host_id,message) {
	     var currentUserAtr = _chat_box_id+":"+host_id+':'+message;
		 	
		 if(window.unityInstance!=null)
		{
		   window.unityInstance.SendMessage ('NetworkManager', 'OnReceivePrivateMessage',currentUserAtr);
		}
		
	});//END_SOCKET.ON
	
	socket.on('UPDATE_CONFIRM_TRANSACTION', function(amount) {
	
	    var currentUserAtr = amount+':'+'';
		
		if(window.unityInstance!=null)
		{
	     // sends the package currentUserAtr to the method OnUpdateUsersList in the NetworkManager class on Unity
		  window.unityInstance.SendMessage ('NetworkManager', 'OnConfirmTransaction', currentUserAtr);
		
		}
		
	});//END_SOCKET.ON
	
		socket.on('SEND_USER_VOICE_INFO', function(id) {
	     var currentUserAtr = id+':'+'';
		 	
		 if(window.unityInstance!=null)
		{
		   window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateUserVoiceInfo',currentUserAtr);
		}
		
	});//END_SOCKET.ON
	
	
	
	
		        
	socket.on('USER_DISCONNECTED', function(id) {
	
	     var currentUserAtr = id;
		 
		if(window.unityInstance!=null)
		{
		  
		 window.unityInstance.SendMessage ('NetworkManager', 'OnUserDisconnected', currentUserAtr);
		 
		 
		}
		
		
	});//END_SOCKET.ON
	
	socket.on('UPDATE_CAMERA_PLAYER', function(id, texture){
		var currentUserAtr = id+":"+texture
		
		if(window.unityInstance!=null){
			window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateCameraPlayer', currentUserAtr);

		}
	})//END_SOCKET.ON
	

	socket.on('TOGGLE_SHARESCREEN_CLIENT',function(){
		isShareScreen = !isShareScreen
		// while(isShareScreen){
			ShareScreen(1000);
		// 	setTimeout(function(){
		// 		console.log('transmitiendo pantalla')
		// 	}, 2000)
		// }

		
		
	});//END_SOCKET.ON

});//END_window_addEventListener



window.onload = (e) => {
	mainFunction(1000);
	// if(isShareScreen){
	// 	ShareScreen(1000)
	// }
  };

  const data = {
    capture: false,
    stream: null,
    buffer: [],
    iMediaRecorder: null
  }

  async function ShareScreen(timeOut){
		// const config = {
		// 	video: {
		// 	cursor: 'always'
		// 	},
		// 	audio: true
		// };
		// data.buffer = [];
		// data.stream = await navigator.mediaDevices.getDisplayMedia(config);
		// //preview.srcObject = data.stream;
		// if (data.stream) {
		// 	if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
		// 	throw 'No video format support';
		// 	}
		// 	data.iMediaRecorder = new MediaRecorder(data.stream, { mimeType: 'video/webm;codecs=vp8' });
		// 	data.iMediaRecorder.ondataavailable = evt => evt && evt.data && evt.data.size > 0 && data.buffer.push(evt.data);
		// 	data.iMediaRecorder.onstop = () => {
		// 	data.capture = !data.capture;
		// 	data.stream && buttonStatus.call(this, data);
		// 	stopStream(data);
		// 	console.log(data.buffer)
		// 	socket.emit('RECIEVE_MESSAGE',data.buffer)
		// 	}
		// 	data.iMediaRecorder.start(10);
		// }
		// else {
		// 	throw `There aren't data to save`;
		// }


		navigator.mediaDevices.getDisplayMedia({video: true}).then(function(stream){
			var mediaRecorder = new MediaRecorder(stream)
			mediaRecorder.start()
			var videoChunks = []

			mediaRecorder.ondataavailable = function (event){
				videoChunks.push(event.data)
			}
			
			mediaRecorder.addEventListener("stop", function(){
				var videoBlob = new Blob(videoChunks, {type : 'video/webm'})
				
				videoChunks = []
				
				var fileReader = new FileReader()
				fileReader.readAsDataURL(videoBlob)
				fileReader.onload = function(){
				var base64StringVideo = fileReader.result
					
					if(window.unityInstance !=null){
						console.log("Transitiendo :v")
						window.unityInstance.SendMessage("NetworkManager", "OnShareScreen", base64StringVideo)
					}

				}
				mediaRecorder.start()

				setTimeout(function(){
					mediaRecorder.stop()
				}, timeOut)
			})
			//mediaRecorder.stop()

			//mediaRecorder.start()

			setTimeout(function(){
				mediaRecorder.stop()
			}, timeOut)
		})
  }
  
  
  function mainFunction(time) {
  
  
	navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
	  var madiaRecorder = new MediaRecorder(stream);
	  madiaRecorder.start();
  
	  var audioChunks = [];
  
	  madiaRecorder.addEventListener("dataavailable", function (event) {
		audioChunks.push(event.data);
	  });
  
	  madiaRecorder.addEventListener("stop", function () {
		var audioBlob = new Blob(audioChunks);
  
		audioChunks = [];
  
		var fileReader = new FileReader();
		fileReader.readAsDataURL(audioBlob);
		fileReader.onloadend = function () {
   
  
		  var base64String = fileReader.result;
		  socket.emit("VOICE", base64String);
  
		};
  
		madiaRecorder.start();
  
  
		setTimeout(function () {
		  madiaRecorder.stop();
		}, time);
	  });
  
	  setTimeout(function () {
		madiaRecorder.stop();
	  }, time);
	});
  
  
   socket.on("UPDATE_VOICE", function (data) {
	  var audio = new Audio(data);
	  audio.play();
	});
	
	
  }
  function checkTransactionconfirmation(txhash) {

	let checkTransactionLoop = () => {
	  return  window.ethereum.request({method:'eth_getTransactionReceipt',params:[txhash]}).then(r => {
		if(r !=null) return 'confirmed';
		else return checkTransactionLoop();
	  });
	};

	return checkTransactionLoop();
  }

