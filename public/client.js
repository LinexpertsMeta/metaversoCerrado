// import { readFileSync} from "fs"
// import {io} from "socket.io-client"
// ES6 import or TypeScript
// import { io } from "socket.io-client";
// CommonJS
// const io = require("socket.io-client");
// console.log(io)
// var socket = io() || {};
// console.log(socket)
// var io = require('/node_modules/socket.io/client-dist/socket.io.js')
// import {_classCallCheck} from "/socket.io/socket.io"
// import io from "../node_modules/socket.io"
// import io from "socket.io"
var socket;
document.addEventListener('DOMContentLoaded', function(){
	const dominio = window.location.hostname;
	var socketAddress = "https://"+dominio+":8001"
	// var socket = io.connect(socketAddress, {'flash policy port':8001} );
	socket = io(socketAddress);
	cliente(socket);
})
function cliente(ioProp) {
	console.log('cliente')
	socket = ioProp;
	socket.isReady = false;
	var account;


	// const socket = io("https://localhost:8001/", {
	// 	key: fs.readFileSync('./assets/my_cert.key'),
	//     cert: fs.readFileSync('./assets/my_cert.crt')
	// });

	// window.addEventListener('load', function () {

	// 	var execInUnity = function (method) {
	// 		if (!socket.isReady) return;

	// 		var args = Array.prototype.slice.call(arguments, 1);

	// 		if (window.unityInstance != null) {
	// 			//fit formats the message to send to the Unity client game, take a look in NetworkManager.cs in Unity
	// 			window.unityInstance.SendMessage("NetworkManager", method, args.join(':'));

	// 		}

	// 	};//END_exe_In_Unity 
	// });//END_window_addEventListener

	socket.on('PONG', function (socket_id, msg) {

		var currentUserAtr = socket_id + ':' + msg;

		if (window.unityInstance != null) {

			window.unityInstance.SendMessage('NetworkManager', 'OnPrintPongMsg', currentUserAtr);

		}

	});//END_SOCKET.ON


	socket.on('JOIN_SUCCESS', function (id, name, posX, posY, posZ, model) {

		var currentUserAtr = id + ':' + name + ':' + posX + ':' + posY + ':' + posZ + ':' + model;

		if (window.unityInstance != null) {

			window.unityInstance.SendMessage('NetworkManager', 'OnJoinGame', currentUserAtr);

		}

	});//END_SOCKET.ON


	socket.on('SPAWN_PLAYER', function (id, name, posX, posY, posZ, model) {

		var currentUserAtr = id + ':' + name + ':' + posX + ':' + posY + ':' + posZ + ':' + model;

		if (window.unityInstance != null) {
			// sends the package currentUserAtr to the method OnSpawnPlayer in the NetworkManager class on Unity
			window.unityInstance.SendMessage('NetworkManager', 'OnSpawnPlayer', currentUserAtr);

		}

	});//END_SOCKET.ON



	socket.on('UPDATE_MOVE_AND_ROTATE', function (id, posX, posY, posZ, rotation) {

		var currentUserAtr = id + ':' + posX + ':' + posY + ':' + posZ + ':' + rotation;

		if (window.unityInstance != null) {
			window.unityInstance.SendMessage('NetworkManager', 'OnUpdateMoveAndRotate', currentUserAtr);
		}

	});//END_SOCKET.ON

	socket.on('UPDATE_PLAYER_ANIMATOR', function (id, key, value, type) {

		var currentUserAtr = id + ':' + key + ':' + value + ':' + type;


		if (window.unityInstance != null) {
			// sends the package currentUserAtr to the method OnUpdateAnim in the NetworkManager class on Unity
			window.unityInstance.SendMessage('NetworkManager', 'OnUpdateAnim', currentUserAtr);

		}

	});//END_SOCKET.ON


	socket.on('UPDATE_USER_LIST', function (id, name, publicAddress) {

		var currentUserAtr = id + ':' + name + ':' + publicAddress;

		if (window.unityInstance != null) {
			// sends the package currentUserAtr to the method OnUpdateUsersList in the NetworkManager class on Unity
			window.unityInstance.SendMessage('NetworkManager', 'OnUpdateUsersList', currentUserAtr);

		}

	});//END_SOCKET.ON

	socket.on('RECEIVE_OPEN_CHAT_BOX', function (host_id, guest_id) {
		var currentUserAtr = host_id + ':' + guest_id;

		if (window.unityInstance != null) {
			window.unityInstance.SendMessage('NetworkManager', 'OnReceiveOpenChatBox', currentUserAtr);
		}

	});//END_SOCKET.ON

	socket.on('UPDATE_MESSAGE', function (id, message) {
		var currentUserAtr = id + ':' + message;

		if (window.unityInstance != null) {
			window.unityInstance.SendMessage('NetworkManager', 'OnReceiveMessage', currentUserAtr);
		}

	});//END_SOCKET.ON



	socket.on('UPDATE_PRIVATE_MESSAGE', function (_chat_box_id, host_id, message) {
		var currentUserAtr = _chat_box_id + ":" + host_id + ':' + message;

		if (window.unityInstance != null) {
			window.unityInstance.SendMessage('NetworkManager', 'OnReceivePrivateMessage', currentUserAtr);
		}

	});//END_SOCKET.ON

	socket.on('UPDATE_CONFIRM_TRANSACTION', function (amount) {

		var currentUserAtr = amount + ':' + '';

		if (window.unityInstance != null) {
			// sends the package currentUserAtr to the method OnUpdateUsersList in the NetworkManager class on Unity
			window.unityInstance.SendMessage('NetworkManager', 'OnConfirmTransaction', currentUserAtr);

		}

	});//END_SOCKET.ON

	socket.on('SEND_USER_VOICE_INFO', function (id) {
		var currentUserAtr = id + ':' + '';

		if (window.unityInstance != null) {
			window.unityInstance.SendMessage('NetworkManager', 'OnUpdateUserVoiceInfo', currentUserAtr);
		}

	});//END_SOCKET.ON





	socket.on('USER_DISCONNECTED', function (id) {

		var currentUserAtr = id;

		if (window.unityInstance != null) {

			window.unityInstance.SendMessage('NetworkManager', 'OnUserDisconnected', currentUserAtr);


		}


	});//END_SOCKET.ON

	socket.on('UPDATE_CAMERA_PLAYER', function (id, texture) {
		var currentUserAtr = id + ":" + texture

		if (window.unityInstance != null) {
			window.unityInstance.SendMessage('NetworkManager', 'OnUpdateCameraPlayer', currentUserAtr);

		}
	})//END_SOCKET.ON








	window.onload = (e) => {
		mainFunction(1000);
	};


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
			return window.ethereum.request({ method: 'eth_getTransactionReceipt', params: [txhash] }).then(r => {
				if (r != null) return 'confirmed';
				else return checkTransactionLoop();
			});
		};

		return checkTransactionLoop();
	}
}

// export default cliente
// module.exports = cliente
