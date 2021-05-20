<template>
  <div class="list-items" v-if="edit === false">
    <div class="top-title">
      <h1 v-if="projects">EDIT PROJECTS</h1>
      <h1 v-if="exh">EDIT EXHIBITIONS</h1>
      <i class="fas fa-times exit" @click="closeEdit"></i>
    </div>
    <div class="list" v-if="projects">
      <div class="item" v-for="(project, index) in projects" :key="'p' + index">
        <div class="delete-img-div">
          <i
            class="fas fa-trash-alt delete-img"
            @click="deleteProj(project)"
          ></i>
        </div>
        <img class="item-img" :src="project.coverphoto_path" />

        <div class="item-desc">
          <h3 class="bottom-title">
            {{ project.proj_title.toUpperCase() }}
          </h3>
          <i class="far fa-edit icon" @click="editProj(project)"></i>
        </div>
      </div>
    </div>
    <div class="list" v-if="exh">
      <div class="item" v-for="(exh, index) in exh" :key="'e' + index">
        <div class="delete-img-div">
          <i class="fas fa-trash-alt delete-img" @click="deleteExh(exh)"></i>
        </div>
        <img class="item-img" :src="exh.coverphoto_path" />
        <div class="item-desc">
          <h3 class="bottom-title">{{ exh.exh_title.toUpperCase() }}</h3>
          <i class="far fa-edit icon" @click="editExh(exh)"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    projects: Array,
    exh: Array,
    edit: Boolean
  },
  
  methods: {
      closeEdit() {
          this.$emit('close-edit-list');
      },
      deleteExh(exh){
          this.$emit('delete-exh', exh);
      },
      deleteProj(project) {
          this.$emit('delete-proj', project);
      },
      editExh(exh){
          this.$emit('edit-exh', exh);
      },
      editProj(project){
          this.$emit('edit-proj', project);
      }
  }
};
</script>
<style scoped>
h1 {
  font-family: "HortaRegular", cursive;
  font-size: 3rem;
  margin-bottom: 10vh;
  margin-top: 1rem;
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
  margin-left: 22vw;
  cursor: pointer;
  z-index: 1;
  color: #f55977;
}
.exit{
position: absolute;
top: 10vh;
left: 95vw;
font-size: 3rem;
}
.icon {
  font-size: 1.5rem;
  position: absolute;
  margin-left: 22vw;
  color: #545454;
}
.item {
  width: 25vw;
  margin-left: 2rem;
  margin-bottom: 2rem;
  height: 40vh;
  background-color: #ced0d1;
}

.item-img {
  width: 25vw;
  height: 30vh;
  object-fit: contain;
  background-color: #7e7e7e;
}

.item-desc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}
.list {
  width: 90vw;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  height: fit-content;
}
.list-items {
  margin-top: 10vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9fff7;
}
</style>