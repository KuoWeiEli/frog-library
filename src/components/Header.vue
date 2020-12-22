<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
    <el-menu-item index="0" route="/LibraryInfo">館藏資訊</el-menu-item>
    <el-submenu index="1">
      <template slot="title">紀錄</template>
      <el-menu-item index="1-1" route="/deliver/work">預約紀錄</el-menu-item>
      <el-menu-item index="1-2" route="/deliver/work">借閱紀錄</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">管理</template>
      <el-menu-item index="2-1">員工管理</el-menu-item>
      <el-menu-item index="2-2">書庫管理</el-menu-item>
      <el-menu-item index="2-3">預約管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">相關連結</template>
      <el-menu-item index="3-1"><a href="http://www.frog-jump.com/" target="_blank">德義資訊官網</a></el-menu-item>
      <el-menu-item index="3-2"><a href="https://www.104.com.tw/company/oe84aqo" target="_blank">徵才專區</a></el-menu-item>
      <el-menu-item index="3-3"><a href="https://docs.google.com/spreadsheets/d/17XvYGRIsKH_QEV8CEwOmcDpmtAOkdq9EI8v4bOearuk/edit#gid=0" target="_blank">館藏資訊舊版</a></el-menu-item>
      <el-menu-item index="3-4"><a href="https://docs.google.com/forms/d/e/1FAIpQLSe5IMuV9oT3TuD1CPKiCtWVd0YhhpD40nutEANQxl7GljZ1-A/viewform" target="_blank">館藏預約舊版</a></el-menu-item>
    </el-submenu>
    <el-menu-item index="4" route="/login">Login</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'header',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
