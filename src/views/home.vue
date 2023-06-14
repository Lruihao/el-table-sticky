<!-- 首页 -->
<template>
  <div>
    <el-table
      :data="$fullRouter.options.routes"
      :show-header="false"
      row-class-name="row-pointer"
      style="width: 100%"
      @row-click="jump"
    >
      <el-table-column
        prop="path"
        label="链接"
        width="190"
      />
      <el-table-column
        prop="description"
        label="描述"
        show-overflow-tooltip
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    jump(row) {
      if (row.name === this.$route.name) return
      this.$router.push(row.path)
    }
  },
}
</script>
