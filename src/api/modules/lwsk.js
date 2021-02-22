import appConst from '../../app_global.js'

export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  queryVehicleStatistics(params){
    return request({
      url: appConst.msTmdp + 'tn/vs/queryVehicleStatistics',
      method: 'GET',
      params,
    })
  },
  getTvisAnalysisResult(params) {
    return request({
      url: appConst.msTmdp + 'tmdp/getTvisAnalysisResult?p=pc&v=0.0.1&cameraId=' + params.cameraId + '&tvisJsonId=' + params.baseTvisJsonId + '&direction=' + params.direction,
      method: 'GET'
    })
  },
})
