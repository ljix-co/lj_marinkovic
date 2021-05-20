<template>
  <div class="edit-author">
    <div class="aut-info" v-for="(info, index) in aut_info" :key="index">
      <div class="img-pass">
        <img
          class="img-prof"
          :class="{ fade: editImg }"
          :src="info.profimg_path"
          @click="changeImg()"
        />
        <div v-if="editImg" class="edit-img">
          <label v-if="url === ''" class="add-file" for="real-btn"
            ><i class="fas fa-plus"></i
          ></label>
          <input id="real-btn" type="file" hidden @change="getFile" />
          <img class="img-prof" v-if="url" :src="url" alt="" />
          <div class="btns">
            <button @click="confrmNewAutImg()">CONFIRM</button>
            <button @click="closeImgEdit()">DISMISS</button>
          </div>
        </div>
        <button @click="openChngPass" v-if="chng_pass === false">
          CHANGE PASSWORD
        </button>
        <div class="chng-pass" v-if="chng_pass">
          <label for="">OLD PASSWORD</label>
          <input type="text" v-model="old_pass" />
          <label for="">NEW PASSWORD</label>
          <input type="text" v-model="new_pass" />
          <div class="btns">
            <button @click="confirmNewPass">CONFIRM</button>
            <button @click="closeChngPass">DISMISS</button>
          </div>
        </div>
      </div>
      <div v-if="editor === false" class="bio-btns">
        <button @click="changeBio(en)">BIOGRAPHY(EN)</button>
        <button @click="changeBio(rs)">BIOGRAPHY(RS)</button>
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
  </div>
</template>
<script>
export default {
  props: {
    aut_info: Array,
  },
  data() {
    return {
      editImg: false,
      newImg: "",
      url: "",
      txt: "",
      editor: false,
      en: this.aut_info[0].aut_bio,
      rs: this.aut_info[0].aut_bio_rs,
      chng_pass: false,
      old_pass: "",
      new_pass: "",
    };
  },
  methods: {
    changeBio(en, rs) {
      if (en) {
        this.txt = en;
      } else if (rs) {
        this.txt = rs;
      }
      this.editor = true;
    },
    changeImg() {
      this.editImg = true;
    },
    closeChngPass() {
      this.chng_pass = false;
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
    confrmNewAutImg() {
      let newImg = this.newImg;
      this.$$emit("confirm-new-img", newImg);
    },
    confirmNewPass() {
      let chngd_pass = {
        old_pass: this.old_pass,
        new_pass: this.new_pass,
      };
      this.$emit("confirm-new-pass", chngd_pass);
    },
    getFile(e) {
      this.newImg = e.target.files[0];
      this.url = URL.createObjectURL(this.newImg);
    },
    openChngPass() {
      this.chng_pass = true;
    },
    submitBioChanges() {
      let txt = this.txt;
      this.$emit("submit-bio", txt);
    },
  },
};
</script>
<style scoped>
button {
  font-size: 1rem;
  font-weight: 800;
}
.add-file {
  width: 5vw;
  height: 5vw;
  border: 3px dashed #27f2cb;
  display: flex;
  align-items: center;
  justify-content: center;
}
.aut-info {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90vw;
}
.bio {
  width: 35vw;
  height: fit-content;
  text-align: justify;
  margin-left: 5rem;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.bio-btns {
  width: 30vw;
  margin-left: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 25vh;
}
.bio-content {
  width: 60vw;
  left: 20vw;
  position: absolute;
  top: 15vh;
  background-color: #F9FFF7;
  z-index: 3;
  border: 2px solid #27f2cb;
  
}
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.chng-pass {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 5vh;
}
.edit-author{
margin-left: 20vw;
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
.img-pass {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-prof {
  width: 30vw;
  margin-top: 15vh;
}

</style>