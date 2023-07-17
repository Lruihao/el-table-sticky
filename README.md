# el-table-sticky

> 一个用于实现 Element UI (Vue 2) 表格的表头吸顶、表尾吸底、滚动条吸底以及高度自适应功能的指令集插件。

## 背景

Element UI 的表格组件在使用时，如果表格内容过多，表格会出现滚动条，但是表头不会吸顶，表尾合计行也不会吸底，这样在表格内容过多时，表头和表尾合计行就会被遮挡，影响用户体验。

虽然可以通过设置 `max-height` 或者 `height` 属性来实现相同的效果，但是这个高度值只支持设置数字型，在实际开发中往往需要借助 JS 来计算，这样就会增加开发和维护成本。于是就有了这个插件。

## 特性

部分指令依赖于 `position: sticky` 属性，所以只支持现代浏览器，[在线示例](https://lruihao.github.io/el-table-sticky/)。

- [x] 支持表头吸顶 (v-sticky-header)
- [x] 支持表尾合计行吸底 (v-sticky-footer)
- [ ] 支持滚动条吸底 (v-sticky-h-scroll)
- [x] 支持高度自适应 (v-height-adaptive)

## 安装

```bash
npm install @cell-x/el-table-sticky
```

## 注册指令

全局注册指令：

```js
import elTableSticky from '@cell-x/el-table-sticky'

Vue.use(elTableSticky)

// 或者

Vue.use(elTableSticky, {
  StickyHeader: {
    // 吸顶偏移量，可以是 CSS 支持的距离值，如 `0px`、`10%`、`calc(100vh - 1rem)` 等
    offsetTop: 0,
  },
  StickyFooter: {
    // 吸底偏移量，可以是 CSS 支持的距离值，如 `0px`、`10%`、`calc(100vh - 1rem)` 等
    offsetBottom: 0,
  },
  HeightAdaptive: {
    // 底部偏移量，只能是数字型
    offsetBottom: 0,
  }
})
```

局部注册指令：

```js
import {
  StickyHeader,
  StickyFooter,
  HeightAdaptive,
} from '@cell-x/el-table-sticky'

export default {
  directives: {
    StickyHeader: new StickyHeader({ offsetTop: 0 }).init(),
    StickyFooter: new StickyFooter({ offsetBottom: 0 }).init(),
    HeightAdaptive: new HeightAdaptive({ offsetBottom: 0 }).init(),
  }
}
```

## 使用

```html
<el-table v-sticky-header>...</el-table>
<el-table v-sticky-footer>...</el-table>
<el-table v-sticky-h-scroll>...</el-table>
<el-table v-height-adaptive>...</el-table>
```

## 表格属性

| 参数                | 说明               | 类型                     | 默认值                |
| ------------------- | ------------------ | ------------------------ | --------------------- |
| `v-sticky-header`   | 表头吸顶指令       | `Object[Number, String]` | `{ offsetTop: 0 }`    |
| `v-sticky-footer`   | 表尾合计行吸底指令 | `Object[Number, String]` | `{ offsetBottom: 0 }` |
| `v-sticky-h-scroll` | 滚动条吸底指令     | `Object[Number, String]` | `{ offsetBottom: 0 }` |
| `v-height-adaptive` | 高度自适应指令     | `Object[Number]`         | `{ offsetBottom: 0 }` |

## Project setup

```bash
yarn install
# Compiles and hot-reloads for development
yarn serve
# Compiles and minifies for production
yarn build
# Compiles and minifies for production with demo
yarn build:demo
# Lints and fixes files
yarn lint
```

Customize configuration see [Configuration Reference](https://cli.vuejs.org/config/).
