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
        label="描述"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-tooltip effect="dark" content="查看源码" placement="top">
            <el-link
              icon="el-icon-view"
              :href="`https://github.com/Lruihao/el-table-sticky/blob/main/src/views${row.path === '/' ? '/home' : row.path}.vue`"
              type="primary"
              target="_blank"
              :underline="false"
              style="margin-right: 0.5rem;"
              @click.prevent
            />
          </el-tooltip>
          <span>{{ row.meta.description }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    jump(row) {
      if (row.name === this.$route.name) {
        this.$message.closeAll()
        return this.$message.success({
          message: '当前已经在该页面',
          showClose: true,
        })
      }
      this.$router.push(row)
    }
  },
}
</script>
