<!-- [sticky-header] 固定列表格 -->
<template>
  <div>
    <el-table
      v-sticky-header
      stripe
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      />
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
        prop="address"
        label="地址"
        min-width="800"
      />
      <el-table-column
        prop="zip"
        label="邮编"
        width="120"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">
            查看
          </el-button>
          <el-button type="text" size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'TableFixedColView',
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
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        })
      }
    },
    methods: {
      handleClick(row) {
        console.log(row)
      }
    },
  }
</script>
