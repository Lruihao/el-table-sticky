<!-- [sticky-footer] 表尾合计行，横向滚动条添加 .always 修饰符 -->
<template>
  <div>
    <el-table
      v-sticky-header
      v-sticky-footer.always
      :data="tableData"
      border
      :summary-method="getSummaries"
      show-summary
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="500"
      />
      <el-table-column
        prop="amount1"
        label="数值 1（元）"
        width="300"
      />
      <el-table-column
        prop="amount2"
        label="数值 2（元）"
        width="300"
      />
      <el-table-column
        prop="amount3"
        label="数值 3（元）"
        width="300"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StickySumView',
  data() {
    return {
      tableData: [],
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
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    }
  }
}
</script>
