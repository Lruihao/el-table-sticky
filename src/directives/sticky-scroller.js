import { checkElTable } from '@/utils'
import Scroller from '@/utils/scroller'

/**
 * @class StickyScroller
 * @classdesc sticky horizontal scrollbar for el-table
 */
export default class StickyScroller {
  static name = 'StickyScroller'

  constructor({ offsetBottom = 0 }) {
    this.offsetBottom = offsetBottom
  }

  /**
   * Init directive config for Vue
   * @returns {Object} directive config
   */
  init() {
    return {
      inserted: (el, binding, vnode) => {
        checkElTable(binding, vnode)
        el.scroller = new Scroller(el, binding, vnode, this.offsetBottom)
      },
    }
  }
}
