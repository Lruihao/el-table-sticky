import StickyHeader from './sticky-header'
import './css/sticky-header.scss'

const Plugin = {
  install(Vue, options) {
    // directive: v-sticky-header
    const stickyHeader = new StickyHeader(Vue, options)
    Vue.directive('stickyHeader', stickyHeader.getDirective(Vue))
  },
}

export default Plugin
