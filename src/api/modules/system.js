import appConst from '../../app_global.js'

export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  
    queryCompanyDetail(corpId) {
        return request({
          url: '/api/v1/sys/corp/query/detail',
          method: 'GET',
          params: {
            corpId
          },
        })
      },
})
