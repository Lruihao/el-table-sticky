import StickyHeader from './sticky-header'
import StickyFooter from './sticky-footer'

export {
  StickyHeader,
  StickyFooter,
}

export default {
  /**
   * Install directives
   * @param {Constructor} Vue Vue Constructor
   * @param {Object} [options] options from Vue.use
   * @param {String|Number} [options.offsetTop='0px'] offset top for sticky header
   * @param {String|Number} [options.offsetBottom='0px'] offset bottom for sticky footer
   */
  install(Vue, options = {}) {
    Vue.directive('StickyHeader', new StickyHeader(Vue, options).init())
    Vue.directive('StickyFooter', new StickyFooter(Vue, options).init())
  },
}
