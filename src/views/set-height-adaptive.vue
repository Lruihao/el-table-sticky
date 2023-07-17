<!-- [height-adaptive] 高度自适应的表格 -->
<template>
  <div>
    <el-alert show-icon type="info" :closable="false">
      <template #title>
        <span>表格设置 <code>height</code> 属性自带固定表头和横向滚动条效果，配合 <code>v-height-adaptive</code> 指令实现表格高度自适应</span>
      </template>
    </el-alert>
    <el-table
      v-height-adaptive="{ offsetBottom: tableOffsetBottom }"
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
    <el-alert
      type="success"
      show-icon
      @close="tableOffsetBottom = 20"
    >
      <template #title>
        <span><code>v-height-adaptive</code> 的 <code>offsetBottom</code> 支持响应式</span>
      </template>
    </el-alert>
  </div>
</template>

<script>
export default {
  name: 'SetHeightView',
  data() {
    return {
      tableData: [],
      tableOffsetBottom: 58.5
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
