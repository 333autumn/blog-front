<template>
  <div class="footer">
    <h3>© 2022 - 2023 By lsc</h3>
    <h3>
      <a
        href="https://beian.miit.gov.cn/#/Integrated/index"
        target="_blank"
        title="https://beian.miit.gov.cn/#/Integrated/index"
        >冀ICP备2022015823号</a
      >
    </h3>
  </div>
</template>

<script>
export default {
  name: "Footer",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="css" scoped>
/**渐变效果 花里胡哨*/
.footer {
  width: 100%;
  height: 120px;
  padding-top: 50px;
  color: #eee;
  text-align: center;
  background: linear-gradient(140.54deg, #608d00, #d30000 72.37%),
    linear-gradient(58.72deg, #0029ff, #8fff00),
    radial-gradient(100% 164.72% at 100% 100%, #6100ff 0, #00ff57 100%),
    radial-gradient(100% 148.07% at 0 0, #fff500 0, #51d500 100%);
  background-size: auto, auto, auto, auto;
  background-blend-mode: color-dodge, overlay, difference, normal;
  background-size: 400% 400%;
  -webkit-animation: color 10s ease infinite;
  animation: color 10s ease infinite;
}
/**颜色关键帧*/
@keyframes color {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
.footer h3 {
  font-size: 14px;
  color: #e8e6e3;
}
a {
  cursor: pointer;
  text-decoration: none !important;
  font-size: 14px;
  color: #e8e6e3;
}
</style>
