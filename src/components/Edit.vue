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
        :class="{
          gallery: images.length > 2 || newImages.length > 2,
          'add-gallery': images.length < 2 || newImages.length < 2,
        }"
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
            <div class="delete-img-div">
              <i
                class="fas fa-trash-alt delete-img"
                @click="deleteNewImg()"
              ></i>
            </div>
            <img class="gallery-img" :src="newImgUrl" alt="" />
            <!-- NEW IMG DETAILS -->
            <div class="a-details">
              <div class="a-input-div">
                <label>Artwork title:</label>
                <input class="a-input" type="text" v-model="aTitle" />
              </div>
              <div class="a-input-div">
                <label>Materials:</label>
                <input class="a-input" type="text" v-model="aMaterial" />
              </div>
              <div class="a-input-div">
                <label>Technique:</label>
                <input class="a-input" type="text" v-model="aTechnique" />
              </div>
              <div class="a-input-div">
                <label>Price:</label>
                <input class="a-input" type="text" v-model="aPrice" />
              </div>
              <div class="a-input-div">
                <label>For sale ?</label>
                <select class="a-select" v-model="aForSale" name="">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div class="a-input-div">
                <label>Sold:</label>
                <select class="a-select" v-model="aSold">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
                <div class="a-input-div">
                <label>Year:</label>
                <input class="a-input" type="number" v-model="aYear" />
              </div>
              <div class="a-btns">
                <button class="a-confirm" @click="confirmAddImg()">
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- NEW IMAGES GALLERY -->
        <div v-if="newImages.length > 0">
          <div v-lazyload v-for="(img, index) in newImages" :key="'n' + index">
            <div class="delete-img-div">
              <i
                class="fas fa-trash-alt delete-img"
                @click="deleteNewArtwork(img)"
              ></i>
              <i class="far fa-edit edit" @click="editImage(index)"></i>
            </div>
            <img
              class="gallery-img"
              :data-url="img.img_path"
              alt=""
              src="../../public/images/placeholder_photo_l.gif"
            />
            <!-- EDIT NEW IMG DETAILS -->
            <div class="a-details" v-if="editImg && indexImg === index">
              <div class="a-input-div">
                <label for="a-title">Artwork title:</label>
                <input
                  class="a-input"
                  id="a-title"
                  type="text"
                  v-model="aTitle"
                />
              </div>
              <div class="a-input-div">
                <label for="a-material">Materials:</label>
                <input
                  class="a-input"
                  id="a-material"
                  type="text"
                  v-model="aMaterial"
                />
              </div>
              <div class="a-input-div">
                <label for="a-technique">Technique:</label>
                <input
                  class="a-input"
                  type="text"
                  id="a-technique"
                  v-model="aTechnique"
                />
              </div>
              <div class="a-input-div">
                <label for="a-price">Price:</label>
                <input
                  class="a-input"
                  type="text"
                  id="a-price"
                  v-model="aPrice"
                />
              </div>
              <div class="a-input-div">
                <label for="forsale">For sale ?</label>
                <select class="a-select" name="" id="forsale">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div class="a-input-div">
                <label for="sold">Sold:</label>
                <select class="a-select" name="" id="sold">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div class="a-btns">
                <button class="a-btn" @click="confirmAddImg(img)">
                  CONFIRM
                </button>
                <button class="a-btn" @click="exitEditImg()">EXIT</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="images.length > 0">
          <div v-lazyload v-for="(img, index) in images" :key="'i' + index">
            <div class="delete-img-div">
              <i
                class="fas fa-trash-alt delete-img"
                @click="deleteImg(img)"
              ></i>
              <i class="far fa-edit edit" @click="editImage(index)"></i>
            </div>
            <img
              class="gallery-img"
              :data-url="img.img_path"
              alt=""
              src="../../public/images/placeholder_photo_l.gif"
            />
            <!-- EDIT IMG DETAILS -->
            <div class="a-details" v-if="editImg && indexImg === index">
              <div class="a-input-div">
                <label for="a-title">Artwork title:</label>
                <input
                  class="a-input"
                  id="a-title"
                  type="text"
                  v-model="aTitle"
                />
              </div>
              <div class="a-input-div">
                <label for="a-material">Materials:</label>
                <input
                  class="a-input"
                  id="a-material"
                  type="text"
                  v-model="aMaterial"
                />
              </div>
              <div class="a-input-div">
                <label for="a-technique">Technique:</label>
                <input
                  class="a-input"
                  type="text"
                  id="a-technique"
                  v-model="aTechnique"
                />
              </div>
              <div class="a-input-div">
                <label for="a-price">Price:</label>
                <input
                  class="a-input"
                  type="text"
                  id="a-price"
                  v-model="aPrice"
                />
              </div>
              <div class="a-input-div">
                <label for="forsale">For sale ?</label>
                <select class="a-select" name="" id="forsale">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div class="a-input-div">
                <label for="sold">Sold:</label>
                <select class="a-select" name="" id="sold">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div class="a-btns">
                <button class="a-btn" @click="confirmAddImg(img)">
                  CONFIRM
                </button>
                <button class="a-btn" @click="exitEditImg()">EXIT</button>
              </div>
            </div>
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
      placeholderImg: "../../public/images/placeholder_photo.jpg",
      url: "",
      newCover: "",
      // newImages: [],
      newImgUrl: "",
      newImg: null,
      aTitle: "",
      aMaterial: "",
      aTechnique: "",
      aPrice: null,
      aForSale: null,
      aSold: null,
      aYear: null,
      editImg: false,
      indexImg: null,
      editNewImg: false,
    };
  },
  methods: {
    confirmAddImg() {
      let newArtwork = {
        title: this.aTitle,
        material: this.aMaterial,
        technique: this.aTechnique,
        price: this.aPrice,
        sold: this.aSold,
        forsale: this.aForSale,
        year: this.aYear,
        image: this.newImg
      };
      this.$emit("add-artwork", newArtwork);
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
    deleteNewArtwork(img) {
      this.$emit("delete-new-artwork", img)
    },
    editImage(index) {
      this.indexImg = index;
      this.editImg = true;
    },
    exitEditImg() {
      this.indexImg = null;
      this.editImg = false;
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
      this.editObject.title = this.title;
      this.editObject.description = this.description;
      this.editObject.review = this.rev;
      this.editObject.yearstart = this.yearStart;
      this.editObject.yearfinish = this.yearFinish;
      this.editObject.coverphoto = this.newCover;
      this.editObject.images = this.newImages;

      this.$emit("submit-edit", this.editObject);
    },
  },
  mounted() {
    console.log(this.images.length);
  },
};
</script>
<style scoped>
.a-btns {
  width: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 0.5rem;
}
.a-confirm,
.a-btn {
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
.a-details {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 30vw;
  position: absolute;
  background-color: white;
  z-index: 2;
}
.a-input {
  outline: none;
  border: none;
  width: 10vw;
  height: 3vh;
  background-color: #d3dff0;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  text-align: center;
}
.a-input:focus {
  outline: none;
}
.a-input-div {
  display: flex;
  flex-direction: column;
}
.a-select {
  width: 10vw;

  background-color: #d3dff0;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  text-align: center;
  border: none;
}
.a-select:focus {
  outline: none;
}
.add-gallery {
  width: 90vw;
  margin-top: 5vh;
}
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
  /* position: absolute; */
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
/* .delete-img{
  margin-top: 1vh;
} */
.delete-img-div {
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
  /* flex-direction: column; */
  align-items: flex-start;
  justify-content: center;
  align-self: center;
  justify-self: center;
  gap: 10rem;
  width: 90vw;
}
.e-title {
  width: fit-content;
  height: 5vh;
  font-size: 2rem;
  font-family: "Forum", cursive;
  text-align: center;
  /* font-weight: bold; */
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
  /* margin-left: 2rem; */
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
  width: 4rem;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  border-bottom: 1.5px solid gray;
  text-align: center;
}
/* .v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}

.v-lazy-image-loaded {
  filter: blur(0);
} */
</style>