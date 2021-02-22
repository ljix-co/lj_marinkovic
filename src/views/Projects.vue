<template>
  <div class="projects">
    <div class="pg-col" v-if="showGallery === false">
      <div class="up-sqr">
        <h1>PROJECTS</h1>
      </div>
      <div class="preview">
        <div
          class="prev-div"
          v-for="(project, index) in projects"
          :key="index"
          @click="showProj(project)"
        >
          <img class="prev-img" :src="project.coverphoto_path" alt="" @load="imgLoaded()"/>
          <h3>{{ project.proj_title.toUpperCase() }}</h3>
        </div>
      </div>
    </div>
    <Gallery
      v-if="showGallery"
      :images="images"
      :description="description"
      :title="title"
      :date="date"
      @go-back="goBack()"
       
    ></Gallery>
  </div>
</template>
<script>
import Gallery from "../components/Gallery.vue";
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    Gallery,
  },
  data() {
    return {
      projects: [],
      images: [],
      description: "",
      title: "",
      showGallery: false,
      date: "",
    };
  },
  methods: {
    ...mapActions(["changeLoader", "changeLoadedImg"]),
    getProjects() {
      axios.get(this.baseUrl + "projects").then((res) => {
        this.projects.push(res.data.data[0]);
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].proj_id != this.projects[0].proj_id) {
            this.projects.push(res.data.data[i]);
          }
        }
        this.changeLoader(false);
      });
    },
    goBack() {
      this.showGallery = false;
    },
    imgLoaded() {
      this.changeLoadedImg(true);
    },
    showProj(project) {
      let proj_id = project.proj_id;
      this.changeLoader(true);
      axios
        .get(this.baseUrl + "project_images", { params: { proj_id: proj_id } })
        .then((res) => {
          this.images = res.data.data;
          this.description = project.proj_desc;
          this.title = project.proj_title;
          this.showGallery = true;
          if (project.proj_year_finish != null) {
            this.date =
              project.proj_year_start + " - " + project.proj_year_finish;
          } else if (project.proj_year_finish == null) {
            this.date = project.proj_year_start + " - ongoing";
          }
        });
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
  mounted() {
    this.getProjects();
    this.changeLoadedImg(false);
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
  .prev-div{
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