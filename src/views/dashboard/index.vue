<template>
  <div class="dashboard-container">
<p class="hint"> 欢迎使用此系统！</p>
<p class="hint"> 第一次使用请修改密码！</p>
<p class="hint"> 如果您已经修改密码，请自动忽略此条信息！</p>


  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

.hint{
  font-size: 26px;
  color: red;
}


.dashboard-container {
  padding: 30px 55px;
  background-color: rgb(255, 255, 255);
  position: relative;
}
</style>
