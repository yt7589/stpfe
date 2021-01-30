export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  queryVehicleStatistics(params){
    return request({
      url: '/tn/vs/queryVehicleStatistics',
      method: 'GET',
      params,
    })
  },
  getTvisAnalysisResult(params) {
    return request({
      url: '/tmdp/getTvisAnalysisResult?p=pc&v=0.0.1&cameraId=' + params.cameraId + '&tvisJsonId=' + params.baseTvisJsonId + '&direction=' + params.direction,
      method: 'GET'
    })
  },
})
