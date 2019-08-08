<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <router-view />
    <p class="timer">{{time}}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      ws: "",
      time: ""
    };
  },
  methods: {
    init() {
      const vm = this;
      vm.ws = new WebSocket("ws://localhost:8181");
      vm.ws.onopen = function(e) {
        console.log("Connection to server opened");
        vm.sendMessage();
      };
      vm.ws.onmessage = function(e) {
        if (e.data !== "time out") {
          const stocksData = JSON.parse(e.data);
          console.log(stocksData);
          vm.time = stocksData;
        } else {
          vm.time = e.data;
        }
      };
      vm.ws.onclose = function() {
        // 关闭 websocket
        vm.time = "连接已关闭...";
      };
    },
    sendMessage() {
      this.ws.send("1");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.timer {
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
