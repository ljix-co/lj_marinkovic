<template>
  <div class="projects">
    <transition name="fade" mode="out-in">
      <div class="pg-col" v-if="showGallery === false">
        <div class="preview">
          <div
            class="prev-div"
            v-for="(project, index) in projects"
            :key="index"
            @click="showProj(project)"
            :class="{ 'selected-proj': project.selected }"
          >
            <div class="year">
              <div class="triangle-right"></div>
              <p class="year-string">{{ project.proj_year }}</p>
            </div>
            <div class="line"></div>
            <div class="img-title">
              <div class="tooltip">
                <img class="prev-img" :src="project.coverphoto_path" alt="" />
                <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
              </div>
              <h3 class="proj-title">{{ project.title.toUpperCase() }}</h3>
              <a :href="project.proj_link" target="blank" class="link">{{
                $t("tooltips.go-to-website")
              }}</a>
            </div>
            <div class="short-desc" v-html="project.short_desc"></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <Gallery
        :key="'g' + componentKey"
        v-if="showGallery"
        :images="images"
        :chosenProj="chosenProj"
        @go-back="goBack()"
      ></Gallery>
    </transition>
  </div>
</template>
<script>
import Gallery from "../components/Gallery.vue";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import { checkLanguage } from "../mixins/checkLanguage.js";
import {scrollToElement} from "../mixins/scrollToElement.js";
export default {
  components: {
    Gallery,
  },
  data() {
    return {
      projects: [],
      images: [],
      showGallery: false,
      chosenProj: null,
      componentKey: 0,
    };
  },
  mixins: [checkLanguage, scrollToElement],
  methods: {
    ...mapActions(["changeLoader"]),
    forceRerender() {
      this.componentKey += 1;
    },
    getProjects() {
      this.changeLoader(true);
      axios.get(this.baseUrl + "projects").then((res) => {
        console.log(res);
        this.projects = res.data.data;
        this.changeToLanguage();

        this.changeLoader(false);
      });
    },
    goBack() {
      this.showGallery = false;
      window.scrollTo(0,0)
      setTimeout(() => {
        this.scrollToElement("selected-proj");
      }, 200);
    },

    showProj(project) {
      let proj_id = project.proj_id;
      this.changeLoader(true);
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].selected === true) {
          this.projects[i].selected = false;
        }
        if (project === this.projects[i]) {
          this.projects[i].selected = true;
        }
      }
      axios
        .get(this.baseUrl + "project_images", { params: { proj_id: proj_id } })
        .then((res) => {
          this.images = res.data.data;
          this.chosenProj = project;
          this.showGallery = true;
          this.changeLoader(false);
        });
    },
  },
  computed: {
    ...mapState(["baseUrl", "curLanguage"]),
  },
  mounted() {
    this.getProjects();
  },
  watch: {
    curLanguage: {
      handler() {
        this.changeToLanguage();
        this.forceRerender();
      },
    },
  },
};
</script>
<style scoped>
@keyframes in {
  from {
    top: -100px;
  }
  to {
    top: 6vh;
  }
}
.img-title {
  width: 45vw;
}
.line {
  height: 60vh;
  width: 1px;
  background-color: #27f2cb;
}
.link {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 800;
  color: gray;
  text-decoration: none;
}
.pg-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: 100%;
  align-self: center;
  justify-self: center;
  margin-left: 4rem;
}
.preview {
  display: flex;
  justify-content: center;
  margin-bottom: 20vh;
  flex-wrap: wrap;
  width: 100vw;
}
.prev-img {
  width: 40vw;
}
.prev-div {
  width: 70vw;
  height: 60vh;
  margin-top: 10vh; /*
background-color: #F9FFF7;*/
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.proj-title {
  font-size: 2rem;
  color: #545454;
  text-align: center;
  font-weight: 800;
  margin-top: 2rem;
}
.short-desc {
  font-size: 1.2rem;
  margin-left: 2rem;
  height: 60vh;
  width: 20vw;
  border-bottom: 5px solid #27f2cb;
}
.tooltip .tooltiptxt {
  position: absolute;
  margin-left: -40vw;
  background-color: #63f8daab;
  width: 40vw;
  transition-delay: 0.2s;
  visibility: hidden;
}
.tooltip:hover .tooltiptxt {
  visibility: visible;
}
.year {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transform: rotate(270deg);
  margin-top: 1rem;
  width: 5vw;
}
.year-string {
  color: #545454;

  font-size: 4rem;
}
@media only screen and (min-width: 1024px) and (max-width: 1440px) {
.line, .short-desc{
height: 50vh;
}
.link{
font-size: 1rem;
}
.proj-title{
font-size: 1.5rem;

}
.year-string {
font-size: 3rem;
}
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
.line{
display: none;
}
.link{
font-size: 1rem;
margin-bottom: 5vh;
}
.img-title{
width: 70vw;
margin-bottom: 5vh;
}
.prev-div{
flex-direction: column;
width: 70vw;
height: 90vh;
margin-top: 15vh;
}

.prev-img{
width: 65vw;
}
.proj-title{
font-size: 1.5rem;
}
.short-desc{
width: 65vw;
margin-left: 1rem;
border-width: 3px;
}
.year{
position: absolute;
margin-left: -10vw;
}
}
@media only screen and (max-width: 768px) {
  .pg-col {
    margin-left: 2rem;
  }
  .preview {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100vw;
  }
  .prev-div {
    width: 80vw;
    margin-left: 1.5rem;
  }
  .prev-img {
    width: 80vw;
    /* height: 50vh; */
    object-fit: cover;
  }
  .up-sqr {
    width: 80vw;
    margin-left: -1.2rem;
    border: 4px solid #adadb0;
    border: none;
    margin-bottom: 2vh;
  }
}
</style>