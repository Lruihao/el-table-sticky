<template>
  <div id="app">
    <el-container class="app-container">
      <el-header
        class="header-container"
        height="none"
      >
        <div>
          <el-link :underline="false" @click="jump($homeRoute)">
            EL-TABLE-STICKY {{ packageVersion }}
          </el-link>
          <el-link :underline="false" href="https://github.com/Lruihao/el-table-sticky" target="_blank">
            <img
              src="https://img.shields.io/github/stars/Lruihao/el-table-sticky?style=social"
              alt="GitHub stars"
              style="vertical-align: middle;margin-left: 0.5rem;"
            >
          </el-link>
        </div>
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
    </el-drawer>
  </div>
</template>

<script>
import { version as packageVersion } from '../package.json'
export default {
  data () {
    return {
      folded: true,
      drawer: false,
    }
  },
  computed: {
    packageVersion () {
      return packageVersion
    },
  },
  methods: {
    jump (row) {
      if (row.name === this.$route.name) {
        this.$message.closeAll()
        return this.$message.success({
          message: '当前已经在该页面',
          showClose: true,
        })
      }
      this.$router.push(row)
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
