import appConst from '../../app_global.js'

export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  queryIllegalVehicle(params){
    return request({
      url: appConst.msTmdp + 'vm/ils/queryIllegalVehicle',
      method: 'GET',
      params,
    })
  },
  queryVehicleTypes(){
    return request({
      url: appConst.msTmdp + 'vm/ils/queryVehicleTypes',
      method: 'GET',
    })
  },
  queryIlsTypes(){
    return request({
      url: appConst.msTmdp + 'vm/ils/queryIlsTypes',
      method: 'GET',
    })
  },
  queryIllegalDistribution(params){
    return request({
      url: appConst.msTmdp + 'vm/ils/queryIllegalDistribution',
      method: 'GET',
      params
    })
  },
  queryIllegal(params){
    return request({
      url: appConst.msTmdp + 'vm/ils/queryIllegal',
      method: 'GET',
      params
    })
  },
  exportIls(params){
    return request({
      url: appConst.msTmdp + 'vm/ils/export',
      method: 'GET',
      params
    })
  },
  queryIlsDat(params){
    return request({
      url: appConst.msTmdp + 'vm/ils/queryIlsDat',
      method: 'GET',
      params
    })
  },
  queryIlsVehicleHistory(params){
    return request({
      url: appConst.msTmdp + 'vm/ils/queryIlsVehicleHistoric',
      method: 'GET',
      params
    })
  },
  querySiteIllegal(params){
    return request({
      url: appConst.msTmdp + 'vm/ils/querySiteIllegal',
      method: 'GET',
      params
    })
  },
  queryIlsVsInfo(params){
    return request({
      url: appConst.msTmdp + 'vm/ils/queryIlsVsInfo',
      method: 'GET',
      params
    })
  }
})
