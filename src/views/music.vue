<template>
  <div class="music">
    <!--轮播图部分-->
    <div class="carousel">
      <el-carousel :interval="2500" type="card" height="231px">
        <el-carousel-item v-for="banner in banners"
          ><img :src="banner.imageUrl"
        /></el-carousel-item>
      </el-carousel>
    </div>
    <!--推荐歌单部分-->
    <div class="playlist">
      <h3>推荐歌单</h3>
      <el-card
        v-for="item in playlist"
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <img :src="item.picUrl" />
        <span>{{ item.name }}</span>
      </el-card>
    </div>
    <!--最新音乐部分-->
    <div class="latestMusic">
      <h3>最新音乐</h3>
      <el-card
        v-for="item in latestMusic"
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <img :src="item.picUrl" />
        <span>{{ item.name }}</span>
        <!-- <span>{{ item.name }}</span> -->
      </el-card>
    </div>
  </div>
</template>

<script>
import { getBanners, getPlayList, getLatestMusics } from "@/api/music";
export default {
  name: "Music",

  data() {
    return {
      //轮播图
      banners: [],
      //推荐歌单
      playlist: [],
      //最新音乐
      latestMusic: [],
    };
  },

  mounted() {
    //获取轮播图数据
    getBanners().then((response) => {
      this.banners = response.banners;
    });
    //获取推荐歌单数据
    getPlayList().then((response) => {
      this.playlist = response.result;
    });
    //获取最新音乐数据
    getLatestMusics()
      .then((response) => {
        this.latestMusic = response.result;
      })
      .catch((error) => {
        console.log("网易云音乐API接口请求失败", error);
        this.$message({
          message: this.$createElement(
            "i",
            { style: "color: teal" },
            "网易云音乐API接口繁忙"
          ),
        });
      });
  },
  methods: {},
};
</script>

<style lang="css" scoped>
.music {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: url("../assets/imgs/music.jpg") center center / cover no-repeat;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  position: fixed;
  overflow: auto;
  animation: header-effect 1s !important;
}
.carousel {
  width: 70%;
  margin: 75px auto;
  margin-bottom: 0;
  text-align: center;
}
.el-carousel__item {
  border-radius: 16px;
  background-color: #f5fbff;
  width: 550px;
}
.el-carousel__item img {
  width: 100%;
  height: inherit;
}
.playlist {
  text-align: center;
  width: 70%;
  margin: 0 auto;
  /* border: 1px solid black; */
}
.playlist h3 {
  color: #cfd5e2;
  font-weight: 500;
}
.playlist .el-card {
  display: inline-block;
  vertical-align: top;
  width: 15%;
  margin: 10px;
  padding: 0px !important;
  border-radius: 4px;
  border: none;
  background-color: #66666600;
  cursor: pointer;
}
.playlist img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.playlist span {
  color: #cfd5e2;
  font-weight: 600;
  font-size: 16px;
}
.latestMusic {
  text-align: center;
  width: 70%;
  margin: 0 auto;
}
.latestMusic h3 {
  color: #cfd5e2;
  font-weight: 500;
}
.latestMusic .el-card {
  display: inline-block;
  vertical-align: top;
  width: 15%;
  margin: 10px;
  padding: 0px !important;
  border-radius: 4px;
  border: none;
  background-color: #66666600;
  cursor: pointer;
}
.latestMusic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.latestMusic span {
  color: #cfd5e2;
  font-weight: 600;
  font-size: 16px;
}
</style>
