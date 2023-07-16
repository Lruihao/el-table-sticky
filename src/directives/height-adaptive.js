import { addResizeListener, removeResizeListener } from '@/utils/resize-event'

export default class HeightAdaptive {
  static name = 'HeightAdaptive'

  #offsetBottom

  /**
   * Constructor for HeightAdaptive
   * el-table height is must be set
   * @param {*} options options from Vue.use
   * @param {Number} [options.offsetBottom=0] the offset of the table from the bottom of the page
   */
  constructor({ offsetBottom = 0 }) {
    this.#offsetBottom = offsetBottom
  }

  /**
   * Resize el-table height
   * @param {Element} el el-table element
   * @param {Object} binding binding value
   * @param {Object} vnode vnode
   * @returns {void}
   */
  doResize(el, binding, vnode) {
    const { componentInstance: $table } = vnode
    const { value } = binding

    if (!$table.height) {
      throw new Error('el-table must set the height. Such as height=\'100px\'')
    }
    const offsetBottom = (value && value.offsetBottom) || this.#offsetBottom

    if (!$table) { return }

    const height = window.innerHeight - el.getBoundingClientRect().top - offsetBottom
    $table.layout.setHeight(height)
    $table.doLayout()
  }

  /**
   * Init directive config for Vue
   * @returns {Object} directive config
   */
  init() {
    return {
      bind: (el, binding, vnode) => {
        el.resizeListener = () => {
          this.doResize(el, binding, vnode)
        }
        // parameter 1 is must be "Element" type
        addResizeListener(window.document.body, el.resizeListener)
      },
      inserted: (el, binding, vnode) => {
        this.doResize(el, binding, vnode)
      },
      unbind: (el) => {
        removeResizeListener(window.document.body, el.resizeListener)
      }
    }
  }
}
