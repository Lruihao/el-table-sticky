import { convertToPx } from '@/utils'
import './css/sticky-footer.scss'

export default class StickyFooter {

  #Vue

  /**
   * constructor of StickyFooter
   * @param {Constructor} Vue Vue Constructor
   * @param {*} options options from Vue.use
   */
  constructor(Vue, { offsetBottom = '0px' }) {
    this.#Vue = Vue
    this.offsetBottom = convertToPx(offsetBottom)
    this.inserted = false
  }

  /**
   * Stack sticky left and right columns for el-table footer
   * @param {Element} el el-table element
   * @param {Object} bindingValue binding value
   */
  #stackStickyColumns(el, bindingValue) {
    this.#Vue.nextTick(() => {
      const tableFooterWrapper = el.querySelector('.el-table__footer-wrapper')
      tableFooterWrapper.style.bottom = bindingValue?.offsetBottom ? convertToPx(bindingValue.offsetBottom) : this.offsetBottom
      const tableFooter = tableFooterWrapper.querySelectorAll('.el-table__footer .el-table__cell')
      let stickyLeft = 0
      let stickyRight = 0
      // stack sticky for left fixed columns
      for (let i = 0; i < tableFooter.length; i++) {
        const th = tableFooter[i]
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
      for (let i = tableFooter.length - 1; i >= 0; i--) {
        const th = tableFooter[i]
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

  init() {
    return {
      inserted: (el, binding) => {
        if (!el.classList.contains('el-table')) { return }
        // set data-sticky-footer attribute
        el.dataset.stickyFooter = ''
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
