<template>
  <div class="projects">
    <div class="pg-col" v-if="showGallery === false">
      <div class="preview">
        <div
          class="prev-div"
          v-for="(project, index) in projects"
          :key="index"
          @click="showProj(project)"
        >
          <img class="prev-img" :src="project.coverphoto_path" alt="" />
          <h3>{{ project.title.toUpperCase() }}</h3>
        </div>
      </div>
    </div>
    <Gallery
    :key="'g' + componentKey"
      v-if="showGallery"
      :images="images"
      :chosenProj="chosenProj"
      @go-back="goBack()"
    ></Gallery>
  </div>
</template>
<script>
import Gallery from "../components/Gallery.vue";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import { checkLanguage } from "../mixins/checkLanguage.js";
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
      componentKey: 0
    };
  },
  mixins: [checkLanguage],
  methods: {
    ...mapActions(["changeLoader"]),
    forceRerender() {
      this.componentKey += 1;
    },
    getProjects() {
      axios.get(this.baseUrl + "projects").then((res) => {
        console.log(res);
        this.projects = res.data.data;
        this.changeToLanguage();
     
        this.changeLoader(false);
      });
    },
    goBack() {
      this.showGallery = false;
    },

    showProj(project) {
      let proj_id = project.proj_id;
      // this.changeLoader(true);
      axios
        .get(this.baseUrl + "project_images", { params: { proj_id: proj_id } })
        .then((res) => {
          this.images = res.data.data;
          this.chosenProj = project;
          this.showGallery = true;
      
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
  animation: in 2s 1;
  position: relative;
  top: 6vh;
}
.preview {
  display: flex;
  justify-content: center;
  margin-bottom: 20vh;
  flex-wrap: wrap;
  width: 100vw;
}
.prev-img {
  width: 30vw;
  height: 30vh;
  object-fit: cover;
}
.prev-div {
  width: 30vw;
  margin-left: 2rem;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  cursor: pointer;
}

.up-sqr {
  height: 15vh;
  margin-bottom: 30vh;
  border-top: none;
  width: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  border: 10px solid #adadb0;
  border-top: none;
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