<template>
  <div class="home">
    <transition-group tag="div" class="list" name="fade" v-if="!isLoading">
      <video-card
        v-for="item in videoList"
        :key="item.vid"
        :code="item.code"
        :description="item.description"
        :title="item.title"
        :image="item.image"
        :duration="item.duration"
        :like="item.like"
      />
      <div
        class="video-card empty"
        v-for="(item,ind) in Array(10)"
        :key="KEYWORD.MAXIMUM_VIDEO_SIZE+ind+1"
      ></div>
    </transition-group>
    <page-switch
      v-if="!isLoading"
      class="home-page-switch"
      :videoSurfingPage="videoSurfingPage"
      :videoCapacity="videoCapacity"
      :updateVideoSurfingPage="updateVideoSurfingPage"
    />
    <transition name="fade" v-if="isLoading">
      <div class="loading-container">
        <div class="loading"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import VideoCard from "@/components/VideoCard";
import PageSwitch from "@/components/PageSwitch";
import _KEYS from "@/keyword";

export default {
  name: "VideoPanel",
  components: { VideoCard, PageSwitch },
  data() {
    return { KEYWORD: _KEYS, pageSize: _KEYS.DEFAULT_VIDEO_LENGTH_PER_PAGE };
  },
  props: [
    "isLoading",
    "videoSurfingPage",
    "videoCapacity",
    "updateVideoSurfingPage",
    "videoList"
  ]
};
</script>
<style lang="scss" scoped>
@import "~@/scss/transition.scss";
@import "~@/scss/videoPanel";
@import "~@/scss/videoCard";
</style>
