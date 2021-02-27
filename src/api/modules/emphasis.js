import appConst from '../../app_global.js'

//重点监控
export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  //特殊车辆监管
  GetSpecialVehicleList(){
    return request({
      url: appConst.msTmdp + 'ks/getKsSvsMain',
      method: 'GET',
    })
  },
  queryAreas(params){
    return request({
      url: appConst.msTmdp + 'ks/as/queryAreas?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },
  //区域监管: 地区列表
  GetKsAsQueryKeyAreas(params){
    return request({
      url: appConst.msTmdp + 'ks/as/queryKeyAreas?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },
  //区域监控：新增区域
  AddKsAsAreas(data){
    return request({
      url: appConst.msTmdp + 'ks/as/addAreasToKeyAreas?p=pc&v=0.0.1',
      method: 'POST',
      data,
    })
  },
  //区域监控：删除区域
  DelKsAsAreas(data){
    return request({
      url: appConst.msTmdp + 'ks/as/deleteAreaFromKeyAreas?p=pc&v=0.0.1',
      method: 'DELETE',
      data,
    })
  },

  //路段监控：数据列表
  QueryKsRsSupervision(params){
    return request({
      url: appConst.msTmdp + 'ks/rss/queryKsRsSupervision?p=pc&v=0.0.1',
      method: 'GET',
      params,
    })
  },
  //路径监控：搜索
  QueryKeyRsSupervision(params){
    return request({
      url: appConst.msTmdp + 'ks/rss/queryKeyRsSupervision?p=pc&v=0.0.1',
      method: 'GET',
      params,
    })
  },

  //路段监控：新增路段
  AddRsToRsSupervision(data){
    return request({
      url: appConst.msTmdp + 'ks/rss/addRsToRsSupervision?p=pc&v=0.0.1',
      method: 'POST',
      data,
    })
  },

  //路段监控：删除
  DeleteKsRsSupervision(data){
    return request({
      url: appConst.msTmdp + 'ks/rss/deleteKsRsSupervision?p=pc&v=0.0.1',
      method: 'DELETE',
      data,
    })
  },

  //车辆布控：布控车辆列表查询
  QueryVehicle(params){
    return request({
      url: appConst.msTmdp + 'ks/vc/queryVehicle?p=pc&v=0.0.1',
      method: 'GET',
      params,
    })
  },
  //车辆布控：	删除布控车辆
  DeleteVehicle(data){
    return request({
      url: appConst.msTmdp + 'ks/vc/deleteVehicle?p=pc&v=0.0.1',
      method: 'DELETE',
      data,
    })
  },
  //车辆布控：	新增布控车辆
  AddVehicle(data){
    return request({
      url: appConst.msTmdp + 'ks/vc/addVehicle?p=pc&v=0.0.1',
      method: 'POST',
      data,
    })
  },

  //车辆布控：	布控车辆地图点位
  QueryVcSfvs(params){
    return request({
      url: appConst.msTmdp + 'ks/vc/queryVcSfvs?p=pc&v=0.0.1',
      method: 'GET',
      params,
    })
  },

  //车辆布控:	车辆布控最新动态
  QueryVcLsvs(){
    return request({
      url: appConst.msTmdp + 'ks/vc/queryVcLsvs?p=pc&v=0.0.1',
      method: 'GET',

    })
  },

  //车辆布控:	车辆布控最新违章报警
  QueryVcLtvis(){
    return request({
      url: appConst.msTmdp + 'ks/vc/queryVcLtvis?p=pc&v=0.0.1',
      method: 'GET',
    })
  },
  //牌照异常
  QueryAbnormalLicensePlate(){
    return request({
      url: appConst.msTmdp + 'ks/lps/queryAbnormalLicensePlate?p=pc&v=0.0.1',
      method: 'GET',
    })
  },
})
