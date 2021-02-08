//设备管理

export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({

  //设备列表查询
  QueryDevice(params){
    return request({
      url: '/ms-tmdp/dm/queryDevice?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },

  //设备删除
  DeleteDevice(data){
    return request({
      url: '/ms-tmdp/dm/deleteDevice?p=pc&v=0.001',
      method: 'DELETE',
      data,
    })
  },
  //添加设备
  AddDevice(data){
    return request({
      url: '/ms-tmdp/dm/addDevice?p=pc&v=0.001',
      method: 'POST',
      data,
    })
  },
  //设备节点查询
  QueryDeviceNode(params){
    return request({
      url: '/ms-tmdp/dm/queryDeviceNode?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },
  //设备类型查询
  QueryDeviceType(params){
    return request({
      url: '/ms-tmdp/dm/queryDeviceType?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },
  //设备类型导出
  DeviceExport(params){
    return request({
      url: '/ms-tmdp/dm/deviceExport?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },

  //修改设备
  updateDeviceInfo(data){
    return request({
      url: '/ms-tmdp/dm/updateDeviceInfo?p=pc&v=0.001',
      method: 'PUT',
      data,
    })
  },
  /****************************空间管理************************************/
  //空间管理列表
  QueryArea(params){
    return request({
      url: '/ms-tmdp/dm/sm/queryArea?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },
  //添加下一级空间
  AddArea(data){
    return request({
      url: '/ms-tmdp/dm/sm/addArea?p=pc&v=0.001',
      method: 'POST',
      data,
    })
  },
  //修改区域
  UpdateArea(data){
    return request({
      url: '/ms-tmdp/dm/sm/updateArea?p=pc&v=0.001',
      method: 'PUT',
      data,
    })
  },
  //删除空间
  DeleteAreaFromSpace(data){
    return request({
      url: '/ms-tmdp/dm/sm/deleteAreaFromSpace?p=pc&v=0.001',
      method: 'DELETE',
      data,
    })
  },

  /*******************节点管理*************************/
  //节点列表
  QueryNode(params){
    return request({
      url: '/ms-tmdp/dm/nd/queryNode?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },
  //添加节点
  AddNode(data){
    return request({
      url: '/ms-tmdp/dm/nd/addNode2Nd?p=pc&v=0.001',
      method: 'POST',
      data,
    })
  },
  //修改节点
  UpdateNode(data){
    return request({
      url: '/ms-tmdp/dm/nd/updateNode?p=pc&v=0.001',
      method: 'PUT',
      data,
    })
  },

  //删除节点
  DeleteNode(data){
    return request({
      url: '/ms-tmdp/dm/nd/deleteNode?p=pc&v=0.001',
      method: 'DELETE',
      data,
    })
  },

})
