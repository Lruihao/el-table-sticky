// reference https://github.com/noeldelgado/gemini-scrollbar
import GeminiScrollbar from 'gemini-scrollbar'
import { throttle } from 'throttle-debounce'

const THROTTLE_TIME = 1000 / 60

export default class Scroller {
  constructor(el, binding, vnode) {
    this.#createScroller(el, binding, vnode)
  }

  /**
   * Create custom horizontal scrollbar for el-table
   * @param {Element} el el-table element
   * @param {Object} binding binding
   * @param {Object} vnode vnode
   */
  async #createScroller(el, binding, vnode) {
    // create scroller only once for the same el-table
    if (el.scroller) {
      return
    }
    // wait for el-table render
    await vnode.componentInstance.$nextTick()
    // check if el-table has horizontal scrollbar
    if (el.querySelector('.is-scrolling-none')) {
      return
    }

    el.dataset.stickyScroll = ''
    const tableBodyWrapperEl = el.querySelector('.el-table__body-wrapper')
    // create scroller
    const scroller = document.createElement('div')
    scroller.classList.add('el-table-horizontal-scrollbar')
    // set scroller content width to .el-table__body-wrapper table width
    const content = document.createElement('div')
    content.style.width = `${tableBodyWrapperEl.querySelector('table').offsetWidth}px`
    scroller.appendChild(content)
    el.appendChild(scroller)

    this.#initScrollBar(binding, scroller)
    this.#initScrollSyncHandler(tableBodyWrapperEl)
  }

  /**
   * Init scroll bar
   * @param {Object} binding binding
   * @param {Element} scroller scroller element
   */
  #initScrollBar(binding, scroller) {
    const { always = false } = binding.modifiers
    this.scrollbar = new GeminiScrollbar({
      element: scroller,
      forceGemini: true,
      autoshow: !always,
    }).create()
    // remove vertical scrollbar
    this.scrollbar.element.querySelector('.gm-scrollbar.-vertical').remove()
  }

  /**
   * Init scroll sync handler
   * @param {Element} tableBodyWrapperEl .el-table__body-wrapper element
   */
  #initScrollSyncHandler(tableBodyWrapperEl) {
    const scrollViewEl = this.scrollbar.getViewElement()

    // sync tableBodyWrapperEl horizontal scroll to scrollView
    tableBodyWrapperEl.addEventListener('scroll', throttle(THROTTLE_TIME, () => {
      scrollViewEl.scrollLeft = tableBodyWrapperEl.scrollLeft
    }))
    // sync scrollViewEl horizontal scroll to tableBodyWrapperEl
    scrollViewEl.addEventListener('scroll', throttle(THROTTLE_TIME, () => {
      tableBodyWrapperEl.scrollLeft = scrollViewEl.scrollLeft
    }))
  }

  /**
   * Recalculate the viewbox and scrollbar dimensions
   */
  update() {
    this.scrollbar.update()
  }

  /**
   * Unbind the events and remove the custom scrollbar elements
   */
  destroy() {
    this.scrollbar.destroy()
  }
}
