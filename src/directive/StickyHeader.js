import { isNormalNumber } from '@/utils'

export default class StickyHeader {
  /**
   * constructor of StickyHeader
   * @param {Constructor} Vue Vue Constructor
   * @param {*} options options from Vue.use
   */
  constructor(Vue, options) {
    const defaultOptions = {
      offsetTop: '0px',
    }
    this.options = { ...defaultOptions, ...options }
    // if offsetTop is number, convert to px
    if (isNormalNumber(this.options.offsetTop)) {
      this.options.offsetTop = `${this.options.offsetTop}px`
    }
    Vue.nextTick(() => {
      this.#getStyle()
    })
  }

  /**
   * Generate styles in JS for directive v-sticky-header in el-table
   * 1. Show fixed columns and set sticky
   * 2. Add shadow of left and right fixed columns when scrolling
   */
  #getStyle() {
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    this.partialStyle = document.createElement('style')
    this.partialStyle.setAttribute('type', 'text/css')
    style.innerHTML = `
.el-table[data-sticky-header] {
  overflow: visible !important;
}
.el-table[data-sticky-header] .el-table__header-wrapper {
  position: sticky;
  top: ${this.options.offsetTop};
  z-index: 4;
}
.el-table[data-sticky-header] .el-table__header-wrapper .el-table__cell.is-sticky-left,
.el-table[data-sticky-header] .el-table__header-wrapper .el-table__cell.is-sticky-right {
  position: sticky;
  z-index: 4;
}
.el-table[data-sticky-header] .el-table__header-wrapper .el-table__cell.is-sticky-left[data-sticky-left-last],
.el-table[data-sticky-header] .el-table__header-wrapper .el-table__cell.is-sticky-right[data-sticky-right-first] {
  z-index: 3;
}
.el-table[data-sticky-header] .el-table__header-wrapper:not(:has(+ .is-scrolling-left)):not(:has(+ .is-scrolling-none)) .el-table__cell.is-sticky-left[data-sticky-left-last],
.el-table[data-sticky-header] .el-table__header-wrapper:not(:has(+ .is-scrolling-right)):not(:has(+ .is-scrolling-none)) .el-table__cell.is-sticky-right[data-sticky-right-first] {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
}`
    document.head.appendChild(style)
    document.head.appendChild(this.partialStyle)
  }

  /**
   * Set partial style for directive v-sticky-header in el-table
   * @param {String} cssText css text
   */
  #setPartialStyle(cssText) {
    this.partialStyle.innerHTML = cssText
  }

  /**
   * Set offset top for specific el-table sticky header
   * @param {String|Number} offsetTop offset top
   */
  #setOffsetTop(offsetTop) {
    let offsetTopStr = offsetTop
    // if offsetTop is number, convert to px
    if (isNormalNumber(offsetTop)) {
      offsetTopStr = `${offsetTop}px`
    }
    this.#setPartialStyle(`.el-table[data-sticky-header][data-offset-top="${offsetTop}"] .el-table__header-wrapper { top: ${offsetTopStr}; }`)
  }
  /**
   * Stack sticky left and right for el-table header
   * @param {Constructor} Vue Vue Constructor
   * @param {Element} el el-table element
   */
  #stackStickyHeader(Vue, el) {
    Vue.nextTick(() => {
      const tableHeaderWrapper = el.querySelector('.el-table__header-wrapper')
      const tableHeader = tableHeaderWrapper.querySelectorAll('.el-table__header .el-table__cell')
      let stickyLeft = 0
      let stickyRight = 0
      // stack sticky for left fixed columns
      for (let i = 0; i < tableHeader.length; i++) {
        const th = tableHeader[i]
        if (th.classList.contains('is-hidden')) {
          th.classList.replace('is-hidden', 'is-sticky-left')
          th.style.left = `${stickyLeft}px`
          stickyLeft += th.offsetWidth
          // set data-sticky-left-last attribute for last left fixed column
          if (!th.nextElementSibling || !th.nextElementSibling.classList.contains('is-hidden')) {
            th.dataset.stickyLeftLast = true
            break
          }
        } else if (i === 0) {
          // no left fixed columns
          break
        }
      }
      // stack sticky for right fixed columns
      for (let i = tableHeader.length - 1; i >= 0; i--) {
        const th = tableHeader[i]
        if (th.classList.contains('is-hidden')) {
          th.classList.replace('is-hidden', 'is-sticky-right')
          th.style.right = `${stickyRight}px`
          stickyRight += th.offsetWidth
          // set data-sticky-right-first attribute for first right fixed column
          if (!th.previousElementSibling || !th.previousElementSibling.classList.contains('is-hidden')) {
            th.dataset.stickyRightFirst = true
            break
          }
        }
      }
    })
  }

  /**
   * Get directive config for Vue
   * @param {Constructor} Vue Vue Constructor
   * @returns {Object} directive config
   */
  getDirective(Vue) {
    const _ = this
    const directiveVue2 = {
      inserted(el, { value = true }) {
        // if not el-table or value is false, return
        if (!el.classList.contains('el-table') || !value) { return }
        // set data-sticky-header attribute
        el.dataset.stickyHeader = ''
        // set offset top if exists by setOffsetTop function
        if (el.dataset.offsetTop) {
          _.#setOffsetTop(el.dataset.offsetTop)
        }
        // stack sticky header
        _.#stackStickyHeader(Vue, el)
      },
      update() {
        // TODO 更新时判断列数是否变化，要重新计算 sticky 堆叠
      },
      unbind() {
        // remove partial style
        _.#setPartialStyle('')
      }
    }
    return {
      ...directiveVue2,
    }
  }
}
