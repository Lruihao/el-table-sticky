<!-- [sticky-header] 合并行或列 -->
<template>
  <div>
    <el-table
      v-sticky-header
      :data="tableData"
      class="table"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        prop="amount1"
        sortable
        label="数值 1"
      />
      <el-table-column
        prop="amount2"
        sortable
        label="数值 2"
      />
      <el-table-column
        prop="amount3"
        sortable
        label="数值 3"
      />
    </el-table>

    <el-table
      v-sticky-header
      :data="tableData"
      class="table1"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        prop="amount1"
        label="数值 1（元）"
      />
      <el-table-column
        prop="amount2"
        label="数值 2（元）"
      />
      <el-table-column
        prop="amount3"
        label="数值 3（元）"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.tableData.push({
        id: '1298712' + i,
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      })
    }
  },
  methods: {
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },

    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  margin-bottom: 20px;

  ::v-deep .el-table__header th {
    background-color: rgb(217, 236, 255);
  }
}
.table1 {
  width: 100%;

  ::v-deep .el-table__header th {
    background-color: rgb(225, 243, 216);
  }
}
</style>
