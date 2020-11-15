import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

import util from "@/libs/util";

let endpoint = process.env.VUE_APP_STOMP

const client = {
  context: {
    socket: null,
    client: null,
    connected: false,

    context: {
      busy: false,
      resolve: null,
      reject: null,
      seq: null,
      seqCounter: 0,
      timer: null,
      resetFun: null,
    },
  },

  connect(onConnected = null, onFailure = null){
    if (this.context.connected) {
      if (onConnected) {
        onConnected()
      }
      return;
    }

    const token = util.cookies.get('token')
    if (token == '') {
      if (onFailure) {
        onFailure("令牌不存在")
      }
      return;
    }
    this.context.socket = new SockJS(endpoint)
    this.context.client = Stomp.over(this.context.socket)
    this.context.client.hasDebug = false

    const that = this

    this.context.context.resetFun = function () {
      that.context.context.busy = false
      that.context.context.resolve = null
      that.context.context.reject = null
      if (that.context.context.timer) {
        clearInterval(that.context.context.timer)
        that.context.context.timer = null
      }
    }


    this.context.client.connect({
      accessToken: token
    }, function (frame) {
      that.context.connected = true
      if (onConnected) {
        onConnected(frame)
      }
    }, function (error) {
      that.context.connected = false
      if (onFailure) {
        onFailure(error)
      }
    })
  },

  disconnect(callback = null){
    if (this.context.context.resetFun) {
      this.context.context.resetFun()
    }

    if (!this.context.connected) {
      if (callback) {
        callback()
      }
      return;
    }

    this.context.connected = false
    this.context.client.disconnect(callback)
  },

  subscribeVideoStream(id, callback){
    if (this.context.connected) {
      this.context.client.subscribe("/queue/stream/" + id, function (frame) {
        let res = JSON.parse(frame.body)
        callback(res.data)
      })
      return true;
    }
    return false;
  },

  unsubscribeVideoStream(id){
    if (this.context.connected) {
      this.context.client.unsubscribe("/queue/stream/" + id)
    }
  }
}


export default client

