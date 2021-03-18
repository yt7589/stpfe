import kurentoUtils from './kurento-utils'  // npm install kurento-utils
const webRTCForVideo = {}

// 创建与后端的视频通话用websocket通信，视频通话必须用https
let wss = new WebSocket('ws://192.168.2.68:8443/player');

export var videoInput;
export var videoOutput;
var videourl;
var cover;
var webRtcPeer;

webRTCForVideo.setParams=  function setParams( output,videoUrl,originImage) {
	videoOutput = output;
	videourl = videoUrl;
	cover = originImage;
}
// 发送消息
function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	console.log('Sending message: ' + jsonMessage);
    wss.send(jsonMessage);
}
// 收到消息
wss.onmessage = function(message) { // eslint-disable-line no-unused-vars
	var parsedMessage = JSON.parse(message.data);
	switch (parsedMessage.id) {
		case 'startResponse':
			startResponse(parsedMessage);
			break;
		case 'error':
			// if (state == I_AM_STARTING) {
			// 	setState(I_CAN_START);
			// }
			onError('Error message from server: ' + parsedMessage.message);
			break;
		case 'playEnd':
			// playEnd();
			break;
		case 'videoInfo':
			// showVideoData(parsedMessage);
			break;
		case 'iceCandidate':
			webRtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
				if (error)
					return console.error('Error adding candidate: ' + error);
			});
			break;
		case 'seek':
			console.log (parsedMessage.message);
			break;
		case 'position':
			// document.getElementById("videoPosition").value = parsedMessage.position;
			break;
		case 'iceCandidate':
			break;
		default:
			if (state == I_AM_STARTING) {
				setState(I_CAN_START);
			}
			onError('Unrecognized message', parsedMessage);
		}
}
// 发起呼叫
webRTCForVideo.start = function start() {
	showSpinner(video);
	var userMediaConstraints = {
		audio : false,
		video : true
	}
	var options = {
		remoteVideo : videoOutput,
		mediaConstraints: userMediaConstraints,
		onicecandidate : onIceCandidate,
	}
	// 调js库，启用WebRtc通信
	webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
			function(error) {
				if (error) {
					return console.error(error);
				}
				webRtcPeer.generateOffer(onOffer);
			});
}
// 向后端发送呼叫信息
function onOffer(error, offerSdp) {
	if (error)
		return console.error('Error generating the offer');
	console.log('Invoking SDP offer callback function');
	var message = {
		id : 'start',
		sdpOffer : offerSdp,
		videourl : videourl
	}
	sendMessage(message);
}
// 向服务器发送 onIceCandidate 消息
function onIceCandidate(candidate) {
	console.log("Localcandidate" + JSON.stringify(candidate));
	var message = {
		id : 'onIceCandidate',
		candidate : candidate
	}
	sendMessage(message);
}
function startResponse(message) {
	console.log('SDP answer received from server. Processing ...');

	webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
		if (error)
			return console.error(error);
	});
}
function callResponse(message) {
	if (message.callResponse == 'notOnline') { // 对方不在线
		console.info('Your friend is not online. Closing call');
		// stop();
	} else if(message.callResponse == 'isBusy' ) { // 对方正忙
		console.info('Your friend is busy. Closing call');
		stop();
	} else if(message.callResponse == 'rejected') {
		console.info('You are rejected.');
		stop();
	} else {
		webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
			if (error)
				return console.error(error);
		});
	}
}
// 收到呼叫信息
// function incomingCall(message) {
// 	//if (confirm('User ' + message.from + ' is calling you. Do you accept the call?')) {
// 		// showSpinner(videoInput, videoOutput);
// 	// 用户接受或者拒接。
// 	var isAccepted = true;
// 	if(isAccepted) { // 这是接受情况
// 		callerIDtmp = message.callerID;
// 		console.log("incomingCall accepted");

// 		// 添加自己的中继服务器的配置，否则会默认指向谷歌的服务器
// 		var iceservers = {
// 			"iceServers": [
// 			{
// 				urls:"stun:your_server_ip:3478"
// 			},
// 			{
// 				urls: ["turn:your_server_ip:3478"],
// 				username: "kurento",
// 				credential: "kurento"
// 			}
// 			]
// 		};

// 		var options = {
// 			localVideo: videoInput,
// 			remoteVideo: videoOutput,
// 			onicecandidate: onIceCandidate,
// 		};
		
// 		webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
// 				function(error) {
// 					if (error) {
// 						return console.error(error);
// 					}
// 					webRtcPeer.generateOffer(onOfferIncomingCall);
// 				});

// 	} else {
// 		var response = {
// 			type : 'incomingCallResponse',
// 			callerID : message.callerID,
// 			callResponse : 'rejected'
// 		};
// 		sendMessage(response);
// 		stop();
// 	}
// }

// // 向后端发送接受信息
// function onOfferIncomingCall(error, offerSdp) {
// 	if (error)
// 		return console.error("Error generating the offer");
// 	var response = {
// 		type : 'incomingCallResponse',
// 		callerID : callerIDtmp,
// 		callResponse : 'accepted',
// 		sdpOffer : offerSdp
// 	};
// 	sendMessage(response);
// }
function startCommunication(message) {
	webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
		if (error)
			return console.error(error);
	});
}
webRTCForVideo.stop = function stop() {
	console.log('Stopping video ...');
	if (webRtcPeer) {
		webRtcPeer.dispose();
		webRtcPeer = null;
		var message = {
			type : 'stop'
		}
		sendMessage(message);
	}
	hideSpinner(videoOutput);
}
export function login(loginID) {
	var loginMessage = {
		type: 'login',
		userID: loginID
	};
	sendMessage(loginMessage);
}
function onError() {
}
// 加载动画
function showSpinner() { // eslint-disable-line no-unused-vars
	for (var i = 0; i < arguments.length; i++) {
		// arguments[i].poster = '../logo.png';
		// arguments[i].style.background = 'center transparent url("../logo.png") no-repeat';
	}
}
function hideSpinner() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].src = '';
		arguments[i].poster = cover;
		arguments[i].style.background = '';
	}
}
export default webRTCForVideo;