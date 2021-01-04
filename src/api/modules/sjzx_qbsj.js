/**
 * 数据中心=》全部数据
 */
export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
getVehicleTypes(params) {
    return request({
        url: 'vm/ils/queryVehicleTypes',
        method: 'GET',
        params,
    })
},
test001(params) {
    console.log('数据中心=》全部数据')
}
})