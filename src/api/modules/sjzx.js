export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  sjzxQueryDataStatistics(params){
    return request({
      url: '/ms-tmdp/dc/st/queryDataStatistics',
      method: 'GET',
      params,
    })
  },
  sjzxQueryLocusReplay(params){
    return request({
      url: '/ms-tmdp/dc/lr/queryLocusReplay',
      method: 'GET',
      params,
    })
  },
  /**
   *
   * 上传以图搜车图片，服务器将解析该图片，如果Json识别结果中的VEH数组中只有一个元素，
   * 且有cltzxl时，才能调用以图搜车服务
   * @param {*} file 
   * @param {*} vm 
   * @param {*} onUploadProgress 
   */
  recognizeYtscImage(file, vm = null, onUploadProgress = null){
    console.log('step 1')
    let formData = new FormData()
    formData.append('TPLX', '1')
    formData.append('MRHPT', 'test')
    formData.append('HPHM', 'test')
    formData.append('cameraId', '-1')
    formData.append("TPXX", file)
    formData.append('TPWJ', 'base64')
    console.log('step 2')

    return request({
      url: '/tmdp/recognizeTvisImage',
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
  sjzxQueryVehicle(params){
    console.log('params:' + JSON.stringify(params) + '!')
    return request({
      url: '/ms-tmdp/dc/cs/queryVehicle',
      method: 'GET',
      params,
    })
  },
  sjzxQueryDataReport(params){
    return request({
      url: '/ms-tmdp/dc/rt/queryDataReport',
      method: 'GET',
      params,
    })
  }
})
