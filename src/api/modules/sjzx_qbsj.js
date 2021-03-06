import appConst from '../../app_global.js'

/**
 * 数据中心=》全部数据
 */
export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
getVehicleTypes(params) {
    return request({
        url: appConst.msTmdp + 'vm/ils/queryVehicleTypes',
        method: 'GET',
        params,
    })
},
getIlsTypes(params) {
    return request({
        url: appConst.msTmdp + 'vm/ils/queryIlsTypes',
        method: 'GET',
        params,
    })
},
getDcAdVehicles(params) {
    return request({
        url: appConst.msTmdp + 'dc/hp/queryAllData?p=pc&v=0.0.1',
        method: 'GET',
        params,
    })
},
loadIlsQty(){
    return request({
        url: appConst.msTmdp + 'dc/hp/queryDataAnalysis?p=pc&v=0.0.1',
        method: 'GET',
    })
},
getTrendParam(){
    return request({
        url: appConst.msTmdp + 'dc/hp/queryDataAnalysis?p=pc&v=0.0.1',
        method: 'GET',
    })
},
test001(params) {
    console.log('数据中心=》全部数据')
}
})