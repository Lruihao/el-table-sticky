import { convertToPx, checkElTable } from '@/utils'

/**
 * @class Sticky
 * @classdesc sticky header or footer for el-table
 * @abstract
 */
export default class Sticky {

  /**
   * from new.target.name
   * @type {String}
   * @private
   */
  #target

  /**
   * Constructor for StickyHeader and StickyFooter
   * @param {Object} options options from Vue.use
   * @param {Number|String} [options.offsetTop=0] the top offset of the table header
   * @param {Number|String} [options.offsetBottom=0] the bottom offset of the table footer
   */
  constructor({ offsetTop = 0, offsetBottom = 0 }) {
    this.#target = new.target.name
    if (this.#target === 'StickyHeader') {
      this.offsetTop = convertToPx(offsetTop)
    }
    if (this.#target === 'StickyFooter') {
      this.offsetBottom = convertToPx(offsetBottom)
    }
  }

  /**
   * Stack sticky left and right columns for el-table header or footer
   * @param {Element} el el-table element
   * @param {Object} binding binding
   * @param {Object} vnode vnode
   * @private
   */
  #stackStickyColumns(el, binding, vnode) {
    const { componentInstance: $table } = vnode
    const { value } = binding

    // wait for el-table render
    // TODO Refactor this function to reduce its Cognitive Complexity from 23 to the 15 allowed.
    $table.$nextTick(() => {
      let tableStickyWrapper
      let tableCell

      // for sticky header
      if (this.#target === 'StickyHeader') {
        tableStickyWrapper = el.querySelector('.el-table__header-wrapper')
        tableStickyWrapper.style.top = value?.offsetTop ? convertToPx(value.offsetTop) : this.offsetTop
        tableCell = tableStickyWrapper.querySelectorAll('.el-table__header .el-table__cell')
      }
      // for sticky footer
      if (this.#target === 'StickyFooter') {
        tableStickyWrapper = el.querySelector('.el-table__footer-wrapper')
        tableStickyWrapper.style.bottom = value?.offsetBottom ? convertToPx(value.offsetBottom) : this.offsetBottom
        tableCell = tableStickyWrapper.querySelectorAll('.el-table__footer .el-table__cell')
      }
      if (el.querySelector('.is-scrolling-none')) return

      let stickyLeft = 0
      let stickyRight = 0

      // stack sticky for left fixed columns
      for (let i = 0; i < tableCell.length; i++) {
        const th = tableCell[i]
        if (th.classList.contains('is-hidden')) {
          th.dataset.sticky = 'left'
          th.style.left = `${stickyLeft}px`
          stickyLeft += th.offsetWidth
          // set data-sticky-left-last attribute for last left fixed column
          if (!th.nextElementSibling?.classList.contains('is-hidden')) {
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
          if (!th.previousElementSibling?.classList.contains('is-hidden')) {
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
      inserted: (el, binding, vnode) => {
        checkElTable(binding, vnode)
        // set data-sticky-* attribute for el-table
        el.dataset[this.#target.replace(/^\S/, s => s.toLowerCase())] = ''
      },
      update: (el, binding, vnode) => {
        this.#stackStickyColumns(el, binding, vnode)
      },
    }
  }
}
