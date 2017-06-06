window.onload = function() {

  let Parser = {
    // 选择目标类型：image, title, prize, link
    selectType: 'image',
    itemSelector: 'li.imgitem',

    init() {
      console.log('init')
      // document.addEventListener('click', this.clickHandler.bind(this), true)
      window.addEventListener('click', this.clickHandler.bind(this), true)
      document.addEventListener('mouseover', this.mouseOverHandler.bind(this))
    },

    // 修改当前选择目标的类型
    changeSelectType(type) {
      this.selectType = type
    },

    clickHandler(e) {
      e.preventDefault()
      e.stopImmediatePropagation()

      const itemClassName = 'RSSItem'
      const imageClassName = 'RSSImage'

      switch(this.selectType) {
        case 'item':
          this.itemSelector = this.getItemSelector(e.target)
          $('.' + itemClassName).removeClass(itemClassName)
          $(this.itemSelector).addClass(itemClassName)
          break
        case 'image':
          this.imageSelector = this.itemSelector + ' ' + this.getImageSelector(e.target)
          if(this.imageSelector) {
            $('.' + imageClassName).removeClass(imageClassName)
            $(this.imageSelector).addClass(imageClassName)
          }
          break
        default:
          break
      }

      console.log(this.imageSelector)

    },

    getImageSelector(ele) {
      if(ele.tagName.toLowerCase() === 'img') {
        return this.generateSelector(ele)
      }
    },

    getItemSelector(ele) {
      let itemEle
      while(!itemEle && ele) {
        if(this.qualifyAsItem(ele)) {
          itemEle = ele
        } else {
          ele = ele.parentElement
        }
      }

      if(!ele) {
        return ''
      }

      return this.generateSelector(itemEle)

    },

    qualifyAsItem(ele) {
      const $ele = $(ele)
      const $siblings = $ele.siblings()

      // siblings数量需大于或等于5
      if($siblings.length < 5) {
        return false
      }

      // 80%以上siblings需与自己相似
      let alikeCount = 0
      $siblings.each((index, sibling) => {
        if(this.alike(ele, sibling)) {
          alikeCount++
        }
      })

      return alikeCount/$siblings.length >= .8
    },

    // 检测ele是否与srcEle相似
    // 相似条件：TagName相同，至少拥有一个共同className
    alike(srcEle, ele) {
      if(srcEle.tagName !== ele.tagName) { return false }
      const srcClassList = Array.from(srcEle.classList)

      let alike = false
      srcClassList.forEach(className => {
        const eleClassList = Array.from(ele.classList)
        if(eleClassList.indexOf(className) >= 0) {
          alike = true
        }
      })

      return alike
    },

    generateSelector(el) {
      const tagName = el.tagName.toLowerCase()
      let selector = tagName
      if(el.classList.length > 0) {
        selector += '.' + el.classList[0]
      }
      return selector
    },

    mouseOverHandler(e) {
      const hoverClassName = 'RSSHover'
      if(this.$lastMouseOverEle) {
        this.$lastMouseOverEle.removeClass(hoverClassName)
      }
      const $ele = $(e.target)
      $ele.addClass(hoverClassName)
      this.$lastMouseOverEle = $ele
    }
  }

  Parser.init()
}
