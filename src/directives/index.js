import StickyHeader from './sticky-header'
import StickyFooter from './sticky-footer'
import HeightAdaptive from './height-adaptive'
import StickyScroller from './sticky-scroller'
import './css/sticky-scroller.scss'

export {
  StickyHeader,
  StickyFooter,
  StickyScroller,
  HeightAdaptive,
}

const plugin = {
  /**
   * Install directives
   * @param {Constructor} Vue Vue Constructor
   * @param {Object} [options] options from Vue.use
   * @param {Object} [options.StickyHeader] options for v-sticky-header
   * @param {Number|String} [options.StickyHeader.offsetTop=0] the top offset of the table header
   * @param {Number|String} [options.StickyHeader.offsetBottom=0] the bottom offset of horizontal scrollbar
   * @example <el-table v-sticky-header="{ offsetTop: 0 }">...</el-table>
   *
   * @param {Object} [options.StickyFooter] options for v-sticky-footer
   * @param {Number|String} [options.StickyFooter.offsetBottom=0] the bottom offset of the table footer
   * @example <el-table v-sticky-footer="{ offsetBottom: 0 }">...</el-table>
   *
   * @param {Object} [options.StickyScroller] options for v-sticky-scroller
   * @param {Number|String} [options.StickyScroller.offsetBottom=0] the bottom offset of the table horizontal scroller
   * @example <el-table v-sticky-scroller="{ offsetBottom: 0 }">...</el-table>
   *
   * @param {Object} [options.HeightAdaptive] options for v-height-adaptive
   * @param {Number} [options.HeightAdaptive.offsetBottom=0] the offset of the table from the bottom of the page
   * @example <el-table v-height-adaptive="{ offsetBottom: 0 }" height="100px">...</el-table>
   */
  install(Vue, options = {}) {
    const {
      StickyHeader: headerOptions = {},
      StickyFooter: footerOptions = {},
      StickyScroller: scrollerOptions = {},
      HeightAdaptive: adaptiveOptions = {},
    } = options
    Vue.directive(StickyHeader.name, new StickyHeader(headerOptions).init())
    Vue.directive(StickyFooter.name, new StickyFooter(footerOptions).init())
    Vue.directive(StickyScroller.name, new StickyScroller(scrollerOptions).init())
    Vue.directive(HeightAdaptive.name, new HeightAdaptive(adaptiveOptions).init())
  },
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin
