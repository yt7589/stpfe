//重点监控

export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  //特殊车辆监管
  GetSpecialVehicleList(){
    return request({
      url: '/ks/getKsSvsMain',
      method: 'GET',
    })
  },

})
