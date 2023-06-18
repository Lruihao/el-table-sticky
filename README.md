# el-table-sticky

> 一个实现 Element UI (Vue 2) 表格的表头吸顶、滚动条吸底以及表尾合计行吸底功能的插件。

## 背景

Element UI 的表格组件在使用时，如果表格内容过多，表格会出现滚动条，但是表头不会吸顶，表尾合计行也不会吸底，这样在表格内容过多时，表头和表尾合计行就会被遮挡，影响用户体验。

虽然可以通过设置 `max-height` 或者 `height` 属性来实现相同的效果，但是这个高度值只支持设置数字型，在实际开发中往往需要借助 JS 来计算，这样就会增加开发和维护成本。于是就有了这个插件。

## 特性

依赖于 `position: sticky` 属性，所以只支持现代浏览器，[在线示例](https://lruihao.github.io/el-table-sticky/)。

- 支持表头吸顶 (v-sticky-header)
- 支持滚动条吸底 (v-sticky-h-scroll)
- 支持表尾合计行吸底 (v-sticky-footer)

## 安装

```bash
npm install @cell-x/el-table-sticky
```

## 注册指令

全局注册指令：

```js
import elTableSticky from '@cell-x/el-table-sticky'

Vue.use(elTableSticky, {
  offsetTop: 0, // 吸顶偏移量，可以是 CSS 支持的距离值
  offsetBottom: 0, // 吸底偏移量，可以是 CSS 支持的距离值
})
```

局部注册指令：

```js
import Vue from 'vue'
import {
  StickyHeader,
} from '@cell-x/el-table-sticky'

const stickyHeader = new StickyHeader(Vue, { offsetTop: 0 })

export default {
  directives: {
    stickyHeader: stickyHeader.getDirective(Vue),
  }
}
```

## 使用

```html
<el-table
  v-sticky-header
  v-sticky-h-scroll
  v-sticky-footer
>
  <!-- ... -->
</el-table>
```

## 表格属性

| 参数                 | 说明                                                | 类型               | 默认值 |
| -------------------- | --------------------------------------------------- | ------------------ | ------ |
| `v-sticky-header`    | 表头吸顶指令                                        | `{Boolean}`        | `true` |
| `v-sticky-h-scroll`  | 滚动条吸底指令                                      | `{Boolean}`        | `true` |
| `v-sticky-footer`    | 表尾合计行吸底指令                                  | `{Boolean}`        | `true` |
| `data-offset-top`    | 吸顶偏移量，会覆盖全局配置的值，可以是 CSS 支持的距离值 | `{Number, String}` | `0`    |
| `data-offset-bottom` | 吸底偏移量，会覆盖全局配置的值，可以是 CSS 支持的距离值 | `{Number, String}` | `0`    |

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
