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
    // set scroller content width to .el-table__body width
    const scrollContent = document.createElement('div')
    scrollContent.style.width = `${tableBodyWrapperEl.querySelector('.el-table__body').offsetWidth}px`
    scroller.appendChild(scrollContent)
    el.appendChild(scroller)

    this.scroller = scroller
    this.scrollContent = scrollContent
    this.tableBodyWrapperEl = tableBodyWrapperEl

    this.#initScrollBar(binding)
    this.#initListenerAndObserver()
  }

  /**
   * Init scroll bar
   * @param {Object} binding binding
   */
  #initScrollBar(binding) {
    const { always = false } = binding.modifiers
    this.scrollbar = new GeminiScrollbar({
      element: this.scroller,
      forceGemini: true,
      autoshow: !always,
    }).create()
    // remove vertical scrollbar
    this.scrollbar.element.querySelector('.gm-scrollbar.-vertical').remove()
  }

  /**
   * Init listener and observer
   */
  #initListenerAndObserver() {
    const { tableBodyWrapperEl } = this
    const scrollViewEl = this.scrollbar.getViewElement()

    const bar = this.scrollbar.element.querySelector('.gm-scrollbar.-horizontal')
    const thumb = bar.querySelector('.thumb')

    // sync tableBodyWrapperEl horizontal scroll to scrollView
    tableBodyWrapperEl.addEventListener('scroll', throttle(THROTTLE_TIME, () => {
      // 1. calculate the percentage of table scroll
      // 2. calculate the position of the scrollbar according to the percentage
      const scrollPercent = tableBodyWrapperEl.scrollLeft / (tableBodyWrapperEl.scrollWidth - tableBodyWrapperEl.offsetWidth)
      thumb.style.transform = `translate3d(${scrollPercent * (bar.offsetWidth - thumb.offsetWidth)}px, 0px, 0px)`

      // NOTE due to the disabled native scrollbar, gemini-scrollbar will calculate the deviation in the following way
      // scrollViewEl.scrollLeft = tableBodyWrapperEl.scrollLeft
    }))
    // sync scrollViewEl horizontal scroll to tableBodyWrapperEl
    scrollViewEl.addEventListener('scroll', throttle(THROTTLE_TIME, () => {
      tableBodyWrapperEl.scrollLeft = scrollViewEl.scrollLeft
    }))

    // observe .el-table__body width change
    const observer = new MutationObserver(() => this.update())
    observer.observe(tableBodyWrapperEl.querySelector('.el-table__body'), {
      attributes: true,
      attributeFilter: ['style'],
    })
  }

  /**
   * Recalculate the viewbox and scrollbar dimensions
   */
  update() {
    this.scrollContent.style.width = `${this.tableBodyWrapperEl.querySelector('.el-table__body').offsetWidth}px`
    this.scrollbar.update()
  }
}
