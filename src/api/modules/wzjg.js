export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  queryIllegalVehicle(params){
    return request({
      url: '/ms-tmdp/vm/ils/queryIllegalVehicle',
      method: 'GET',
      params,
    })
  },
  queryVehicleTypes(){
    return request({
      url: '/ms-tmdp/vm/ils/queryVehicleTypes',
      method: 'GET',
    })
  },
  queryIlsTypes(){
    return request({
      url: '/ms-tmdp/vm/ils/queryIlsTypes',
      method: 'GET',
    })
  },
  queryIllegalDistribution(params){
    return request({
      url: '/ms-tmdp/vm/ils/queryIllegalDistribution',
      method: 'GET',
      params
    })
  },
  queryIllegal(params){
    return request({
      url: '/ms-tmdp/vm/ils/queryIllegal',
      method: 'GET',
      params
    })
  },
  exportIls(params){
    return request({
      url: '/ms-tmdp/vm/ils/export',
      method: 'GET',
      params
    })
  },
  queryIlsDat(params){
    return request({
      url: '/ms-tmdp/vm/ils/queryIlsDat',
      method: 'GET',
      params
    })
  },
  queryIlsVehicleHistory(params){
    return request({
      url: '/ms-tmdp/vm/ils/queryIlsVehicleHistoric',
      method: 'GET',
      params
    })
  },
  querySiteIllegal(params){
    return request({
      url: '/ms-tmdp/vm/ils/querySiteIllegal',
      method: 'GET',
      params
    })
  }
})
