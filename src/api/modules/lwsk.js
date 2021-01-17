export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  queryVehicleStatistics(params){
    return request({
      url: '/tn/vs/queryVehicleStatistics',
      method: 'GET',
      params,
    })
  },

})
