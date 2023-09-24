import { checkElTable } from '@/utils'
import Scroller from '@/utils/scroller'

export default class StickyScroller {
  static name = 'StickyScroller'

  /**
   * Init directive config for Vue
   * @returns {Object} directive config
   */
  init() {
    return {
      inserted: (el, binding, vnode) => {
        checkElTable(binding, vnode)
        el.scroller = new Scroller(el, binding, vnode)
      },
    }
  }
}
