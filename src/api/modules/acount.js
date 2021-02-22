export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({

  login(params){
    let data = {
      'loginName': params.username,
      'loginPwd': params['password']
    }
    return request({
      url: 'ms-facade/facade/login?p=pc&v=0.001',
      method: 'post',
      data: data
    })
  }
})
