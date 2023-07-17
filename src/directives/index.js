import StickyHeader from './sticky-header'
import StickyFooter from './sticky-footer'
import HeightAdaptive from './height-adaptive'

export {
  StickyHeader,
  StickyFooter,
  HeightAdaptive,
}

export default {
  /**
   * Install directives
   * @todo sticky horizontal scroll bar
   * @param {Constructor} Vue Vue Constructor
   * @param {Object} [options] options from Vue.use
   * @param {Object} [options.StickyHeader] options for v-sticky-header
   * @param {Number|String} [options.StickyHeader.offsetTop=0] the top offset of the table header
   * @param {Object} [options.StickyFooter] options for v-sticky-footer
   * @param {Number|String} [options.StickyFooter.offsetBottom=0] the bottom offset of the table footer
   * @param {Object} [options.HeightAdaptive] options for v-height-adaptive
   * @param {Number} [options.HeightAdaptive.offsetBottom=0] the offset of the table from the bottom of the page
   *
   * @example <el-table v-height-adaptive="{ offsetBottom: 30 }" height="100px">...</el-table>
   */
  install(Vue, options = {}) {
    const {
      StickyHeader: headerOptions = {},
      StickyFooter: footerOptions = {},
      HeightAdaptive: adaptiveOptions = {},
    } = options
    Vue.directive(StickyHeader.name, new StickyHeader(Vue, headerOptions).init())
    Vue.directive(StickyFooter.name, new StickyFooter(Vue, footerOptions).init())
    Vue.directive(HeightAdaptive.name, new HeightAdaptive(adaptiveOptions).init())
  },
}
