<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
<!--        <search id="header-search" class="right-menu-item" />-->

<!--        <screenfull id="screenfull" class="right-menu-item hover-effect" />-->

<!--        <el-tooltip content="全局字体大小" effect="dark" placement="bottom">-->
<!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
<!--        </el-tooltip>-->
<!--        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">-->
<!--          <div class="avatar-wrapper">-->
<!--            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
<!--            <i class="el-icon-caret-bottom" />-->
<!--          </div>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            &lt;!&ndash;          <a target="_blank" href="https://www.bigfool.cn">&ndash;&gt;-->
<!--            &lt;!&ndash;            <el-dropdown-item>my</el-dropdown-item>&ndash;&gt;-->
<!--            &lt;!&ndash;          </a>&ndash;&gt;-->
<!--            <el-dropdown-item divided @click.native="logout">-->
<!--              <span style="display:block;">退出</span>-->
<!--            </el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->




      </template>

      <span class="right-menu-item"><span class="user-name" :title="roles">用户:『 {{ name }} 』</span></span>
      <span class="right-menu-item"><span class="user-name" :title="roles">昵称:『 {{ user_nick_name }} 』</span></span>
      <span class="right-menu-item"><span class="user-name" :title="roles">角色:『 {{ roles[0] }} 』</span></span>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
<!--          <a target="_blank" href="https://www.bigfool.cn">-->
<!--            <el-dropdown-item>my</el-dropdown-item>-->
<!--          </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'name',
      'user_nick_name',
      'roles'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .github-link {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        vertical-align: text-bottom;
        cursor: pointer;

        .icon {
          vertical-align: middle;
        }
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        .user-name {
          font-size: 14px;
          color: #1d8df4;
          cursor: pointer;
        }

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
