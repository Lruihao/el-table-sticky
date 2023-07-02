<!-- [sticky-header] 基础表格 -->
<template>
  <div>
    <el-alert
      type="info"
      class="page-header"
      show-icon
      @close="tableOffsetTop = 0"
    >
      <template #title>
        <span>当表格不是所处流盒的第一个元素时，可通过 <code>offsetTop</code> 参数设置表格距离顶部的距离。</span>
      </template>
    </el-alert>
    <el-table
      v-sticky-header="{ offsetTop: tableOffsetTop }"
      stripe
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StickyBasicView',
  data() {
    return {
      tableOffsetTop: 38.5, // 可以是数字或者 CSS 支持的距离值，如 '10px', '10%', 'calc(100vh - 50px)' 等
      tableData: [],
    }
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.tableData.push({
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.page-header {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
