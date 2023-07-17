<!-- 固定高度的表格 -->
<template>
  <div>
    <el-alert show-icon type="success" :closable="false">
      <template #title>
        <span>表格设置 <code>height</code> 或者 <code>max-height</code> 属性自带固定表头和横向滚动条效果，无需设置 <code>v-sticky-header</code>, <code>v-sticky-footer</code>, <code>v-sticky-h-scroll</code> 指令</span>
      </template>
    </el-alert>
    <el-table
      stripe
      :data="tableData"
      height="400px"
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
  name: 'SetHeightView',
  data() {
    return {
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
