import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

Object.clone = function (origin, include = null, exclude = null) {
  var object = {}
  Object.keys(origin).forEach(key => {
    if (include && include instanceof Array) {
      if (include.includes(key)) {
        object[key] = origin[key]
      } else {
        return;
      }
    } else if (exclude && exclude instanceof Array && exclude.includes(key)) {
      if (exclude.includes(key)) {
        return;
      } else {
        object[key] = origin[key]
      }
    } else {
      object[key] = origin[key]
    }
  })
  return object
}

export default util
