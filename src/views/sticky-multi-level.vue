<!-- [sticky-header] 多级表头 -->
<template>
  <div>
    <el-table
      v-sticky-header
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="150"
        fixed="left"
      />
      <el-table-column label="配送信息">
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <el-table-column label="地址">
          <el-table-column
            prop="province"
            label="省份"
            width="120"
          />
          <el-table-column
            prop="city"
            label="市区"
            width="120"
          />
          <el-table-column
            prop="zip"
            label="邮编"
            width="120"
          />
          <el-table-column
            prop="address"
            label="地址"
            min-width="900"
          />
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StickyMultiLevelView',
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
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      })
    }
  },
}
</script>
