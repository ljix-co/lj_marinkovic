<template>
  <div class="editor">
    <div class="edited">
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
          <img class="cover-img" :src="cover" alt="" />
          <h3 class="cover-title">COVER PHOTO</h3>
        </div>
      </div>
      <div class="txt-editor-div">
        <h1>Description:</h1>
        <vue-editor class="vue_editor" v-model="desc" />
      </div>
    </div>
    <div class="gallery-div">
      <h1>Gallery content:</h1>
      <div class="gallery">
        <div class="add-img-div">
          <div class="add-img">
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <div v-for="(img, index) in images" :key="'i' + index">
          <div class="delete-img-div">
            <i class="fas fa-trash-alt delete-img"></i>
          </div>
          <img class="gallery-img" :src="img.img_path" alt="" />
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
  },
  data() {
    return {
      title: this.editObject.title,
      desc: this.editObject.description,
      yearStart: this.editObject.yearstart,
      yearFinish: this.editObject.yearfinish,
      cover: this.editObject.coverphoto_path,
    };
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
.delete-img-div {
  position: absolute;
  background-color: white;
  width: 3rem;
  font-size: 2rem;
  text-align: center;
  /* left: 25vw; */
  margin-left: 27vw;
  cursor: pointer;
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
</style>