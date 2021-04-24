<template>
  <div>
    <div class="add-artworks">
      <i class="far fa-times-circle exit" @click="exit()"></i>
      <h1>Artwork details</h1>
      <div class="inpts">
        <input v-model="title" type="text" placeholder="Title(EN)" />
        <input v-model="title_rs" type="text" placeholder="Title(RS)" />
        <input v-model="material" type="text" placeholder="Material(EN)" />
        <input v-model="material_rs" type="text" placeholder="Material(RS)" />
        <input v-model="technique" type="text" placeholder="Technique(EN)" />
        <input v-model="technique_rs" type="text" placeholder="Technique(RS)" />
        <input v-model="artform" type="text" placeholder="Artform(EN)" />
        <input v-model="artform_rs" type="text" placeholder="Artform(RS)" />
        <input v-model="price" type="number" placeholder="Price" />
        <input v-model="year" type="number" placeholder="Year" />

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
      <div class="add-container">
        <div class="add-img">
          <h3>ADD COVER</h3>
          <label for="add-img">
            <div class="add" v-if="url === ''">
              <i class="fas fa-plus"></i>
            </div>
          </label>
          <input id="add-img" type="file" hidden @change="getFile" />
          <div class="cover" v-if="url">
            <i class="fas fa-trash-alt delete-img" @click="deleteImg()"></i>
            <img :src="url" alt="" />
          </div>
        </div>
        <div class="add-img">
          <h3>ADD IMAGES OF DETAILS</h3>
          <label for="add-img-dtl">
          <div class="add">
            <i class="fas fa-plus"></i>
          </div>
          </label>
           <input id="add-img-dtl" type="file" hidden @change="getDtlImg" />
        </div>
        <div class="list-images" v-if="dtl_images.length > 0">
         <div class="img"  v-for="(img, index) in dtl_images" :key="'dtl' + index">
            <i class="fas fa-trash-alt delete-dtl-img" @click="deleteDtlImg(img)"></i>
            <img class="dtl-img" :src="img.url" alt="" />
          </div>
        </div>
      </div>
      <button @click="addArtwork()">ADD</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      title_rs: "",
      material: "",
      material_rs: "",
      technique: "",
      technique_rs: "",
      artform: "",
      artform_rs: "",
      price: null,
      year: null,
      forSale: 1,
      sold: 0,
      artworkImage: "",
      url: "",
      dtl_images: [],
      
    };
  },
  methods: {
    addArtwork() {
      let newArtwork = {
        title: this.title,
        title_rs: this.title_rs,
        material: this.material,
        material_rs: this.material_rs,
        technique: this.technique,
        technique_rs: this.technique_rs,
        artform: this.artform,
        artform_rs: this.artform_rs,
        price: this.price,
        year: this.year,
        forSale: this.forSale,
        sold: this.sold,
        artworkImage: this.artworkImage,
        dtl_images: this.dtl_images
      };
      this.$emit("add-artwork", newArtwork);
    },
    changeValue() {
      console.log(this.forSale);
    },
    deleteImg() {
      this.artworkImage = "";
      this.url = "";
    },
    deleteDtlImg(img){
      for(let i = 0; i < this.dtl_images.length; i++) {
        if(this.dtl_images[i] === img) {
          this.dtl_images.splice(i, 1);
          console.log(this.dtl_images)
        }
      }
    },
    exit() {
      this.$emit("exit-add-artwork");
    },
    getFile(e) {
      this.artworkImage = e.target.files[0];
      this.url = URL.createObjectURL(this.artworkImage);
    },
    getDtlImg(e) {
      let image = e.target.files[0];
      let url = URL.createObjectURL(image);
      this.dtl_images.push({dtl_image: image, url: url});
    }
  },
};
</script>
<style scoped>
button {
  width: 10vw;
  height: 7vh;
  border-radius: 10px;
  border: none;
  background-color: #27f2cb;
  color: #545454;
  cursor: pointer;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-family: "Forum", cursive;
  text-align: center;
  position: absolute;
  top: 7vh;
  left: 15vw;
}
h1 {
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: absolute;
  top: 7vh;
  font-size: 3rem;
}
input {
  width: 20vw;
  height: 5vh;
  border-radius: 10px;
  border: none;
  background-color: #dee0e0;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  text-align: center;
}
input:focus {
  outline: none;
}
img {
  width: 10vw;
  height: 10vw;
  object-fit: contain;
  
}
select {
  border: none;
  width: 5vw;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  background-color: #bebebe;
  text-align: center;
}
select:focus {
  outline: none;
}
.add {
  width: 10vw;
  height: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dashed #27f2cb;
  cursor: pointer;
  font-size: 2rem;
}
.add-artworks {
  margin-top: 6vh;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  width: 90vw;
  height: 90vh;
  /* margin-bottom: 10vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-left: 30vw; */
  background-color: white;
}
.add-container {
  width: 90vw;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  gap: 2rem;
  margin-top: 10vh;
}
.add-img {
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.delete-img {
  position: absolute;
  z-index: 2;
 width: 15vw;
 text-align: end;
  font-size: 1.5rem;
}
.delete-dtl-img{
   position: absolute;
  z-index: 2;
 width: 7vw;
 text-align: end;
  font-size: 1rem;
}
.dtl-img{
  width: 5vw;
}
.exit {
  position: absolute;
  top: 12vh;
 left: 80vw;
  font-size: 3rem;
  cursor: pointer;
}
.inpts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 90vw;
  gap: 1rem;
  margin-left: 2rem;
  margin-top: 10vh;
}
.img{
  width: 10vw;
  height: 10vw;
   border: 2px solid #27f2cb;
   box-sizing: border-box;
   margin-left: .5rem;
   margin-top: .5rem;
}
.list-images{
  width: 43vw;
  height: 50vh;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #dee0e0;
   box-sizing: border-box;
}
.selects {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  font-size: 1.2rem;
}

@media only screen and (max-width: 768px) {
  input {
    width: 80vw;
    height: 4vh;
  }
  img {
    height: 30vw;
  }
  select {
    width: 30vw;
  }
  .add-artworks {
    width: 90vw;
  }
  .add-container {
    width: 30vw;
    height: 30vw;
    margin-top: 0.5rem;
  }
  .add {
    width: 30vw;
    height: 30vw;
  }
  .delete-img {
    margin-left: 75vw;
  }
  .exit {
    margin-top: -85vh;
    margin-left: 75vw;
  }
  .inpts {
    width: 90vw;
    gap: 0.5rem;
  }
  .selects {
    display: flex;
    flex-direction: column;
  }
}
</style>