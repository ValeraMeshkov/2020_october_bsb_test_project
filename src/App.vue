<template>
  <div id="app">
    <Header class="HEADER" />

    <div class="WRAPPER">
      <div class="CONTENT">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Header
  },
  mounted() {
    this.listenerWindowWidth();
  },
  methods: {
    ...mapActions({
      changeWindowWidth: "changeWindowWidth"
    }),
    listenerWindowWidth() {
      this.changeWindowWidth(window.innerWidth);
      window.addEventListener(
        `resize`,
        e => {
          this.changeWindowWidth(e.target.innerWidth);
        },
        false
      );
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/main.scss";

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;

  .HEADER {
    height: $header-height;
    box-sizing: border-box;
    width: 100%;
    background: #fff;
  }

  .WRAPPER {
    position: fixed;
    top: $header-height;
    width: 100%;
    height: calc(100vh - #{$header-height});
    box-sizing: border-box;
    overflow-y: auto;

    .CONTENT {
      position: relative;
      min-height: calc(100vh - #{$header-height});
      box-sizing: border-box;
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>
