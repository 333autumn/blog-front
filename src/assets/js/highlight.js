// 代码高亮插件
import hljs from "highlight.js";
import "highlight.js/styles/vs.css";
import "highlight.js/styles/default.css";
// 由于这个插件库自带的代码高样式不是很好看,这里引入一个自己改的样式文件
// import "@/styles/codePage.scss";

const install = function (Vue) {
  Vue.directive("hcode", function (el) {
    let blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  });
  Vue.directive("code", {
    deep: true,
    bind(el, binding) {
      let targets = el.querySelectorAll("code");
      targets.forEach((target) => {
        if (typeof binding.value === "string") {
          target.textContent = binding.value;
        }
        hljs.highlightBlock(target);
      });
    },
    componentUpdated(el, binding) {
      let targets = el.querySelectorAll("code");
      targets.forEach((target) => {
        if (typeof binding.value === "string") {
          target.textContent = binding.value;
          hljs.highlightBlock(target);
        }
      });
    },
  });
};
export default install;
