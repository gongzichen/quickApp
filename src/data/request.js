import fetch from '@system.fetch'
// import prompt from '@system.prompt'

const SERVER_URL = 'http://t.yushu.im'

const natives = {
  /*
    网络请求 
    param: options
    return: {promise}
  */
  async fetch(obj) {
    console.log('开始请求网络');
    const url = SERVER_URL + obj.url;
    let options = Object.assign(obj, { url })
    const p1 = new Promise((resolve, reject) => {
      options.success = function ({data, code}) {
        console.log(JSON.stringify(options))
        resolve({data, code})
      }
      options.fail = function ({data, code}) {
        resolve({ data, code })
      }
      fetch.fetch(options)
    })
    return p1
  },
  get(url, data) {
    return this.fetch({ url, data })
  },
  post(url, data) {
    return this.fetch({ url, data, method: 'post' })
  }
}

// 注入全局
const request = Object.getPrototypeOf(global) || global
request.natives = natives