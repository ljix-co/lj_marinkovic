<template>
  <div class="edit-artworks">
    <i class="far fa-arrow-alt-circle-left go-back" @click="goBack()"></i>
    <div class="prev-gallery" :class="{ fade: edit }" v-if="edit === false">
      <div class="prev-div" v-for="(art, index) in artworks" :key="index">
        <div class="delete-img-div">
          <i
            class="fas fa-trash-alt delete-img"
            @click="deleteArtwork(art)"
          ></i>
        </div>
        <img class="prev-img" :src="art.artwork_imgpath" alt="" />
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
    <div class="edit-container" v-if="edit">
      <div class="edit">
        <i class="far fa-times-circle exit" @click="exit()"></i>
        <h1>Artwork details</h1>
        <div class="inpts">
          <input v-model="title" type="text" placeholder="Title(EN)" />
          <input v-model="title_rs" type="text" placeholder="Title(RS)" />
          <input v-model="material" type="text" placeholder="Material(EN)" />
          <input v-model="material_rs" type="text" placeholder="Material(RS)" />
          <input v-model="technique" type="text" placeholder="Technique(EN)" />
          <input
            v-model="technique_rs"
            type="text"
            placeholder="Technique(RS)"
          />
          <input v-model="artform" type="text" placeholder="Artform(RS)" />
          <input v-model="artform_rs" type="text" placeholder="Artform(RS)" />
          <input v-model="price" type="number" placeholder="Price" />
          <input v-model="year" type="number" placeholder="Year" />
         
          <div class="selects">
            <label for="for-sale">For sale?</label>
            <select v-model="forSale" id="for-sale" @change="updateForSale">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
            <label for="for-sale" v-show="forSale === 1">Sold?</label>
            <select v-model="sold" id="for-sale" v-if="forSale === 1">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
        <div class="imgs">
          <div class="cover">
            <h2>Cover</h2>
            <label for="cover">
              <i class="far fa-edit edit-icon"></i>
            </label>
            <input type="file" id="cover" @change="getCover" hidden />
            <img
              class="cover-img"
              :src="cover.path"
              alt=""
              v-if="coverUrl === ''"
            />
            <div class="" v-if="coverUrl !== ''">
              <i class="fas fa-trash-alt" @click="deleteNewCover()"></i>
            </div>
            <img
              class="cover-img"
              :src="coverUrl"
              alt=""
              v-if="coverUrl !== ''"
            />
          </div>
          <div class="dtls" >
          <div class="dtl-images" v-for="(img, index) in dtl_images" :key="'img' + index">
          <i class="fas fa-trash-alt" @click="deleteDtlImg(img)"></i>
          <img class="cover-img" :src="img.img_image" alt="">
          </div>
          </div>
        </div>
        <button @click="submitChanges()">SUBMIT</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
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

      forSale: 1,
      sold: 0,
      title_rs: "",
      material_rs: "",
      technique_rs: "",
      artform: "",
      artform_rs: "",
      cover: new Object(),
      newCover: "",
      coverUrl: "",
      dtl_images: []
    };
  },
  methods: {
    deleteArtwork(art) {
      this.$emit("delete-artwork", art);
    },
    deleteDtlImg(img) {
      axios.delete(this.baseUrl + 'images', {params: {
        sid: localStorage.getItem('sid'),
        img_id: img.img_id
      }}).then(res => {
        console.log(res)
        for(let i = 0; i < this.dtl_images.length; i++) {
          if(img === this.dtl_images[i]) {
            this.dtl_images.splice(i ,1);
          }
        }
      })
    },
    deleteNewCover() {
      this.newCover = "";
      this.coverUrl = "";
    },
    editArtwork(art) {
      console.log(art);
      this.edit = true;
      this.id = art.artwork_id;
      this.title = art.artwork_title;
      this.title_rs = art.artwork_title_rs;
      this.material = art.artwork_material;
      this.material_rs = art.artwork_material_rs;
      this.technique = art.artwork_technique;
      this.technique_rs = art.artwork_technique_rs;
      this.artform = art.artwork_artform;
      this.artform_rs = art.artwork_artform_rs;
      this.cover.coverphoto = art.artwork_coverphoto;
      this.cover.path = art.artwork_imgpath;
      this.price = art.artwork_price;
      this.year = art.artwork_year;
     
      this.forSale = art.artwork_forsale;
      this.sold = art.artwork_sold;
      if (this.forSale === null) {
        this.forSale = 0;
      }
      if (this.sold === null) {
        this.sold = 0;
      }
      axios
        .get(this.baseUrl + "images", {
          params: { artwork_id: art.artwork_id },
        })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.dtl_images.push({
              img_id: res.data.data[i].img_id,
              img_image: res.data.data[i].img_path,
            });
          }
        });
    },
    exit() {
      this.edit = false;
      this.id = null;
      this.dtl_images = [];
    },
    getCover(e) {
      this.newCover = e.target.files[0];
      this.coverUrl = URL.createObjectURL(this.newCover);
    },
    goBack() {
      this.$emit("go-back");
    },
    submitChanges() {
      let updatedArtwork = {
        id: this.id,
        title: this.title,
        material: this.material,
        technique: this.technique,
        artform: this.artform,
        title_rs: this.title_rs,
        material_rs: this.material_rs,
        technique_rs: this.technique_rs,
        artform_rs: this.artform_rs,
        price: this.price,
        year: this.year,
        
        forSale: this.forSale,
        sold: this.sold,
      };
      this.$emit("update-artwork", updatedArtwork);
    },
    updateForSale() {
      if (this.forSale == 1) {
        this.forSale = 1;
      } else if (this.forSale == 0) {
        this.forSale = 0;
      }
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
};
</script>
<style scoped>
button {
  position: absolute;
  top: 5vh;
  left: 10vw;
}

h1 {
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: absolute;
  top: 5vh;
  font-size: 3rem;
}
.cover-img {
  width: 15vw;
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
.dtls{
display: flex;
flex-wrap: wrap;
align-items: flex-start;
justify-content: flex-start;
width: 60vw;
gap: 1rem;
}
.edit {
  top: 5vh;

  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  width: 80vw;
  height: 150vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
}

.edit-artworks {
  margin-top: 15vh;

  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  top: 5vh;
  align-items: center;
  justify-content: center;
}
.exit {
  position: absolute;
  top: 5vh;
  left: 70vw;
  font-size: 3rem;
  cursor: pointer;
}
.fade {
  opacity: 0.1;
}
.go-back {
  font-size: 2rem;
  position: fixed;
  left: 22vw;
  top: 1rem;
  cursor: pointer;
  z-index: 2;
}
.icon {
  font-size: 1.5rem;
  cursor: pointer;
}
.imgs {
  width: 80vw;
  height: 40vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 5vh;
  margin-left: 15vw;
  gap: 10vw;
}
.inpts {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 15vw;
  margin-top: 2rem;
  width: 80vw;
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
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  height: fit-content;
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
  }
  select {
    width: 30vw;
  }
  .delete-img-div {
    margin-left: 77vw;
  }
  .edit {
    width: 90vw;
    left: 1rem;
  }
  .exit {
    margin-left: 65vw;
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
  .prev-div {
    width: 90vw;
    margin: 0;
    margin-left: 1rem;
  }
  .prev-gallery {
    width: 100vw;
    columns: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .prev-img {
    width: 90vw;
  }
  .selects {
    display: flex;
    flex-direction: column;
  }
}
</style>