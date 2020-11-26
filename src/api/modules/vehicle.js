export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  VehicleRecognition(file, vm = null, onUploadProgress = null){
    let formData = new FormData()
    formData.append("image", file)

    return request({
      url: '/vehicle/api/analysis/imageupload',
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
      url: '/vehicle/api/analysis/rectifyImgRecgRst?p=pc&v=1.0',
      method: 'post',
      data,
    })
  },
  GetRecognitionList(params){
    return request({
      url: '/zjc/dc/queryImageRecgDatas?p=pc&v=1.0',
      method: 'GET',
      params,
    })
  },
  UploadRtmpConfig($rtmp){
    return request({
      url: '/vehicle/api/analysis/getrtmpconfigurl?rtmpUrl=' + $rtmp,
      method: 'post',
    })
  },
  GetRtmpResult($rtmpID, silent = false){
    return request({
      url: '/vehicle/api/analysis/getanalysisbyid?rstpId=' + $rtmpID,
      method: 'post',
      silent: silent
    })
  },
  UploadVideo(file, vm = null, onUploadProgress = null){
    let formData = new FormData()
    formData.append("video", file)

    return request({
      url: '/vehicle/api/analysis/videoupload',
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

  VehicleStatistic(){
    return request({
      url: '/vehicle/statistic',
      method: 'get',
    })
  },

  TrafficViolation(){
    return request({
      url: '/traffic/violation',
      method: 'get',
    })
  }
})
