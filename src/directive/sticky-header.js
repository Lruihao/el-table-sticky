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
  }

  /**
   * Stack sticky left and right columns for el-table header
   * @param {Constructor} Vue Vue Constructor
   * @param {Element} el el-table element
   */
  #stackStickyColumns(Vue, el) {
    // set data-sticky-header attribute
    el.dataset.stickyHeader = ''
    Vue.nextTick(() => {
      const tableHeaderWrapper = el.querySelector('.el-table__header-wrapper')
      // set sticky top for specific el-table header
      let offsetTopStr = this.options.offsetTop
      if (el.dataset.offsetTop) {
        offsetTopStr = isNormalNumber(el.dataset.offsetTop) ? `${el.dataset.offsetTop}px` : el.dataset.offsetTop
      }
      tableHeaderWrapper.style.top = offsetTopStr
      const tableHeader = tableHeaderWrapper.querySelectorAll('.el-table__header .el-table__cell')
      let stickyLeft = 0
      let stickyRight = 0
      // stack sticky for left fixed columns
      for (let i = 0; i < tableHeader.length; i++) {
        const th = tableHeader[i]
        if (th.classList.contains('is-hidden')) {
          th.dataset.sticky = 'left'
          th.style.left = `${stickyLeft}px`
          stickyLeft += th.offsetWidth
          // set data-sticky-left-last attribute for last left fixed column
          if (!th.nextElementSibling || !th.nextElementSibling.classList.contains('is-hidden')) {
            th.dataset.sticky = 'end'
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
        if (th.classList.contains('is-hidden') && !th.dataset.sticky) {
          th.dataset.sticky = 'right'
          th.style.right = `${stickyRight}px`
          stickyRight += th.offsetWidth
          // set data-sticky-right-first attribute for first right fixed column
          if (!th.previousElementSibling || !th.previousElementSibling.classList.contains('is-hidden')) {
            th.dataset.sticky = 'start'
            break
          }
        }
      }
    })
  }

  /**
   * Restack sticky left and right for el-table header
   * @param {Constructor} Vue Vue Constructor
   * @param {Element} el el-table element
   */
  #reStackSticky(Vue, el) {
    // TODO
    Vue.nextTick(() => {
      const tableHeaderWrapper = el.querySelector('.el-table__header-wrapper')
      const tableHeader = tableHeaderWrapper.querySelectorAll('.el-table__header .el-table__cell')
      // let stickyLeft = 0
      // let stickyRight = 0
      console.log(tableHeader.length)
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
        _.#stackStickyColumns(Vue, el)
      },
      update(el) {
        _.#reStackSticky(Vue, el)
      },
    }
    return {
      ...directiveVue2,
    }
  }
}
