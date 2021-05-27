<template>
  <div class="loader">
    <div class="white">
      <div class="tirq-dashed">
        <div class="tirq">
          <div class="white-dashed"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
@keyframes spin_left {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(90deg);
  }
}
@keyframes spin_right {
  0% {
    transform: rotate(360deg);
  }
  25% {
    transform: rotate(270deg);
  }
  50%{
  transform: rotate(180deg);
  }
  75%{
  transform: rotate(90deg);
  }
  100%{
  transform: rotate(0deg);
  }
}
.loader {
  position: absolute;
  top: 0;
  z-index: 2;
  background-color: #54545454;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
.tirq {
  width: 4rem;
  height: 4rem;
  border: 3px solid #27f2cb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tirq-dashed {
  width: 6.5rem;
  height: 6.5rem;
  border: 15px dashed #27f2cb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin_left 2s linear infinite;
  position: relative;
}
.white {
  width: 7.5rem;
  height: 7.5rem;
  border: 3px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #54545454;
}
.white-dashed {
  width: 3rem;
  height: 3rem;
  border: 4px dashed white;
  border-radius: 50%;/*
  animation: spin_right 5s linear infinite;
  position: relative;*/
}
@media only screen and (max-width: 768px) {
  .sqr {
    width: 50px;
    height: 50px;
  }
}
</style>