<template>
  <div id="app">
    <el-container class="app-container">
      <el-header
        class="header-container"
        height="none"
      >
        <el-link :underline="false" href="/">
          EL-TABLE-STICKY
        </el-link>
        <el-badge class="btn-menu" @click.native="drawer = true">
          <i class="el-icon-menu" />
        </el-badge>
      </el-header>
      <el-main class="main-container">
        <transition
          name="test"
          mode="out-in"
        >
          <router-view class="page-container" />
        </transition>
      </el-main>
    </el-container>

    <el-drawer
      title="导航"
      custom-class="aside-menu"
      size="450px"
      :close-on-press-escape="true"
      :visible.sync="drawer"
    >
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
        />
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      folded: true,
      drawer: false,
    }
  },
  methods: {
    jump (row) {
      if (row.name === this.$route.name) return
      this.$router.push(row.path)
      this.drawer = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.header-container {
  background-color: #fff;
  height: #{$headerHeight};
  line-height: #{$headerHeight};
  box-shadow: 0px 3px 7px #cecece;
  width: 100%;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn-menu {
    font-size: 23px;
    line-height: 23px;
    cursor: pointer;
  }
}

::v-deep .el-drawer.aside-menu {
  margin: 20px 20px 20px 0px;
  height: calc(100vh - 40px);
  border-radius: 9px;
}

::v-deep .el-drawer.aside-menu .el-drawer__header {
  margin-bottom: 8px;
}

::v-deep .el-drawer.aside-menu .el-drawer__body {
  padding: 0px 12px 0px 12px;
}

::v-deep .row-pointer {
  cursor: pointer;
}
</style>
