<template>
  <div class="contact">
    <div class="pg">
    <div class="map">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d181139.35623429713!2d20.282169753665674!3d44.815402868941405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa3d7b53fbd%3A0x1db8645cf2177ee4!2z0JHQtdC-0LPRgNCw0LQ!5e0!3m2!1ssr!2srs!4v1614020625229!5m2!1ssr!2srs"
      width="600"
      height="400"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
    ></iframe>
    </div>
    <div class="right-sqr">
      <div class="content">
        <h1>CONTACT THE AUTHOR</h1>
        <p>E-mail address: <b>lilyannm@gmail.com</b></p>
        <p>Phone number: <b>+381605014493</b></p>
        <h2>SOCIAL NETWORKS</h2>
        <a href="https://www.facebook.com/ljiljanamarinkovicceramic"
          ><i class="fab fa-facebook"></i
        ></a>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["changeLoader", "changeLoadedImg"]),
    loaded() {
      this.changeLoader(false);
      this.changeLoadedImg(true);
    },
  },
  mounted() {
    this.loaded();
  },
};
</script>
<style scoped>
@keyframes in {
  from {
    left: -100px;
  }
  to {
    left: 0;
  }
}
a {
  text-decoration: none;
  font-size: 3rem;
  color: gray;
  /* margin-left: 4rem; */
}
@keyframes mobile-in {
  from {
    left: -100px;
  }
  to {
    left: 0px;
  }
}
h1 {
  margin-bottom: 2rem;
  font-size: 3rem;
}
.contact {
  height: 100vh;
  display: flex;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 1.2rem;
}
.right-sqr {

  margin-left: 6vw;
  height: 60vh;
  border: 10px solid #adadb0;
 
  border-right: none;
  width: 50vw;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
}
.map{
  width: fit-content;
  height: fit-content;
  margin-left: 5vw;
   box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
}
.pg{
  width: 100vw;
   animation: in 2s 1;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
}
@media only screen and (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  .content {
    margin-left: 0.7rem;
  }
  .right-sqr {
    width: 100vw;
    border: none;
    position: absolute;
    left: 0;
    animation: mobile-in 2s 1;
  }
}
</style>