'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
   getCompleteUrl(url) {
     let protocol = this.header('x-forwarded-proto') || 'http';
     return protocol + '://' + this.http.host + url;
   }
}
