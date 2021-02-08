export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  VehicleRecognition(file, vm = null, onUploadProgress = null){
    let formData = new FormData()
    formData.append("image", file)

    return request({
      url: '/ms-tmdp/vehicle/api/analysis/imageupload',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
      timeout: 300 * 1000,
      onUploadProgress: function (event) {
        if (onUploadProgress && vm) {
          onUploadProgress(vm, event)
        }
      }
    })
  },
  UploadRecognitionError(data){
    return request({
      url: '/ms-tmdp/vehicle/api/analysis/rectifyImgRecgRst?p=pc&v=1.0',
      method: 'post',
      data,
    })
  },
  GetRecognitionList(params){
    return request({
      url: '/ms-tmdp/zjc/dc/queryImageRecgDatas?p=pc&v=1.0',
      method: 'GET',
      params,
    })
  },
  UploadRtmpConfig($rtmp){
    return request({
      url: '/ms-tmdp/vehicle/api/analysis/getrtmpconfigurl?rtmpUrl=' + $rtmp,
      method: 'post',
    })
  },
  GetRtmpResult($rtmpID, silent = false){
    return request({
      url: '/ms-tmdp/vehicle/api/analysis/getanalysisbyid?rstpId=' + $rtmpID,
      method: 'post',
      silent: silent
    })
  },
  UploadVideo(file, vm = null, onUploadProgress = null){
    let formData = new FormData()
    formData.append("video", file)

    return request({
      url: '/ms-tmdp/vehicle/api/analysis/videoupload',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
      timeout: 3000 * 1000,
      onUploadProgress: function (event) {
        if (onUploadProgress && vm) {
          onUploadProgress(vm, event)
        }
      }
    })
  },

  VehicleStatistic(silent = false){
    return request({
      url: '/ms-tmdp/vehicle/statistic',
      method: 'get',
      silent: silent
    })
  },

  TrafficViolation(silent = false){
    return request({
      url: '/ms-tmdp/traffic/violation',
      method: 'get',
      silent: silent
    })
  },

  GetCameraSiteList(){
    return request({
      url: '/ms-tmdp/tn/va/queryDeviceDeploy?p=pc&v=0.0.1',
      method: 'get',
    })
  },
  GetCameraList(params){
    return request({
      url: '/ms-tmdp/tn/va/querySdInfo?p=pc&v=0.0.1',
      method: 'get',
      params
    })
  },
  GetQueryDeviceSum(params) {
    return request({
      url: '/ms-tmdp/tn/va/queryDevice?p=pc&v=0.0.1',
      method: 'get',
      params
    })
  },
  querySdPic(params){
    // 设备视图详情
    return request({
      url: '/ms-tmdp/tn/va/querySdPic',
      method: 'get',
      params
    })
  },
  GetTrafficViolationList(params){
    return request({
      url: '/ms-tmdp/traffic/violation/list',
      method: 'post',
      params
    })
  }
})
