<template>
  <div class="add-new">
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
    <div class="gallery-div">
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      yearStart: "",
      yearFinish: "",
      cover: "",
      url: "",
    };
  },
};
</script>
<style scoped>
</style>