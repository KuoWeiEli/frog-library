<template>
  <div id="app">
    <el-container>
      <el-header>
<!--        <div>MY HEADER</div>-->
      </el-header>
      <el-main>
        <el-row type="flex" justify="center" align="middle">
          <router-view></router-view>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'App'
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
}

.el-row {
  height: 87vh;  /* set the height of el-row, let the align attribute can work */
}

</style>
