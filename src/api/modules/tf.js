//交通预测

export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({

  //流量预测
  QueryTrafficForecast(params){
    return request({
      url: '/tp/tf/queryTrafficForecast?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },

  //行车预测
  QueryTrafficPrognosis(params){
    return request({
      url: '/tp/queryTrafficPrognosis?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  }
})
