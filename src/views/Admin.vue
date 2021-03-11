<template>
  <div class="admin">
    <div v-if="edit === false && addNew === false" :class="{ fade: warning }">
      <div class="aut-info" v-for="(info, index) in aut_info" :key="index">
        <div class="title"><h1>Biography and author's image</h1></div>
        <img
          class="img-prof"
          :class="{ fade: editImg }"
          :src="info.profimg_path"
          @load="imgLoaded()"
          @click="changeImg()"
        />
        <div v-if="editImg" class="edit-img">
          <label v-if="url === ''" class="add-file" for="real-btn"
            ><i class="fas fa-plus"></i
          ></label>
          <input id="real-btn" type="file" hidden @change="getFile" />
          <img v-if="url" :src="url" alt="" />
          <div class="btns">
            <button>CONFIRM</button>
            <button @click="closeImgEdit()">DISMISS</button>
          </div>
        </div>
        <div v-if="editor === false" class="bio" @click="changeBio(info)">
          <div class="bio-content" v-html="info.aut_bio"></div>
        </div>
        <div class="bio" v-if="editor">
          <div class="bio-content">
            <vue-editor class="vue_editor" v-model="txt" />
            <div class="btns">
              <button @click="submitBioChanges()">SUBMIT</button>
              <button @click="closeEditor()">DISMISS</button>
            </div>
          </div>
        </div>
      </div>
      <div class="projects">
        <div class="title"><h1>Projects</h1></div>

        <div class="list-projects">
          <div class="add-container">
            <div class="add" @click="addProject()">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div
            class="project"
            v-for="(project, index) in projects"
            :key="'p' + index"
          >
            <div class="delete-img-div">
              <i
                class="fas fa-trash-alt delete-img"
                @click="deleteProj(project)"
              ></i>
            </div>
            <img
              class="img-art"
              :src="project.coverphoto_path"
              @load="imgLoaded()"
            />

            <div class="bottom-line">
              <h3 class="bottom-title">
                {{ project.proj_title.toUpperCase() }}
              </h3>
              <i class="far fa-edit icon" @click="editProj(project)"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="exhbs">
        <div class="title"><h1>Exhibitions</h1></div>

        <div class="list-exh">
          <div class="add-container">
            <div class="add">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div class="exh" v-for="(exh, index) in exh" :key="'e' + index">
            <img
              class="img-art"
              :src="exh.coverphoto_path"
              @load="imgLoaded()"
            />

            <div class="bottom-line">
              <h3 class="bottom-title">{{ exh.exh_title.toUpperCase() }}</h3>
              <i class="far fa-edit icon" @click="editExh(exh)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 'dodaj u shop' dugme pri dodavanju fotografija-->
    <Edit
      :class="{ fade: warning }"
      v-if="edit"
      :editObject="editObject"
      :images="images"
      @delete-img="deleteImg"
      @submit-edit="submitEdit"
      @add-new-img="addNewImg"
    ></Edit>
    <div class="warning-div" v-if="warning">
      <Warning
        class="warning"
        :message="message"
        :images="images"
        :id="id"
        :confirmEditFunction="confirmEditFunction"
        :editObject="editObject"
        @confirm="confirm"
        @deny="deny"
      ></Warning>
    </div>
    <AddNew
      v-if="addNew"
      :type="type"
      :newId="newId"
      :images="images"
      @add-new="addNewProjExh"
      @add-new-img="addNewImg"
      @delete-new-img="deleteNewImg"
    ></AddNew>
  </div>
</template>
<script>
import Edit from "../components/Edit.vue";
import Warning from "../components/Warning";
import AddNew from "../components/AddNew.vue";
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    Edit,
    Warning,
    AddNew,
  },
  data() {
    return {
      artwork_id: null,
      aut_info: [],
      txt: "",
      editor: false,
      edit: false,
      editImg: false,
      editObject: {},
      newEditedObject: {},
      newImg: "",
      newGalleryImg: {},
      id: null,
      url: "",
      projects: [],
      exh: [],
      images: [],
      message: "",
      warning: false,
      confirmEditFunction: null,
      type: "",
      addNew: false,
      newId: null,
    };
  },
  methods: {
    ...mapActions(["changeLoadedImg", "changeLoader"]),
    addNewProjExh(newObject) {
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      if (this.type === "newProject") {
        formData.append("proj_title", newObject.title);
        formData.append("proj_desc", newObject.desc);
        formData.append("proj_year_start", newObject.yearStart);
        if (newObject.yearFinish != "") {
          formData.append("proj_year_finish", newObject.yearFinish);
        }

        formData.append("proj_coverphoto", newObject.cover);
        axios.post(this.baseUrl + "projects", formData).then((res) => {
          console.log(res);
          this.newId = res.data.proj_id;
        });
      }
    },
    addNewImg(newImage) {
      let formData = new FormData();

      formData.append("sid", localStorage.getItem("sid"));
      formData.append("img_image", newImage);

      if (this.editObject.type === "project") {
        formData.append("proj_id", this.editObject.id);

        axios.post(this.baseUrl + "project_images", formData).then((res) => {
          console.log(res);
          this.newGalleryImg.img_path =
            this.baseUrl + "images/" + res.data.img_id + "/image";
          this.newGalleryImg.id = res.data.img_id;
          this.images.push(this.newGalleryImg);
          console.log(this.newGalleryImg);
        });
      }
      if (this.editObject.type === "exh") {
        formData.append("exh_id", this.editObject.id);

        axios.post(this.baseUrl + "exh_images", formData).then((res) => {
          console.log(res);
          this.newGalleryImg.img_path =
            this.baseUrl + "images/" + res.data.img_id + "/image";
          this.newGalleryImg.id = res.data.img_id;
          this.images.push(this.newGalleryImg);
          console.log(this.newGalleryImg);
        });
      }
      if (this.type === "newProject") {
        formData.append("proj_id", this.newId);
        axios.post(this.baseUrl + "project_images", formData).then((res) => {
          console.log(res);
          this.newGalleryImg.img_path =
            this.baseUrl + "images/" + res.data.img_id + "/image";
          this.newGalleryImg.img_id = res.data.img_id;
          this.images.push(this.newGalleryImg);
          console.log(this.newGalleryImg);
        });
      }
    },
    addProject() {
      this.addNew = true;
      this.type = "newProject";
    },
    logout() {
      localStorage.removeItem("sid");
      this.$router.push({ name: "Login" });
    },
    changeBio(info) {
      this.txt = info.aut_bio;
      this.editor = true;
    },
    changeImg() {
      this.editImg = true;
    },
    closeEditor() {
      this.txt = "";
      this.editor = false;
    },
    closeImgEdit() {
      if (this.newImg != "") {
        this.newImg = "";
        this.url = "";
      } else {
        this.editImg = false;
      }
    },
    confirm() {
      this.warning = false;
      //this.edit = false;
    },
    deleteImg(img) {
      this.id = img.img_id;
      this.warning = true;
      this.message = "Are you sure you want to delete this image?";
      if (this.editObject.type === "project") {
        this.confirmEditFunction = function () {
          axios
            .delete(this.baseUrl + "project_images", {
              params: {
                img_id: this.id,
                sid: localStorage.getItem("sid"),
              },
            })
            .then((res) => {
              console.log(res);
              for (let i = 0; i < this.images.length; i++) {
                if (this.id === this.images[i].img_id) {
                  this.images.splice(i, 1);
                }
              }
            });
        };
      }
      if (this.editObject.type === "exh") {
        this.confirmEditFunction = function () {
          axios
            .delete(this.baseUrl + "exh_images", {
              params: {
                img_id: this.id,
                sid: localStorage.getItem("sid"),
              },
            })
            .then((res) => {
              console.log(res);
              for (let i = 0; i < this.images.length; i++) {
                if (this.id === this.images[i].img_id) {
                  this.images.splice(i, 1);
                }
              }
            });
        };
      }
    },
    deleteNewImg(img) {
      axios
        .delete(this.baseUrl + "images", {
          params: { sid: localStorage.getItem("sid"), img_id: img.img_id },
        })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < this.images.length; i++) {
            if (img.img_id === this.images[i].img_id) {
              this.images.splice(i, 1);
            }
          }
        });
    },
    deleteProj(project) {
      let proj_id = project.proj_id;
      this.message = `Are you sure you want to delete '${project.proj_title}' project?`;
      this.warning = true;
      this.confirmEditFunction = function () {
        axios
          .delete(this.baseUrl + "projects", {
            params: { proj_id: proj_id, sid: localStorage.getItem("sid") },
          })
          .then((res) => {
            console.log(res);
            this.$router.go();
          });
      };
    },
    deny() {
      this.message = "";
      this.warning = false;
    },
    editExh(exh) {
      this.editObject = {};
      this.images = [];
      this.editObject.id = exh.exh_id;
      this.editObject.title = exh.exh_title;
      this.editObject.description = exh.exh_desc;
      this.editObject.review = exh.exh_rec;
      this.editObject.place = exh.exh_place;
      this.editObject.coverphoto_path = exh.coverphoto_path;
      this.editObject.coverphoto = exh.exh_coverphoto;
      this.editObject.yearstart = exh.exh_date_start;
      this.editObject.yearfinish = exh.exh_date_finish;
      this.editObject.exhtype = exh.exh_type;
      this.editObject.type = "exh";

      axios
        .get(this.baseUrl + "exh_images", {
          params: { exh_id: exh.exh_id },
        })
        .then((res) => {
          this.images = res.data.data;
          this.edit = true;
        });
    },
    editProj(project) {
      this.editObject = {};
      this.images = [];
      this.editObject.id = project.proj_id;
      this.editObject.title = project.proj_title;
      this.editObject.description = project.proj_desc;
      this.editObject.coverphoto_path = project.coverphoto_path;
      this.editObject.yearstart = project.proj_year_start;
      this.editObject.yearfinish = project.proj_year_finish;
      this.editObject.coverphoto = project.proj_coverphoto;
      this.editObject.type = "project";

      axios
        .get(this.baseUrl + "project_images", {
          params: { proj_id: project.proj_id },
        })
        .then((res) => {
          this.images = res.data.data;
          this.edit = true;
        });
    },

    getAutInfo() {
      this.changeLoader(true);
      axios.get(this.baseUrl + "author_info").then((res) => {
        this.aut_info.push(res.data.data[0]);
        this.changeLoader(false);
      });
    },
    getExh() {
      this.changeLoader(true);
      axios.get(this.baseUrl + "exhibitions").then((res) => {
        this.exh = res.data.data;
        this.changeLoader(false);
      });
    },
    getFile(e) {
      this.newImg = e.target.files[0];
      this.url = URL.createObjectURL(this.newImg);
    },
    getProjects() {
      this.changeLoader(true);
      axios.get(this.baseUrl + "projects").then((res) => {
        this.projects = res.data.data;
        this.changeLoader(false);
        console.log(res.data.data);
      });
    },
    imgLoaded() {
      this.changeLoadedImg(true);
    },
    submitBioChanges() {
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      if (this.aut_info.aut_bio !== this.txt) {
        formData.append("aut_bio", this.txt);
        axios.patch(this.baseUrl + "author_info", formData).then((res) => {
          console.log(res);
          this.$router.go();
        });
      }
    },
    submitEdit(editedObject) {
      this.message = "Are you sure you want to submit these changes?";
      this.warning = true;
      console.log(this.editObject.yearstart);
      console.log(editedObject.yearStart);
      if (this.editObject.type === "project") {
        this.confirmEditFunction = function () {
          let formData = new FormData();
          formData.append("sid", localStorage.getItem("sid"));
          formData.append("proj_id", this.editObject.id);

          if (editedObject.title != this.editObject.title) {
            formData.append("proj_title", editedObject.title);
          }
          if (editedObject.desc != this.editObject.description) {
            formData.append("proj_desc", editedObject.desc);
          }
          if (editedObject.yearStart != this.editObject.yearstart) {
            formData.append("proj_year_start", editedObject.yearStart);
          }
          if (editedObject.yearFinish != this.editObject.yearfinish) {
            formData.append("proj_year_finish", editedObject.yearFinish);
          }
          if (editedObject.newCover != this.editObject.coverphoto) {
            formData.append("proj_coverphoto", editedObject.newCover);
          }
          axios.patch(this.baseUrl + "projects", formData).then((res) => {
            console.log(res);
            this.$router.go();
          });
        };
      }
      if (this.editObject.type === "exh") {
        this.confirmEditFunction = function () {
          let formData = new FormData();
          formData.append("sid", localStorage.getItem("sid"));
          formData.append("exh_id", this.editObject.id);

          if (editedObject.title != this.editObject.title) {
            formData.append("exh_title", editedObject.title);
          }
          if (editedObject.desc != this.editObject.description) {
            formData.append("exh_desc", editedObject.desc);
          }
          if (editedObject.rev != this.editObject.review) {
            formData.append("exh_rec", editedObject.rev);
          }
          if (editedObject.place != this.editObject.place) {
            formData.append("exh_place", editedObject.place);
          }
          if (editedObject.exhType != this.editObject.exhtype) {
            formData.append("exh_type", editedObject.exhType);
          }
          if (editedObject.yearStart != this.editObject.yearstart) {
            formData.append("exh_date_start", editedObject.yearStart);
          }
          if (editedObject.yearFinish != this.editObject.yearfinish) {
            formData.append("exh_date_finish", editedObject.yearFinish);
          }
          if (editedObject.newCover != this.editObject.coverphoto) {
            formData.append("exh_coverphoto", editedObject.newCover);
          }
          axios.patch(this.baseUrl + "exhibitions", formData).then((res) => {
            console.log(res);
            this.$router.go();
          });
        };
      }
    },
  },
  computed: {
    ...mapState(["baseUrl", "loadedImg"]),
  },
  mounted() {
    this.getAutInfo();
    this.getProjects();
    this.getExh();
  },
};
</script>
<style scoped>
button {
  width: 10vh;
  height: 5vh;
  border-radius: 10px;
  border: none;
  background-color: #214478;
  color: white;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 1rem;
  font-family: "Forum", cursive;
  text-align: center;
}
.add {
  width: 10vw;
  height: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dashed #214478;
  cursor: pointer;
  font-size: 2rem;
}
.add-container {
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  width: 30vw;
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
}
.add-file {
  width: 5vw;
  height: 5vw;
  border: 3px dashed #214478;
  display: flex;
  align-items: center;
  justify-content: center;
}
.admin {
  height: fit-content;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100vw;
}

.aut-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.bio {
  width: 35vw;
  height: fit-content;
  text-align: justify;
  margin-left: 5rem;
  margin-top: 15vh;
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  cursor: pointer;
}
.bio-content {
  width: 30vw;
  margin: 2rem;
}
.bottom-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 5vh;
}
.bottom-title {
  width: 25vw;
}
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.delete-img-div {
  position: absolute;
  background-color: white;
  width: 3rem;
  height: 2.5rem;
  font-size: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-left: 27vw;
  cursor: pointer;
  z-index: 1;
}
.edit-img {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw;
  left: 17vw;
  margin-top: 15vh;
}
.fade {
  opacity: 0.1;
}

.icon {
  font-size: 1.5rem;
  cursor: pointer;
  /* margin-right: 1rem; */
}
.img-art {
  width: 30vw;
  height: 30vh;
  object-fit: cover;
}
.img-prof {
  width: 30vw;
  cursor: pointer;
  margin-top: 15vh;
}
.list-projects,
.list-exh {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  /* justify-self: center;
  align-self: center; */
}
.projects,
.exhbs {
  margin-top: 15vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.project,
.exh {
  margin-left: 2rem;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
}
.title {
  /* position: absolute; */
  transform: rotate(270deg);
  /* margin-top: 17vh; */
  height: 10vh;
  width: 20vw;
}
.warning {
  position: fixed;
  top: 30vh;
  width: 40vw;
  height: 50vh;
  align-self: center;
  justify-self: center;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  border: 3px solid rgb(190, 3, 3);
  z-index: 5;
}
.warning-div {
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
}
</style>