<!-- [sticky-header] 多选 -->
<template>
  <div>
    <el-table
      v-sticky-header
      stripe
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        align="center"
        fixed="left"
        width="55"
      />
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
        width="1200"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StickySelectionView',
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
