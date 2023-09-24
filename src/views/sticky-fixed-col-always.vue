<!-- [sticky-header] 固定列表格，横向滚动条添加 .always 修饰符 -->
<template>
  <div>
    <div class="page-header">
      <el-button type="primary" @click="showName = !showName">
        {{ showName ? '隐藏姓名' : '显示姓名' }}
      </el-button>
    </div>
    <el-table
      v-sticky-header.always="{ offsetTop: 'calc(40px + 1rem)' }"
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
        v-if="showName"
        fixed
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
        min-width="1000"
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
      showName: true,
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
<style lang="scss" scoped>
.page-header {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 4;
  padding-block: 0.5rem;
  box-shadow: 1rem 0 0 rgba(255, 255, 255, 1);
}
</style>
