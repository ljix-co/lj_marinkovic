<template>
  <div class="editor">
    <h1 class="top-title">CHNAGE DETAILS</h1>
    <i class="fas fa-times exit-edit" @click="goBack()"></i>
    <div class="edited">
      <button class="submit" @click="submitEdit()">SUBMIT</button>
      <div class="basic-info">
        <div class="edit-content">
          <label>TITLE(EN)</label>
          <input class="e-title" v-model="title" />
        </div>
        <div class="edit-content">
          <label>TITLE(RS)</label>
          <input class="e-title" v-model="title_rs" />
        </div>
        <div class="edit-content">
          <label>TIME PERIOD</label>
          <div class="time-period">
            <input
              class="year"
              type="text"
              v-model="yearStart"
              v-if="editObject.type === 'exh'"
            />
            <p v-if="editObject.type === 'exh'">-</p>
            <input class="year" type="text" v-model="yearFinish" />
          </div>
        </div>
        <div class="edit-content" v-if="editObject.type === 'exh'">
          <label>PLACE(EN)</label>
          <input class="e-title" v-model="place" />
        </div>
        <div class="edit-content" v-if="editObject.type === 'exh'">
          <label>PLACE(RS)</label>
          <input class="e-title" v-model="place_rs" />
        </div>
        <div class="edit-content" v-if="editObject.type === 'exh'">
          <label>SOLO/GROUP</label>
          <input class="e-title" v-model="exhType" />
        </div>
        <div class="edit-content" v-if="editObject.type === 'project'">
          <label>LINK</label>
          <input class="e-title" v-model="proj_link" />
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
        <div class="btns">
          <button class="btn-show" @click="showDescEn()">DESCRIPTION(EN)</button>
          <button class="btn-show" @click="showDescRs()">DESCRIPTION(RS)</button>
          <button
            class="btn-show"
            v-if="editObject.type === 'exh'"
            @click="showRevEn()"
          >
            REVIEW(EN)
          </button>
          <button
            class="btn-show"
            v-if="editObject.type === 'exh'"
            @click="showRevRs()"
          >
            REVIEW(RS)
          </button>
        </div>
        <div class="txt-editor-div">
          <h1 v-if="edit_desc_en">Description(EN):</h1>
          <vue-editor class="vue_editor" v-if="edit_desc_en" v-model="desc" />
          <h1 v-if="edit_desc_rs">Description(RS):</h1>
          <vue-editor
            class="vue_editor"
            v-if="edit_desc_rs"
            v-model="desc_rs"
          />
        </div>
        <div class="txt-editor-div" v-if="editObject.type === 'exh'">
          <h1 v-if="edit_rev_en">Review(EN):</h1>
          <vue-editor class="vue_editor" v-if="edit_rev_en" v-model="rev" />
          <h1 v-if="edit_rev_rs">Review(RS):</h1>
          <vue-editor class="vue_editor" v-if="edit_rev_rs" v-model="rev_rs" />
        </div>
      </div>
    </div>
    <!-- GALLERY -->
    <h2 class="gallery-title">GALLERY CONTENT</h2>
    <div class="gallery-div">
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
        <div class="gallery">
        <div class="dtl-imgs" v-if="images.length > 0">
          <div v-lazyload v-for="(img, index) in images" :key="'i' + index">
            <div class="">
              <i class="fas fa-trash-alt delete-gallery-img" @click="deleteImg(img)"></i>
            </div>
            <img
              class="gallery-img"
              :data-url="img.img_path"
              alt=""
              src="../../public/images/placeholder.gif"
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
    newImages: Array,
  },
  data() {
    return {
      title: this.editObject.title,
      title_rs: this.editObject.title_rs,
      desc: this.editObject.description,
      rev: this.editObject.review,
      desc_rs: this.editObject.description_rs,
      rev_rs: this.editObject.review_rs,
      yearStart: this.editObject.yearstart,
      yearFinish: this.editObject.yearfinish,
      cover: this.editObject.coverphoto_path,
      place: this.editObject.place,
      place_rs: this.editObject.place_rs,
      exhType: this.editObject.exhtype,
      placeholderImg: "../../public/images/placeholder.gif",
      url: "",
      newCover: this.editObject.coverphoto,
      newImgUrl: "",
      newImg: null,
      edit_desc_en: "",
      edit_desc_rs: "",
      edit_rev_en: "",
      edit_rev_rs: "",
      proj_link: this.editObject.proj_link,
    };
  },
  methods: {
    addNewImg() {
      let newImage = this.newImg;
      this.$emit("add-new-img", newImage);
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
    goBack() {
      this.$emit("go-back");
    },
    showDescEn() {
      this.edit_desc_en = true;
      this.edit_desc_rs = false;
      this.edit_rev_en = false;
      this.edit_rev_rs = false;
    },
    showDescRs() {
      this.edit_desc_rs = true;
      this.edit_desc_en = false;
      this.edit_rev_en = false;
      this.edit_rev_rs = false;
    },
    showRevEn() {
      this.edit_rev_en = true;
      this.edit_rev_rs = false;
      this.edit_desc_en = false;
      this.edit_desc_rs = false;
    },
    showRevRs() {
      this.edit_rev_rs = true;
      this.edit_rev_en = false;
      this.edit_desc_en = false;
      this.edit_desc_rs = false;
    },
    submitEdit() {
      let editedObject = {
        title: this.title,
        desc: this.desc,
        rev: this.rev,
        title_rs: this.title_rs,
        desc_rs: this.desc_rs,
        rev_rs: this.rev_rs,
        yearStart: this.yearStart,
        yearFinish: this.yearFinish,
        newCover: this.newCover,
        place: this.place,
        place_rs: this.place_rs,
        exhType: this.exhType,
        proj_link: this.proj_link,
      };

      // this.editObject.images = this.newImages;

      this.$emit("submit-edit", editedObject);
    },
  },
};
</script>
<style scoped>
.add-img {
  width: 20vw;
  height: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px dashed #f9fff7;
  cursor: pointer;
  font-size: 2rem;
  background-color: #7e7e7e;
}

.add-new-img-div {
  z-index: 3;
}
.basic-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 60vw;
}
.btns {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 30vw;
  gap: 1rem;
}
.btn-show {
  font-size: 1rem;
}
.cover-img {
  width: 30vw;
  height: 40vh;
  object-fit: contain;
  background-color: #7e7e7e;
}
.cover-img-div {
  width: 30vw;
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
  font-size: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-left: 17vw;
  z-index: 1;
}
.delete-img {
  color: #f55977;
}
.fa-check-circle {
  color: #27f2cb;
}
.delete-img-div {
  position: absolute;
  width: 3rem;
  height: 2.5rem;
  font-size: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-left: 17vw;
  z-index: 1;
  color: #f55977;
}
.dtl-imgs {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  height: fit-content;
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
  gap: 1rem;
  width: 80vw;
  margin-left: 10vw;
}
.edit-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 20vw;
}

.exit {
  font-size: 2rem;
  position: absolute;
  z-index: 1;
  left: 55vw;
}
.exit-edit {
  position: fixed;
  top: 10vh;
  left: 92vw;
  font-size: 3rem;
}
.fa-plus {
  color: #27f2cb;
  font-size: 3rem;
}
.delete-gallery-img{
color: #f55977;
font-size: 1.5rem;
position: absolute;
margin-left: 8vw;
}
.gallery {
  width: 55vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.gallery-div {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 80vw;
  margin-left: 20vw;
  gap: 2rem;
}
.gallery-img {
  width: 20vw;
  height: 30vh;
  object-fit: contain;
  background-color: #7e7e7e;
}

.gallery-title{
margin-top: 10vh;
width: 80vw;
margin-left: 20vw;
text-align: start;
}
.link-editor {
  border-bottom: 2px solid #27f2cb;
  cursor: pointer;
  margin-bottom: 5vh;
}
.links-editor {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 30vw;
  gap: 1rem;
}

.submit {
  position: fixed;
  left: 5vw;
  top: 7vh;
  z-index: 2;
  width: 7vw;
}
.time-period {
  display: flex;
  font-size: 2rem;
}
.top-title {
  font-family: "HortaRegular", cursive;
  font-size: 4rem;
  margin-top: 1rem;
}
.txt-editor-div {
  background-color: #f9fff7;
}
.vue_editor {
  width: 30vw;
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
@media only screen and (max-width: 768px) {
  .add-new {
    margin-left: 0%;
  }
  .add-img-div {
    width: 90vw;
  }
  .add-img {
    width: 30vw;
    height: 30vw;
  }
  .basic-info {
    width: 90vw;
  }
  .cover-img-div {
    width: 90vw;
  }
  .cover-img {
    width: 90vw;
  }
  .delete-img-div {
    margin-left: 77vw;
  }
  .edited {
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;
    justify-content: center;
  }
  .edit-content {
    width: 90vw;
    display: flex;
    flex-direction: column;
  }
  .gallery {
    width: 90vw;
    columns: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .gallery-img {
    width: 90vw;
  }
  .go-back {
    top: 4rem;
    left: 1rem;
    background-color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .txt-editor-div {
    width: 90vw;
  }
  .vue_editor {
    width: 90vw;
  }
  .submit {
    position: fixed;
    /* order: 3; */
    top: 5vh;
    left: 75vw;
    z-index: 2;
  }
}
</style>