//重点监控

export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  //特殊车辆监管
  GetSpecialVehicleList(){
    return request({
      url: '/ks/getKsSvsMain',
      method: 'GET',
    })
  },

  //区域监管: 地区列表
  GetKsAsQueryKeyAreas(params){
    return request({
      url: '/ks/as/queryKeyAreas?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },
  //区域监控：新增区域
  AddKsAsAreas(data){
    return request({
      url: '/ks/as/addAreasToKeyAreas?p=pc&v=0.0.1',
      method: 'POST',
      data,
    })
  },
  //区域监控：删除区域
  DelKsAsAreas(data){
    return request({
      url: '/ks/as/deleteAreaFromKeyAreas?p=pc&v=0.0.1',
      method: 'DELETE',
      data,
    })
  },

})
