import Sticky from '@/utils/sticky'
import './css/sticky-header.scss'

export default class StickyHeader extends Sticky {
  static name = 'StickyHeader'
  constructor(...args) {
    super(...args)
  }
}
