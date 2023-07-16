import Sticky from '@/utils/sticky'
import './css/sticky-footer.scss'

export default class StickyFooter extends Sticky {
  static name = 'StickyFooter'
  constructor(...args) {
    super(...args)
  }
}
