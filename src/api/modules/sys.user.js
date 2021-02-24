import {find, assign} from 'lodash'
import appConst from '../../app_global.js'

const users = [
  {username: 'admin', password: 'admin', uuid: 'admin-uuid', name: 'Admin'},
  {username: 'editor', password: 'editor', uuid: 'editor-uuid', name: 'Editor'},
  {username: 'user1', password: 'user1', uuid: 'user1-uuid', name: 'User1'}
]

export default ({service, request, serviceForMock, requestForMock, mock, faker, tools}) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    // 模拟数据
    mock
      .onAny('login')
      .reply(config => {
        const user = find(users, tools.parse(config.data))
        return user
          ? tools.responseSuccess(assign({}, user, {token: faker.random.uuid()}))
          : tools.responseError({}, '账号或密码不正确')
      })
    // 接口请求
    return requestForMock({
      url: '/login',
      method: 'post',
      data
    })
  },

  AccountLogin($username, $password){
    return request({
      url: appConst.msTmdp + 'vehicle/api/login/index',
      method: 'post',
      data: {
        appId: '202008151130',
        secretKey: "ABCDEFGHIJK",
        userCode: $username,
        userPassword: $password
      }
    })
  },

  AccountRegister(data){
    return request({
      url: appConst.msTmdp + 'vehicle/api/register',
      method: 'post',
      data: data
    })
  },

  // 用户列表
  getUsers(params){
    return request({
      url: appConst.msTmdp + 'sm/getUsers?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },

  //删除用户
  delUser(data){
    return request({
      url: appConst.msTmdp + 'sm/delUser?p=pc&v=0.001',
      method: 'DELETE',
      data,
    })
  },
  //添加用户
  addUser(data){
    return request({
      url: appConst.msTmdp + 'sm/addUser?p=pc&v=0.001',
      method: 'POST',
      data,
    })
  },
  //用户信息修改
  uptUserInfo(params){
    return request({
      url: appConst.msTmdp + 'sm/uptUserInfo?p=pc&v=0.001',
      method: 'PUT',
      data:params,
    })
  },
  //获取角色列表
  getRoles(params){
    return request({
      url: appConst.msTmdp + 'sm/getRoles?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  },
  //获取用户信息详情
  getUserInfo(params){
    return request({
      url: appConst.msTmdp + 'sm/getUserInfo?p=pc&v=0.001',
      method: 'GET',
      params,
    })
  }
})
