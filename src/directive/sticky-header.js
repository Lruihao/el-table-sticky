import { convertToPx } from '@/utils'
import './css/sticky-header.scss'

export default class StickyHeader {

  #Vue

  /**
   * constructor of StickyHeader
   * @param {Constructor} Vue Vue Constructor
   * @param {*} options options from Vue.use
   */
  constructor(Vue, { offsetTop = '0px' }) {
    this.#Vue = Vue
    this.offsetTop = convertToPx(offsetTop)
    this.inserted = false
  }

  /**
   * Stack sticky left and right columns for el-table header
   * @param {Element} el el-table element
   * @param {Object} bindingValue binding value
   */
  #stackStickyColumns(el, bindingValue) {
    this.#Vue.nextTick(() => {
      const tableHeaderWrapper = el.querySelector('.el-table__header-wrapper')
      tableHeaderWrapper.style.top = bindingValue?.offsetTop ? convertToPx(bindingValue.offsetTop) : this.offsetTop
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
   * Init directive config for Vue
   * @returns {Object} directive config
   */
  init() {
    return {
      inserted: (el, binding) => {
        if (!el.classList.contains('el-table')) { return }
        // set data-sticky-header attribute
        el.dataset.stickyHeader = ''
        // stack sticky columns
        this.#stackStickyColumns(el, binding.value)
        this.inserted = true
      },
      update: (el, binding) => {
        if (!el.classList.contains('el-table') ) { return }
        // if already inserted, return
        if (this.inserted) {
          this.inserted = false
          return
        }
        // restack sticky columns
        this.#stackStickyColumns(el, binding.value)
      },
    }
  }
}
