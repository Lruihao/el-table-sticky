<!-- [sticky-header] 筛选 -->
<template>
  <div>
    <div class="page-header">
      <el-button @click="resetDateFilter">
        清除日期过滤器
      </el-button>
      <el-button @click="clearFilter">
        清除所有过滤器
      </el-button>
    </div>
    <el-table
      ref="filterTable"
      v-sticky-header="{ offsetTop: 40 }"
      stripe
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
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
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
          >
            {{ scope.row.tag }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StickyFilterView',
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.tableData.push({
        date: `2016-05-0${i % 4 + 1}`,
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: i % 2 === 0 ? '家' : '公司',
      })
    }
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
  },
}
</script>

<style lang="scss" scoped>
.page-header {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}
</style>
