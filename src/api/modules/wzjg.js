export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  queryIllegalVehicle(params){
    return request({
      url: '/vm/ils/queryIllegalVehicle',
      method: 'GET',
      params,
    })
  },
  queryVehicleTypes(){
    return request({
      url: '/vm/ils/queryVehicleTypes',
      method: 'GET',
    })
  },
  queryIlsTypes(){
    return request({
      url: '/vm/ils/queryIlsTypes',
      method: 'GET',
    })
  },
  queryIllegalDistribution(params){
    return request({
      url: '/vm/ils/queryIllegalDistribution',
      method: 'GET',
      params
    })
  },
  queryIllegal(params){
    return request({
      url: '/vm/ils/queryIllegal',
      method: 'GET',
      params
    })
  },
  exportIls(params){
    return request({
      url: '/vm/ils/export',
      method: 'GET',
      params
    })
  },
  queryIlsDat(params){
    return request({
      url: '/vm/ils/queryIlsDat',
      method: 'GET',
      params
    })
  },
  queryIlsVehicleHistory(params){
    return request({
      url: '/vm/ils/queryIlsVehicleHistoric',
      method: 'GET',
      params
    })
  },
})
