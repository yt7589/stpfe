export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  queryIllegalVehicle(params){
    return request({
      url: 'vm/ils/queryIllegalVehicle',
      method: 'GET',
      params,
    })
  },
  queryVehicleTypes(){
    return request({
      url: 'vm/ils/queryVehicleTypes',
      method: 'GET',
    })
  },
  queryIlsTypes(){
    return request({
      url: 'vm/ils/queryIlsTypes',
      method: 'GET',
    })
  },

})
