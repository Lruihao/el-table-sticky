import { checkElTable } from '@/utils'
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'

/**
 * @class HeightAdaptive
 * @classdesc height adaptive for el-table
 */
export default class HeightAdaptive {
  static name = 'HeightAdaptive'

  /**
   * the offset of the table from the bottom of the page
   * @type {Number}
   * @private
   */
  #offsetBottom

  /**
   * Constructor for HeightAdaptive
   * @param {Object} options options from Vue.use
   * @param {Number} [options.offsetBottom=0] the offset of the table from the bottom of the page
   */
  constructor({ offsetBottom = 0 }) {
    this.#offsetBottom = offsetBottom
  }

  /**
   * Resize el-table height
   * @param {Element} el el-table element
   * @param {Object} vnode vnode
   * @private
   * @returns {void}
   */
  #doResize(el, vnode) {
    const { componentInstance: $table } = vnode

    if (!$table.height) {
      throw new Error('el-table must set the height. Such as height=\'100px\'')
    }
    if (!$table) return

    const offsetBottom = el.__offsetBottom__ ?? this.#offsetBottom
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
        checkElTable(binding, vnode)
        el.__offsetBottom__ = binding?.value?.offsetBottom
        el.__resizeListener__ = () => {
          this.#doResize(el, vnode)
        }
        // parameter 1 is must be "Element" type
        addResizeListener(window.document.body, el.__resizeListener__)
      },
      update: (el, binding, vnode) => {
        if (el.__offsetBottom__ !== binding.value?.offsetBottom) {
          el.__offsetBottom__ = binding?.value?.offsetBottom
          this.#doResize(el, vnode)
        }
      },
      unbind: (el) => {
        removeResizeListener(window.document.body, el.__resizeListener__)
      }
    }
  }
}
