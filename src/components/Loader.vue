<template>
  <div class="loader">
    <div class="sqr"></div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
@keyframes left-right {
  0% {
    left: 0px;
    transform: rotate(0deg);
  }

  50% {
    left: 87vw;
  }

  100% {
    left: 0px;
    transform: rotate(359deg);
  }
}
.loader {
  position: absolute;
  top: 0;
  z-index: 2;
  background-color: #c8c8ca78;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.sqr {
  border: 8px solid #214478;
  width: 150px;
  height: 150px;
  position: relative;
  animation: left-right 10s infinite linear;
}
@media only screen and (max-width: 768px) {
  .sqr{
    width: 50px;
    height: 50px;
  }
}
</style>