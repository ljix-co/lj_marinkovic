<template>
  <div class="footer">
    <div class="footer-content">
    <div class="footer-txt">
      <p>Designed and coded by</p>
      <img class="lj_logo" src="../../public/images/logo_stable_trnspr.png" alt="" />
      <p>
        Supported and hosted by
        <a href="https://www.mars-server.net/"
          ><img src="../../public/images/mars.svg" alt="" /></a
        >.
      </p>
      </div>
      <p>&copy; 2021</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
img {
  width: 100px;
  margin-left: 0.5rem;
}
.footer {
  width: 100vw;
  height: 10vh;
  margin-top: 2rem;
}
.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
}
.footer-txt{
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
}
.lj_logo{
width: 80px;
margin-left: 0;
}
@media only screen and (max-width: 768px) {
  .footer-content {
    width: 90vw;
    margin-left: 1rem;
  }
}
</style>