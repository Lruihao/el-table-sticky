import { convertToPx } from '@/utils'

export default class Sticky {

  #Vue
  #target

  /**
   * Constructor for StickyHeader and StickyFooter
   * @param {Constructor} Vue Vue Constructor
   * @param {*} options options from Vue.use
   * @param {Number|String} [options.offsetTop=0] the top offset of the table header
   * @param {Number|String} [options.offsetBottom=0] the bottom offset of the table footer
   */
  constructor(Vue, { offsetTop = 0, offsetBottom = 0 }) {
    this.#Vue = Vue
    this.#target = new.target.name
    if (this.#target === 'StickyHeader') {
      this.offsetTop = convertToPx(offsetTop)
    }
    if (this.#target === 'StickyFooter') {
      this.offsetBottom = convertToPx(offsetBottom)
    }
    this.inserted = false
  }

  /**
   * Stack sticky left and right columns for el-table header or footer
   * @param {Element} el el-table element
   * @param {Object} bindingValue binding value
   */
  #stackStickyColumns(el, bindingValue) {
    this.#Vue.nextTick(() => {
      let tableStickyWrapper
      let tableCell
      // for sticky header
      if (this.#target === 'StickyHeader') {
        tableStickyWrapper = el.querySelector('.el-table__header-wrapper')
        tableStickyWrapper.style.top = bindingValue?.offsetTop ? convertToPx(bindingValue.offsetTop) : this.offsetTop
        tableCell = tableStickyWrapper.querySelectorAll('.el-table__header .el-table__cell')
      }
      // for sticky footer
      if (this.#target === 'StickyFooter') {
        tableStickyWrapper = el.querySelector('.el-table__footer-wrapper')
        tableStickyWrapper.style.bottom = bindingValue?.offsetBottom ? convertToPx(bindingValue.offsetBottom) : this.offsetBottom
        tableCell = tableStickyWrapper.querySelectorAll('.el-table__footer .el-table__cell')
      }
      if (el.querySelector('.is-scrolling-none')) { return }
      // stack sticky for left fixed columns
      let stickyLeft = 0
      let stickyRight = 0
      for (let i = 0; i < tableCell.length; i++) {
        const th = tableCell[i]
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
      for (let i = tableCell.length - 1; i >= 0; i--) {
        const th = tableCell[i]
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
        // set data-sticky-* attribute for el-table
        el.dataset[this.#target.replace(/^\S/, s => s.toLowerCase())] = ''
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
