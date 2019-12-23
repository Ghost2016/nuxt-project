<template>
  <div class="blog-nav">
    <ul>
      <li v-for="nav in navs" :key="nav.path">
        <nuxt-link :to="nav.path">{{nav.name}}</nuxt-link>
      </li>
    </ul>
    <div class="logout"><a @click="logout" v-text="token ? '退出' : '登录'"></a></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['token']),
    navs() {
      return [
        {
          name: '首页',
          path: '/',
        },
        {
          name: '分类',
          path: '/category',
        }
      ]
    }
  },
  methods: {
    logout() {
      if(!this.token) {
        this.$router.replace('/login')
      } else {
        this.$store.dispatch('logout').then(_ => {
          this.$router.replace('/')
        })
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
$height: 50px;
.blog-nav {
  padding: 0 20px;
  margin-bottom: 20px;
  display: flex;
  height: $height;
  justify-content: center;
  align-items: center;
  background: pink;
  ul {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    li {
      list-style: none;
      width: 10%;
    }
  }
}
.logout {
  cursor: pointer;
}
</style>