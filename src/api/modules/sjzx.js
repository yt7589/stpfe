export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  sjzxQueryDataStatistics(params){
    return request({
      url: '/dc/st/queryDataStatistics',
      method: 'GET',
      params,
    })
  },
  sjzxQueryLocusReplay(params){
    return request({
      url: '/dc/lr/queryLocusReplay',
      method: 'GET',
      params,
    })
  },
  sjzxQueryVehicle(params){
    return request({
      url: '/dc/cs/queryVehicle',
      method: 'GET',
      params,
    })
  },
  sjzxQueryDataReport(params){
    return request({
      url: '/dc/rt/queryDataReport',
      method: 'GET',
      params,
    })
  }
})
