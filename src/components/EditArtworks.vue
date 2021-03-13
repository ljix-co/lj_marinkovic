<template>
  <div class="edit-artworks">
    <div class="prev-gallery" :class="{ fade: edit }">
      <div
        v-lazyload
        class="prev-div"
        v-for="(art, index) in artworks"
        :key="index"
      >
        <div class="delete-img-div">
          <i
            class="fas fa-trash-alt delete-img"
            @click="deleteArtwork(art)"
          ></i>
        </div>
        <img
          class="prev-img"
          :data-url="art.artwork_imgpath"
          alt=""
          src="../../public/images/placeholder_photo_l.gif"
        />
        <div class="prev-desc">
          <p>{{ art.artwork_title.toUpperCase() }}</p>
          <p>
            Tehcnique: <b>{{ art.artwork_technique }}</b>
          </p>
          <p>
            Materials: <b>{{ art.artwork_material }}</b>
          </p>
          <p>
            Price: <b>{{ art.artwork_price }}</b> $
          </p>
          <i class="far fa-edit icon" @click="editArtwork(art)"></i>
        </div>
      </div>
    </div>
    <div class="edit-container">
      <div class="edit" v-if="edit">
        <i class="far fa-times-circle exit" @click="exit()"></i>
        <h1>Artwork details</h1>
        <div class="inpts">
          <input v-model="title" type="text" placeholder="Title" />
          <input v-model="material" type="text" placeholder="Material" />
          <input v-model="technique" type="text" placeholder="Technique" />
          <input v-model="price" type="number" placeholder="Price" />
          <input v-model="year" type="number" placeholder="Year" />
          <input
            v-model="type"
            type="text"
            placeholder="Type (photography, ceramics, etc.)"
          />
          <div class="selects">
            <label for="for-sale">For sale?</label>
            <select v-model="forSale" id="for-sale">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
            <label for="for-sale" v-if="forSale === 1">Sold?</label>
            <select v-model="sold" id="for-sale" v-if="forSale === 1">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
        <button>SUBMIT</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    artworks: Array,
  },
  data() {
    return {
      edit: false,
      id: null,
      title: "",
      material: "",
      technique: "",
      price: null,
      year: null,
      type: "",
      forSale: 1,
      sold: 0,
    };
  },
  methods: {
    deleteArtwork(art) {
      this.$emit("delete-artwork", art);
    },
    editArtwork(art) {
      this.edit = true;
      this.id = art.artwork_id;
      this.title = art.artwork_title;
    },
    exit() {
        this.edit = false;
        this.id = null;
    }
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
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: "Forum", cursive;
  text-align: center;
}
input {
  width: 20vw;
  height: 5vh;
  border-radius: 10px;
  border: none;
  background-color: #d3dff0;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  text-align: center;
}
input:focus {
  outline: none;
}
select {
  border: none;
  width: 5vw;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  background-color: #d3dff0;
  text-align: center;
}
select:focus {
  outline: none;
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
  margin-left: 22vw;
  cursor: pointer;
  z-index: 1;
}
.edit {
  top: 15vh;
  left: 35vw;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  width: 30vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: fixed;
}

.edit-artworks {
  margin-top: 15vh;

  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.exit {
  position: absolute;
  margin-top: -70vh;
  margin-left: 25vw;
  font-size: 2rem;
  cursor: pointer;
}
.fade {
  opacity: 0.1;
}
.icon {
  font-size: 1.5rem;
  cursor: pointer;
}
.inpts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw;
  gap: 1rem;
}
.prev-img {
  width: 25vw;
}
.prev-div {
  width: 25vw;
  margin-left: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  height: fit-content;
}
.prev-desc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}
.prev-gallery {
  width: 90vw;
  margin-bottom: 2rem;
  column-count: 3;
  column-gap: 1rem;
  height: fit-content;
}
.selects {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  font-size: 1.2rem;
}
</style>