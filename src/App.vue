<template>
  <div id="app">
    <el-container>
      <el-header>
        <myHeader></myHeader>
      </el-header>
      <el-main>
        <el-row>
          <router-view></router-view>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import myHeader from "@/components/Header";

export default {
  name: 'App',
  components: { myHeader }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
  min-width: 300px;
}

</style>
