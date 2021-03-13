<template>
  <div>
    <div class="add-artworks">
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
          <select v-model="forSale" id="for-sale" @click="changeValue">
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
      <label for="add-img">
        <div class="add-container" v-if="url === ''">
          <div class="add">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </label>
      <div class="add-container" v-if="url">
        <i class="fas fa-trash-alt delete-img" @click="deleteImg()"></i>
        <img :src="url" alt="" />
      </div>
      <input id="add-img" type="file" hidden @change="getFile" />
      <button @click="addArtwork()">ADD</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      material: "",
      technique: "",
      price: null,
      year: null,
      type: "",
      forSale: 1,
      sold: 0,
      artworkImage: "",
      url: "",
    };
  },
  methods: {
    addArtwork() {
      let newArtwork = {
        title: this.title,
        material: this.material,
        technique: this.technique,
        price: this.price,
        year: this.year,
        type: this.type,
        forSale: this.forSale,
        sold: this.sold,
        artworkImage: this.artworkImage
      };
      this.$emit('add-artwork', newArtwork);
    },
    changeValue() {
      console.log(this.forSale);
    },
    deleteImg() {
      this.artworkImage = "";
      this.url = "";
    },
    exit() {
      this.$emit("exit-add-artwork");
    },
    getFile(e) {
      this.artworkImage = e.target.files[0];
      this.url = URL.createObjectURL(this.artworkImage);
    },
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
h1 {
  margin-top: 2rem;
  margin-bottom: 2rem;
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
img {
  height: 10vw;
  margin-top: 3rem;
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
.add {
  width: 7vw;
  height: 7vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dashed #214478;
  cursor: pointer;
  font-size: 2rem;
}
.add-artworks {
  margin-top: 6vh;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  width: 30vw;
  height: fit-content;
  /* margin-bottom: 10vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-left: 30vw; */
  background-color: white;
}
.add-container {
  width: 20vw;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.delete-img {
  position: absolute;
  z-index: 2;
  margin-left: 25vw;
  margin-top: -15vh;
  font-size: 2rem;
}
.exit {
  position: absolute;
  margin-top: -80vh;
  margin-left: 25vw;
  font-size: 2rem;
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
.selects {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  font-size: 1.2rem;
}
</style>