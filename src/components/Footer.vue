<template>
  <div class="footer" :class="{'footer-homepg': home}">
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
export default {
data() {
  return{
    home: true
  }
},
methods: {
chckPage() {
   if(this.$route.name === 'Home') {
        this.home = true;
      } else {
        this.home = false;
      }
}
},
mounted(){
this.chckPage();
},
watch: {
  $route: {
    handler() {
      if(this.$route.name === 'Home') {
        this.home = true;
      } else {
        this.home = false;
      }
    }
  }
}
};
</script>
<style scoped>
img {
  width: 80px;
  margin-left: 0.5rem;
}
p{
font-size: .8rem;
}
.footer {
  width: 100vw;
  height: 10vh;
  margin-top: 2rem;
}
.footer-homepg{
position: fixed;
top: 89vh;
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
width: 60px;
margin-left: 0;
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {

}
@media only screen and (max-width: 768px) {
  .footer-content {
    width: 90vw;
    margin-left: 1rem;
  }
}
</style>