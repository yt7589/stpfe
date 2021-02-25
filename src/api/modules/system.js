import appConst from '../../app_global.js'

export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  
  getSysInfo(params) {
    return request({
      url: appConst.msTmdp + '/sm/getSysInfo?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },
  uptSysInfo(params) {
    return request({
      url: appConst.msTmdp + '/sm/uptSysInfo?p=pc&v=0.001',
      method: 'POST',
      params,
    })
  }
})
