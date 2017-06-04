/*对接口请求返回的数据进行统一处理*/
import axios from  'axios'
import qs from 'qs'




var config = {
  headers:{'Content-Type' : 'application/json'},
  //  headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
  withCredentials: false,
  
}
var otherUrl=''

function finalUrl(url, params) {
  return [url].concat(params).join('/')

}
function finalUrl2(url, params) {
  return url.concat(params).join('/')

}
//
function handelResponse(res) {
  const data = res;
  const code = data.data.code;
   return Promise.resolve(res.data);
  // if (code === 0 || code === 1) {
  //   return Promise.resolve(data.data);
  // }else{
  //   return Promise.reject(data.data);
  // }

  //可以做登录判断，例如code === -1，跳转登录页面
}
//默认地址获取
function get(url, {params = [],query={} }) {
  return axios.get(finalUrl(url, params), {params: query}).then(handelResponse);
}
function post(url, {params = [],query={} }) {
  return axios.post(finalUrl(url,params), qs.stringify(query)).then(handelResponse);
}
function put(url, {params = [],query={} }) {
  return axios.put(finalUrl(url, params), qs.stringify(query)).then(handelResponse);
}
function del(url, {params = [],query={} }) {
  return axios.del(finalUrl(url, params), qs.stringify(query)).then(handelResponse);
}




export  default {
  get,
  post,
  put,
  del
  
}


