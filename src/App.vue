<template>
  <div id="app">
    <el-container>
      <el-header>
        <TopNav v-if="$route.meta.keepAlive"></TopNav>
      </el-header>
      <el-main>
        <transition name="el-fade-in-linear">
          <router-view></router-view>
        </transition>
      </el-main>
      <el-footer>
        <Footer v-if="$route.meta.keepAlive"></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import TopNav from "@/views/TopNav.vue";
import Footer from "@/views/footer.vue";
export default {
  name: "App",
  components: { TopNav, Footer },
};
</script>
