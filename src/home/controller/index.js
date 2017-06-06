'use strict';

import Base from './base.js'
import request from 'request-promise'
import cheerio from 'cheerio'

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display()
  }

  async generateAction() {
    // return this.display()
    let url = this.post('url')

    url = 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E7%8C%AB&oq=%E7%8C%AB&rsp=-1'

    const res = await request(url)

    const $ = cheerio.load(res)

    // 修改base url
    const baseUrl = url.match(/(https?:\/\/.+)\//)[1]
    $('head base').remove()
    $('head').prepend(`<base href="${baseUrl}">`)

    // 插入css和js
    const cssUrl = this.getCompleteUrl('/static/css/home/index_generator_iframe.css')
    const jqueryUrl = this.getCompleteUrl('/static/js/lib/jquery.js')
    const jsUrl = this.getCompleteUrl('/static/js/home/index_generator_iframe.js')
    $('head').append(`<link rel="stylesheet" href="${cssUrl}">`)
    $('body').append(`<script src="${jqueryUrl}">`)
    $('body').append(`<script src="${jsUrl}">`)

    this.assign('site', $.html())
    return this.display()
  }

}
