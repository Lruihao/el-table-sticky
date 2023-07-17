<!-- [height-adaptive] 高度自适应的表格（局部注册指令） -->
<template>
  <div>
    <el-alert show-icon type="info" :closable="false">
      <template #title>
        <span>表格设置 <code>height</code> 属性自带固定表头和横向滚动条效果，配合 <code>v-height-adaptive</code> 指令实现表格高度自适应</span>
      </template>
    </el-alert>
    <el-table
      v-height-adaptive1
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
import { HeightAdaptive } from '@/directives'

export default {
  name: 'SetHeightView',
  directives: {
    HeightAdaptive1: new HeightAdaptive({ offsetBottom: 20 }).init(),
  },
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
