<template>
  <div class="editor">
    <i class="far fa-arrow-alt-circle-left go-back" @click="goBack()"></i>
    <div class="edited">
      <button class="submit" @click="submitEdit()">SUBMIT</button>
      <div class="basic-info">
        <div class="edit-content">
          <h1>Title(EN):</h1>
          <input class="e-title" v-model="title" />
        </div>
        <div class="edit-content">
          <h1>Title(RS):</h1>
          <input class="e-title" v-model="title_rs" />
        </div>
        <div class="edit-content">
          <h1>Time period:</h1>
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
          <h1>Place(EN):</h1>
          <input class="e-title" v-model="place" />
        </div>
        <div class="edit-content" v-if="editObject.type === 'exh'">
          <h1>Place(RS):</h1>
          <input class="e-title" v-model="place_rs" />
        </div>
        <div class="edit-content" v-if="editObject.type === 'exh'">
          <h1>Solo/group:</h1>
          <input class="e-title" v-model="exhType" />
        </div>
         <div class="edit-content" v-if="editObject.type === 'project'">
          <h1>Link:</h1>
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
        <div class="links-editor">
          <h2 class="link-editor" @click="showDescEn()">DESCRIPTION(EN)</h2>
          <h2 class="link-editor" @click="showDescRs()">DESCRIPTION(RS)</h2>
          <h2
            class="link-editor"
            v-if="editObject.type === 'exh'"
            @click="showRevEn()"
          >
            REVIEW(EN)
          </h2>
          <h2
            class="link-editor"
            v-if="editObject.type === 'exh'"
            @click="showRevRs()"
          >
            REVIEW(RS)
          </h2>
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
    <div class="gallery-div">
      <h1>Gallery content:</h1>
      <div class="gallery">
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
            <img class="cover-img" :src="newImgUrl" alt="" />
          </div>
        </div>
        <div class="dtl-imgs" v-if="images.length > 0">
          <div v-lazyload v-for="(img, index) in images" :key="'i' + index">
            <div class="">
              <i class="fas fa-trash-alt" @click="deleteImg(img)"></i>
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
      proj_link: this.editObject.proj_link
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
        proj_link: this.proj_link
      };

      // this.editObject.images = this.newImages;

      this.$emit("submit-edit", editedObject);
    },
  },
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
.dtl-imgs {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  width: 60vw;
  height: fit-content;
  margin-left: 10vw;
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
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 5vh;
}
.gallery-div {
  margin-top: 10vh;
  text-align: start;
}
.gallery-img {
  width: 15vw;
}
.gallery-img-div {
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  width: 30vw;
  height: fit-content;
}
.go-back {
  font-size: 2rem;
  position: fixed;
  left: 22vw;
  top: 1rem;
  cursor: pointer;
  z-index: 2;
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
  left: 87vw;
  top: 7vh;
  z-index: 2;
  width: 7vw;
}
.time-period {
  display: flex;
  font-size: 2rem;
}
.txt-editor-div {
  text-align: start;
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