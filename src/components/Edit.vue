<template>
  <div class="editor">
    <div class="edited">
      <button class="submit" @click="submitEdit()">SUBMIT</button>
      <div class="basic-info">
        <div class="edit-content">
          <h1>Title:</h1>
          <input class="e-title" v-model="title" />
        </div>
        <div class="edit-content">
          <h1>Time period:</h1>
          <div class="time-period">
            <input class="year" type="text" v-model="yearStart" />
            <p>-</p>
            <input class="year" type="text" v-model="yearFinish" />
          </div>
        </div>
          <div class="edit-content" v-if="editObject.type === 'exh'">
          <h1>Place:</h1>
          <input class="e-title" v-model="place" />
        </div>
         <div class="edit-content" v-if="editObject.type === 'exh'">
          <h1>Solo/group:</h1>
          <input class="e-title" v-model="exhType" />
        </div>
        <div class="cover-img-div">
          <!-- ADD NEW COVER -->
          <div class="add-cover" v-if="cover">
            <label for="new-cover">
              <img v-if="url === ''" class="cover-img" :src="cover" alt="" />
            </label>
            <input type="file" id="new-cover" hidden @change="getFile" />
            <div v-if="url">
              <img class="cover-img" :src="url" alt="" />
              <i class="far fa-times-circle exit" @click="delNewCover()"></i>
            </div>
          </div>
         
        
          <h3 class="cover-title">COVER PHOTO</h3>
        </div>
      </div>
      <div>
        <div class="txt-editor-div">
          <h1>Description:</h1>
          <vue-editor class="vue_editor" v-model="desc" />
        </div>
        <div class="txt-editor-div">
          <h1>Review:</h1>
          <vue-editor class="vue_editor" v-model="rev" />
        </div>
      </div>
    </div>
    <!-- GALLERY -->
    <div class="gallery-div">
      <h1>Gallery content:</h1>
      <div
      class="gallery"
      >
        <div class="add-img-div" v-if="newImgUrl === ''">
          <label for="img">
            <div class="add-img-div">
              <div class="add-img">
                <i class="fas fa-plus"></i>
              </div>
            </div>
          </label>
          <input type="file" id="img" hidden @change="getNewImg" />
        </div>
        <div v-if="newImgUrl">
          <div class="add-new-img-div">
            <div class="delconf-img-div">
              <i
                class="fas fa-trash-alt delete-img"
                @click="deleteNewImg()"
              ></i>
              <i class="far fa-check-circle" @click="addNewImg()"></i>
            </div>
            <img class="gallery-img" :src="newImgUrl" alt="" />
            </div>
        </div>
        <div v-if="images.length > 0">
          <div v-lazyload v-for="(img, index) in images" :key="'i' + index">
            <div class="delete-img-div">
              <i
                class="fas fa-trash-alt delete-img"
                @click="deleteImg(img)"
              ></i>
            </div>
            <img
              class="gallery-img"
              :data-url="img.img_path"
              alt=""
              src="../../public/images/placeholder_photo_l.gif"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    editObject: Object,
    images: Array,
    newImages: Array
  },
  data() {
    return {
      title: this.editObject.title,
      desc: this.editObject.description,
      rev: this.editObject.review,
      yearStart: this.editObject.yearstart,
      yearFinish: this.editObject.yearfinish,
      cover: this.editObject.coverphoto_path,
      place: this.editObject.place,
      exhType: this.editObject.exhtype,
      placeholderImg: "../../public/images/placeholder_photo.jpg",
      url: "",
      newCover: this.editObject.coverphoto,
      newImgUrl: "",
      newImg: null
    };
  },
  methods: {
    addNewImg() {
      let newImage = this.newImg;
      this.$emit('add-new-img', newImage);
      this.newImgUrl = "";
    },
    deleteImg(img) {
      this.$emit("delete-img", img);
    },
    delNewCover() {
      this.newCover = "";
      this.url = "";
    },
    deleteNewImg() {
      this.newImgUrl = "";
    },
    getFile(e) {
      this.newCover = e.target.files[0];
      this.url = URL.createObjectURL(this.newCover);
    },
    getNewImg(e) {
      this.newImg = e.target.files[0];
      this.newImgUrl = URL.createObjectURL(this.newImg);
    },
    submitEdit() {
      let editedObject= {
        title: this.title,
        desc: this.desc,
        rev: this.rev,
        yearStart: this.yearStart,
        yearFinish: this.yearFinish,
        newCover: this.newCover,
        place: this.place,
        exhType: this.exhType
      }
      
      // this.editObject.images = this.newImages;

      this.$emit("submit-edit", editedObject);
    },
  }
};
</script>
<style scoped>

.add-img {
  width: 10vw;
  height: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dashed #214478;
  cursor: pointer;
  font-size: 2rem;
}
.add-img-div {
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  width: 30vw;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.add-new-img-div {
  z-index: 3;
}
.basic-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.cover-img {
  width: 30vw;
}
.cover-img-div {
  width: 30vw;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  cursor: pointer;
  margin-top: 5vh;
}
.cover-title {
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.delconf-img-div {
  position: absolute;
  background-color: white;
  width: 6rem;
  height: 2.5rem;
  font-size: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-left: 24vw;
  cursor: pointer;
  z-index: 1;
}
.delete-img-div{
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
.editor {
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
}
.edited {
  margin-top: 5vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: center;
  justify-self: center;
  gap: 10rem;
  width: 90vw;
}
.e-title {
  width: 40vw;
  height: 5vh;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  text-align: center;
  border: none;
  cursor: pointer;
  border-bottom: 1.5px solid gray;
}
.e-title:focus {
  outline: none;
}
.edit-content {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: flex-start;
  width: 30vw;
}
.exit {
  font-size: 2rem;
  position: absolute;
  cursor: pointer;
  z-index: 1;
  margin-top: 2vh;
  left: 32vw;
  background-color: white;
  border-radius: 50%;
  border: 2px solid #214478;
}
.gallery {
  width: 90vw;
  columns: 3;
  margin-top: 5vh;
}
.gallery-div {
  margin-top: 10vh;
  text-align: start;
}
.gallery-img {
  width: 30vw;
}
.gallery-img-div {
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  width: 30vw;
  height: fit-content;
}
.submit {
  position: absolute;
  left: 85vw;
  top: 7vh;
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
.time-period {
  display: flex;
  font-size: 2rem;
}
.txt-editor-div {
  text-align: start;
}
.vue_editor {
  width: 50vw;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.year {
  outline: none;
  border: none;
  width: 8rem;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  border-bottom: 1.5px solid gray;
  text-align: center;
}

</style>