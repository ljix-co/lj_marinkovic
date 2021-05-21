<template>
  <div class="add-new">
    <h1 class="top-title">ADD NEW</h1>
    <i class="fas fa-times exit-add" @click="goBack()"></i>
    <div class="edited" v-if="newId === null">
      <button class="submit" @click="addNew()">ADD</button>
      <div class="basic-info">
        <div class="edit-content">
          <label>TITLE (EN)</label>
          <input class="e-title" v-model="title" />
        </div>
        <div class="edit-content">
          <label>TITLE (RS)</label>
          <input class="e-title" v-model="title_rs" />
        </div>
        <div class="edit-content">
          <label v-if="type === 'newExh'">TIME PERIOD</label>
          <label v-if="type !== 'newExh'">YEAR</label>
          <div class="time-period">
            <input
              class="year"
              type="text"
              v-model="yearStart"
              v-if="type === 'newExh'"
            />
            <p v-if="type === 'newExh'">-</p>
            <input
              :class="{ year: type === 'newExh' }"
              type="text"
              v-model="yearFinish"
            />
          </div>
        </div>
        <div class="edit-content" v-if="type !== 'newExh'">
          <label>LINK TO PROJECT</label>
          <input class="e-title" v-model="link_project" />
        </div>
        <div class="edit-content" v-if="type === 'newExh'">
          <label>PLACE (EN)</label>
          <input class="e-title" v-model="place" />
        </div>
        <div class="edit-content" v-if="type === 'newExh'">
          <label>PLACE (RS)</label>
          <input class="e-title" v-model="place_rs" />
        </div>
        <div class="edit-content" v-if="type === 'newExh'">
          <label>SOLO/GROUP</label>
          <input class="e-title" v-model="exhType" />
        </div>
        <div class="cover-img-div">
          <!-- ADD COVER -->
          <div class="add-cover">
            <label for="cover">
              <div class="add-img-div" v-if="url === ''">
                <div class="add-img">
                  <i class="fas fa-plus"></i>
                </div>
              </div>
            </label>
            <input type="file" id="cover" hidden @change="getFile" />
            <div v-if="url">
              <img class="cover-img" :src="url" alt="" />
              <i class="far fa-times-circle exit" @click="delNewCover()"></i>
            </div>
          </div>
          <!-- END COVER -->
          <h3 class="cover-title">COVER PHOTO</h3>
        </div>
      </div>
      <div>
        <div class="btns">
          <button class="btn-show" @click="showDscEn()">DESCRIPTION(EN)</button>
          <button class="btn-show" @click="showDscRs()">DESCRIPTION(RS)</button>
          <button
            class="btn-show"
            v-if="type === 'newExh'"
            @click="showRevEn()"
          >
            REVIEW(EN)
          </button>
          <button
            class="btn-show"
            v-if="type === 'newExh'"
            @click="showRevRs()"
          >
            REVIEW(RS)
          </button>
        </div>
        <transition name="fade" mode="out-in">
          <div class="txt-editor-div" v-if="show_dsc_en">
            <h2>DESCRIPTION (EN)</h2>
            <vue-editor class="vue_editor" v-model="desc" />
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <div class="txt-editor-div" v-if="show_dsc_rs">
            <h2>DESCRIPTION (RS)</h2>
            <vue-editor class="vue_editor" v-model="desc_rs" />
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <div class="txt-editor-div" v-if="type === 'newExh' && show_rev_en">
            <h2>REVIEW (EN)</h2>
            <vue-editor class="vue_editor" v-model="rev" />
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <div class="txt-editor-div" v-if="type === 'newExh' && show_rev_rs">
            <h2>REVIEW (RS)</h2>
            <vue-editor class="vue_editor" v-model="rev_rs" />
          </div>
        </transition>
      </div>
    </div>
    <div class="gallery-div" v-if="newId !== null">
      <!-- ADD NEW IMG INPUT FIELD -->
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
      <!-- END IMGS -->
      <div v-if="newImgUrl">
        <div class="add-new-img-div">
          <div class="delconf-img-div">
            <i class="fas fa-trash-alt delete-img" @click="deleteNewImg()"></i>
            <i class="far fa-check-circle" @click="addNewImg()"></i>
          </div>
          <img class="gallery-img" :src="newImgUrl" alt="" />
        </div>
      </div>
      <div class="gallery" v-if="images.length > 0">
        <div v-lazyload v-for="(img, index) in images" :key="'i' + index">
          <div class="delete-img-div">
            <i class="fas fa-trash-alt delete-img" @click="deleteImg(img)"></i>
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
</template>
<script>
export default {
  props: {
    type: String,
    newId: Number,
    images: Array,
  },
  data() {
    return {
      title: "",
      title_rs: "",
      yearStart: "",
      yearFinish: "",
      cover: "",
      rev: "",
      rev_rs: "",
      desc: "",
      desc_rs: "",
      url: "",
      newImg: "",
      newImgUrl: "",
      exhType: "",
      place: "",
      place_rs: "",
      link_project: "",
      show_dsc_en: false,
      show_dsc_rs: false,
      show_rev_en: false,
      show_rev_rs: false,
      en: "en",
      rs: "rs",
    };
  },
  methods: {
    addNew() {
      let newObject = {
        title: this.title,
        title_rs: this.title_rs,
        yearStart: this.yearStart,
        yearFinish: this.yearFinish,
        cover: this.cover,
        desc: this.desc,
        desc_rs: this.desc_rs,
        rev: this.rev,
        rev_rs: this.rev_rs,
        exhType: this.exhType,
        place: this.place,
        place_rs: this.place_rs,
        link_project: this.link_project,
      };
      this.$emit("add-new", newObject);
    },
    addNewImg() {
      let newImage = this.newImg;

      this.$emit("add-new-img", newImage);
      // this.newImg = "";
      this.newImgUrl = "";
    },
    deleteImg(img) {
      this.$emit("delete-new-img", img);
    },
    delNewCover() {
      this.cover = "";
      this.url = "";
    },
    deleteNewImg() {
      this.newImg = "";
      this.newImgUrl = "";
    },
    getFile(e) {
      this.cover = e.target.files[0];
      this.url = URL.createObjectURL(this.cover);
    },
    getNewImg(e) {
      this.newImg = e.target.files[0];
      this.newImgUrl = URL.createObjectURL(this.newImg);
    },
    goBack() {
      this.$emit("go-back");
    },
    showDscEn() {
      if (this.show_dsc_en === false) {
        this.show_dsc_en = true;
        this.show_dsc_rs = false;
        this.show_rev_en = false;
        this.show_rev_rs = false;
      } else {
        this.show_dsc_en = false;
      }
    },
    showDscRs() {
      if (this.show_dsc_rs === false) {
        this.show_dsc_rs = true;
        this.show_dsc_en = false;
        this.show_rev_en = false;
        this.show_rev_rs = false;
      } else {
        this.show_dsc_rs = false;
      }
    },
    showRevEn() {
      if (this.show_rev_en === false) {
        this.show_rev_en = true;
        this.show_dsc_rs = false;
        this.show_dsc_en = false;
        this.show_rev_rs = false;
      } else {
        this.show_rev_en = false;
      }
    },
    showRevRs() {
      if (this.show_rev_rs === false) {
        this.show_rev_rs = true;
        this.show_dsc_en = false;
        this.show_rev_en = false;
        this.show_dsc_rs = false;
      } else {
        this.show_rev_rs = false;
      }
    },
  },
};
</script>
<style scoped>
.add-new {
  margin-top: 10vh;
  margin-left: 4rem;
}
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
.delete-img{
color: #f55977;
}
.fa-check-circle{
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
.exit-add {
  position: fixed;
  top: 10vh;
  left: 92vw;
  font-size: 3rem;
}
.fa-plus {
  color: #27f2cb;
  font-size: 3rem;
}
.gallery {
  width: 60vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.gallery-div {
  margin-top: 10vh;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 80vw;
  margin-left: 10vw;
}
.gallery-img {
  width: 20vw;
  height: 30vh;
  object-fit: contain;
  background-color: #7e7e7e;
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
  .cover-img-div {
    width: 90vw;
  }
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
    position: unset;
    order: 3;
    top: 0;
    left: 0;
    margin-top: 0;
  }
}
</style>