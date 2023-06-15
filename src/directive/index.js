import StickyHeader from './sticky-header'

const Plugin = {
  install(Vue, options) {
    const stickyHeader = new StickyHeader(Vue, options)
    // directive: v-sticky-header
    Vue.directive('stickyHeader', stickyHeader.getDirective(Vue))
  },
}

export default Plugin
