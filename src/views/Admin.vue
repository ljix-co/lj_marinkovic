<template>
  <div class="admin">
    <div
      class="admin-list-options"
      v-if="
        edit === false &&
        addNew === false &&
        edit_artworks === false &&
        projects.length === 0 &&
        exh.length === 0 &&
        show_orderlist === false
      "
      :class="{ fade: warning || add_artwork }"
    >
      <div class="author-info">
        <div class="title"><h1>AUTHOR'S INFO</h1></div>
        <edit-author
          v-if="aut_info.length > 0"
          :aut_info="aut_info"
          @confirm-new-img="confrmNewAutImg"
          @submit-bio="submitBioChanges"
          @confirm-new-pass="confirmNewPass"
        ></edit-author>
      </div>
      <div class="projects">
        <div class="title"><h1>WEB PROJECTS</h1></div>

        <div class="list-projects">
          <div class="add-container">
            <div class="add" @click="addProject()">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div class="edit-container" @click="getProjects()">
            <div class="edit-artwork">
              <i class="far fa-edit"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="exhbs">
        <div class="title"><h1>EXHIBITIONS</h1></div>

        <div class="list-exh">
          <div class="add-container" @click="addNewExh()">
            <div class="add">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div class="edit-container" @click="getExh()">
            <div class="edit-artwork">
              <i class="far fa-edit"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="artworks">
        <div class="title"><h1>ARTWORKS(SHOP)</h1></div>
        <div class="artworks-mng">
          <div class="add-artwork-container" @click="addArtwork()">
            <div class="add">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div class="edit-container" @click="editArtworks()">
            <div class="edit-artwork">
              <i class="far fa-edit"></i>
            </div>
          </div>
          <div class="edit-orders">
            <button class="edit-orders-btn" @click="editOrders">
              ORDER LIST
            </button>
          </div>
        </div>
      </div>
    </div>
    <edit-list-proj-exh
      v-if="projects.length > 0"
      :projects="projects"
      :edit="edit"
      @close-edit-list="closeEditList"
      @delete-proj="deleteProj"
      @edit-proj="editProj"
    ></edit-list-proj-exh>
    <edit-list-proj-exh
      v-if="exh.length > 0"
      :exh="exh"
      :edit="edit"
      @close-edit-list="closeEditList"
      @delete-exh="deleteExh"
      @edit-exh="editExh"
    ></edit-list-proj-exh>
    <Edit
      :class="{ fade: warning }"
      v-if="edit"
      :key="'edit' + componentKey"
      :editObject="editObject"
      :images="images"
      @delete-img="deleteImg"
      @submit-edit="submitEdit"
      @add-new-img="addNewImg"
      @go-back="goBack"
    ></Edit>
    <div class="warning-div" v-if="warning">
      <Warning
        class="warning"
        :message="message"
        :images="images"
        :id="id"
        :confirmEditFunction="confirmEditFunction"
        :editObject="editObject"
        :array="array"
        :artworks="artworks"
        :projects="projects"
        :exh="exh"
        :confirm_modal="confirm_modal"
        :sendEmail="sendEmail"
        @confirm="confirm"
        @deny="deny"
      ></Warning>
    </div>
    <AddNew
      v-if="addNew"
      :key="'adn' + componentKey"
      :type="type"
      :newId="newId"
      :images="images"
      @add-new="addNewProjExh"
      @add-new-img="addNewImg"
      @delete-new-img="deleteNewImg"
      @go-back="goBack"
    ></AddNew>
    <AddArtwork
      class="add-artwork"
      v-if="add_artwork"
      @add-artwork="addNewArtwork"
      @exit-add-artwork="exitAddArtwork"
      @go-back="goBack"
    ></AddArtwork>
    <EditArtworks
      v-if="edit_artworks"
      :key="'edart' + componentKey"
      :artworks="artworks"
      @delete-artwork="deleteArtwork"
      @update-artwork="updateArtwork"
      @go-back="goBack"
    ></EditArtworks>
    <confirmation
      v-if="confirm_modal"
      :message="confirm_mssg"
      @confirm="confirmConfirmation"
    ></confirmation>
    <edit-orders
      v-if="show_orderlist"
      :order_list="order_list"
      @cancel-order="orderCancel"
      @received-order="orderReceived"
      @sent-order="orderSent"
      @exit="goBack"
    ></edit-orders>
  </div>
</template>
<script>
import Edit from "../components/Edit.vue";
import Warning from "../components/Warning";
import AddNew from "../components/AddNew.vue";
import AddArtwork from "../components/AddArtwork.vue";
import EditArtworks from "../components/EditArtworks.vue";
import { mapState, mapActions } from "vuex";
import axios from "axios";
import EditAuthor from "../components/EditAuthor.vue";
import EditListProjExh from "../components/EditListProjExh.vue";
import Confirmation from "../components/Confirmation.vue";
import EditOrders from "../components/EditOrders.vue";
export default {
  components: {
    Edit,
    Warning,
    AddNew,
    AddArtwork,
    EditArtworks,
    EditAuthor,
    EditListProjExh,
    Confirmation,
    EditOrders,
  },
  data() {
    return {
      add_artwork: false,
      artwork_id: null,
      artworks: [],
      array: [],
      aut_info: [],
      // txt: "",
      // editor: false,
      edit: false,
      edit_artworks: false,
      // editImg: false,
      editObject: {},
      newEditedObject: {},
      // newImg: "",
      newGalleryImg: {},
      id: null,
      // url: "",
      projects: [],
      exh: [],
      images: [],
      message: "",
      warning: false,
      confirmEditFunction: null,
      type: "",
      addNew: false,
      newId: null,
      newArtworkId: null,
      componentKey: 0,
      // confirm_modal: false,
      order_list: [],
      show_orderlist: false,
    };
  },
  methods: {
    ...mapActions(["changeLoader", "changeConfirm", "changeConfirmMssg"]),
    addArtwork() {
      this.add_artwork = true;
    },
    addNewArtwork(newArtwork) {
      console.log(newArtwork.dtl_images);
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      formData.append("artwork_title", newArtwork.title);
      formData.append("artwork_title_rs", newArtwork.title_rs);
      formData.append("artwork_material", newArtwork.material);
      formData.append("artwork_material_rs", newArtwork.material_rs);
      formData.append("artwork_technique", newArtwork.technique);
      formData.append("artwork_technique_rs", newArtwork.technique_rs);
      formData.append("artwork_artform", newArtwork.artform);
      formData.append("artwork_artform_rs", newArtwork.artform_rs);
      if (newArtwork.price != null) {
        formData.append("artwork_price", newArtwork.price);
      }
      if (newArtwork.year != null) {
        formData.append("artwork_year", newArtwork.year);
      }
      formData.append("artwork_sold", newArtwork.sold);
      formData.append("artwork_forsale", newArtwork.forSale);
      formData.append("artwork_coverphoto", newArtwork.artworkImage);
      axios.post(this.baseUrl + "artworks", formData).then((res) => {
        console.log(res);
        this.newArtworkId = res.data.artwork_id;

        for (let i = 0; i < newArtwork.dtl_images.length; i++) {
          let imgFormData = new FormData();
          imgFormData.append("sid", localStorage.getItem("sid"));
          imgFormData.append("artwork_id", this.newArtworkId);
          imgFormData.append("img_image", newArtwork.dtl_images[i].dtl_image);

          axios.post(this.baseUrl + "images", imgFormData).then((res) => {
            console.log(res);
            this.changeConfirm(true);
            this.changeConfirmMssg("New artworks successfully added.");
            // this.message = "New artworks successfully added.";
          });
        }
      });
    },
    addNewExh() {
      this.addNew = true;
      this.type = "newExh";
    },
    addNewProjExh(newObject) {
      if (this.type === "newProject") {
        let formData = new FormData();
        formData.append("sid", localStorage.getItem("sid"));
        formData.append("proj_title", newObject.title);
        formData.append("proj_title_rs", newObject.title_rs);
        formData.append("proj_desc", newObject.desc);
        formData.append("proj_desc_rs", newObject.desc_rs);
        formData.append("proj_link", newObject.link_project);
        formData.append("proj_year", newObject.yearFinish);

        formData.append("proj_coverphoto", newObject.cover);
        axios.post(this.baseUrl + "projects", formData).then((res) => {
          console.log(res);
          this.newId = res.data.proj_id;
          this.changeConfirm(true);
          this.changeConfirmMssg("New project successfully added.");
          // this.message = "New project successfully added.";
        });
      }
      if (this.type === "newExh") {
        let formData = new FormData();
        formData.append("sid", localStorage.getItem("sid"));
        formData.append("exh_title", newObject.title);
        formData.append("exh_title_rs", newObject.title_rs);
        formData.append("exh_desc", newObject.desc);
        formData.append("exh_desc_rs", newObject.desc_rs);
        formData.append("exh_rec", newObject.rev);
        formData.append("exh_rec_rs", newObject.rev_rs);
        formData.append("exh_date_start", newObject.yearStart);
        formData.append("exh_date_finish", newObject.yearFinish);
        formData.append("exh_place", newObject.place);
        formData.append("exh_place_rs", newObject.place_rs);
        formData.append("exh_type", newObject.exhType);
        formData.append("exh_coverphoto", newObject.cover);
        axios.post(this.baseUrl + "exhibitions", formData).then((res) => {
          console.log(res);
          this.newId = res.data.exh_id;
          this.changeConfirm(true);
          this.changeConfirmMssg("New exhibition successfully added.");
          // this.message = "New exhibition successfully added.";
        });
      }
    },
    addNewImg(newImage) {
      let formData = new FormData();
      this.newGalleryImg = {};
      formData.append("sid", localStorage.getItem("sid"));
      formData.append("img_image", newImage);

      if (this.editObject.type === "project") {
        formData.append("proj_id", this.editObject.id);

        axios.post(this.baseUrl + "project_images", formData).then((res) => {
          console.log(res);
          this.newGalleryImg.img_path =
            this.baseUrl + "images/" + res.data.img_id + "/image";
          this.newGalleryImg.id = res.data.img_id;
          this.images.push(this.newGalleryImg);
          console.log(this.newGalleryImg);
        });
      }
      if (this.editObject.type === "exh") {
        formData.append("exh_id", this.editObject.id);

        axios.post(this.baseUrl + "exh_images", formData).then((res) => {
          console.log(res);
          this.newGalleryImg.img_path =
            this.baseUrl + "images/" + res.data.img_id + "/image";
          this.newGalleryImg.id = res.data.img_id;
          this.images.push(this.newGalleryImg);
          console.log(this.newGalleryImg);
        });
      }
      if (this.type === "newProject") {
        formData.append("proj_id", this.newId);
        axios.post(this.baseUrl + "project_images", formData).then((res) => {
          console.log(res);
          this.newGalleryImg.img_path =
            this.baseUrl + "images/" + res.data.img_id + "/image";
          this.newGalleryImg.img_id = res.data.img_id;
          this.images.push(this.newGalleryImg);
        });
      }
      if (this.type === "newExh") {
        formData.append("exh_id", this.newId);
        axios.post(this.baseUrl + "exh_images", formData).then((res) => {
          console.log(res);
          this.newGalleryImg.img_path =
            this.baseUrl + "images/" + res.data.img_id + "/image";
          this.newGalleryImg.img_id = res.data.img_id;
          this.images.push(this.newGalleryImg);
          console.log(this.newGalleryImg);
        });
      }
    },
    addProject() {
      this.addNew = true;
      this.type = "newProject";
    },
    logout() {
      localStorage.removeItem("sid");
      this.$router.push({ name: "Login" });
    },
    closeEditList() {
      this.projects = [];
      this.exh = [];
    },
    confirm() {
      this.warning = false;
    },
    confirmConfirmation() {
      this.changeConfirm(false);
      if (this.edit_artworks === true) {
        this.getArtworks();
      }

      if (this.editObject.type === "project") {
        this.getProjects();
      }

      if (this.editObject.type === "exh") {
        this.getExh();
      }
      if (this.editObject.type === "orders") {
        this.editOrders();
      }
    },
    confrmNewAutImg(newImg) {
      if (newImg != "") {
        let formData = new FormData();
        formData.append("sid", localStorage.getItem("sid"));
        formData.append("aut_id", this.aut_info[0].aut_id);
        formData.append("aut_profimg", newImg);
        axios.patch(this.baseUrl + "author_info", formData).then((res) => {
          console.log(res);
          this.changeConfirm(true);
          this.changeConfirmMssg("Image successfully changed.");
          // this.message = "Image successfully changed.";
        });
      }
    },
    confirmNewPass(chngd_pass) {
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      formData.append("aut_id", this.aut_info[0].aut_id);
      formData.append("old_pass", chngd_pass.old_pass);
      formData.append("new_pass", chngd_pass.new_pass);
      axios.patch(this.baseUrl + "author_info", formData).then((res) => {
        console.log(res);
        this.changeConfirm(true);
        this.changeConfirmMssg("Password successfully changed.");
      });
    },
    deleteArtwork(art) {
      this.message = `Are you sure you want to remove '${art.artwork_title}' from artworks?`;
      this.warning = true;
      // this.array = this.artworks;
      this.confirmEditFunction = function () {
        let formData = new FormData();
        formData.append("sid", localStorage.getItem("sid"));
        formData.append("artwork_id", art.artwork_id);
        axios
          .delete(this.baseUrl + "artworks", {
            params: {
              sid: localStorage.getItem("sid"),
              artwork_id: art.artwork_id,
            },
          })
          .then((res) => {
            console.log(res);
            for (let i = 0; i < this.artworks.length; i++) {
              if (this.artworks[i].artwork_id == art.artwork_id) {
                this.artworks.splice(i, 1);
                this.warning = false;
              }
            }
          });
      };
    },
    deleteExh(exh) {
      let exh_id = exh.exh_id;
      this.message = `Are you sure you want to delete '${exh.exh_title}' exhibition?`;
      this.warning = true;
      this.confirmEditFunction = function () {
        axios
          .delete(this.baseUrl + "exhibitions", {
            params: { exh_id: exh_id, sid: localStorage.getItem("sid") },
          })
          .then((res) => {
            console.log(res);
            for (let i = 0; i < this.exh.length; i++) {
              if (this.exh[i] === exh) {
                this.exh.splice(i, 1);
                this.warning = false;
              }
            }
          });
      };
    },
    deleteImg(img) {
      this.id = img.img_id;
      this.warning = true;
      this.message = "Are you sure you want to delete this image?";
      this.confirmEditFunction = function () {
        axios
          .delete(this.baseUrl + "images", {
            params: {
              img_id: this.id,
              sid: localStorage.getItem("sid"),
            },
          })
          .then((res) => {
            console.log(res);
            for (let i = 0; i < this.images.length; i++) {
              if (this.id === this.images[i].img_id) {
                this.images.splice(i, 1);
              }
            }
          });
      };
    },
    deleteNewImg(img) {
      axios
        .delete(this.baseUrl + "images", {
          params: { sid: localStorage.getItem("sid"), img_id: img.img_id },
        })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < this.images.length; i++) {
            if (img.img_id === this.images[i].img_id) {
              console.log(this.images[i]);
              this.images.splice(i, 1);
              console.log(this.images);
              this.componentKey += 1;
            }
          }
        });
    },
    deleteProj(project) {
      let proj_id = project.proj_id;
      this.message = `Are you sure you want to delete '${project.proj_title}' project?`;
      this.warning = true;
      this.confirmEditFunction = function () {
        axios
          .delete(this.baseUrl + "projects", {
            params: { proj_id: proj_id, sid: localStorage.getItem("sid") },
          })
          .then((res) => {
            console.log(res);
            console.log(this.projects);
            for (let i = 0; i < this.projects.length; i++) {
              if (this.projects[i] === project) {
                this.projects.splice(i, 1);
                this.warning = false;
              }
            }
          });
      };
    },
    deny() {
      this.message = "";
      this.warning = false;
    },
    editArtworks() {
      this.getArtworks();
      this.edit_artworks = true;
    },
    editExh(exh) {
      this.editObject = {};
      this.images = [];
      this.editObject.id = exh.exh_id;
      this.editObject.title = exh.exh_title;
      this.editObject.description = exh.exh_desc;
      this.editObject.review = exh.exh_rec_rs;
      this.editObject.title_rs = exh.exh_title_rs;
      this.editObject.description_rs = exh.exh_desc_rs;
      this.editObject.review_rs = exh.exh_rec;
      this.editObject.place = exh.exh_place;
      this.editObject.place_rs = exh.exh_place_rs;
      this.editObject.coverphoto_path = exh.coverphoto_path;
      this.editObject.coverphoto = exh.exh_coverphoto;
      this.editObject.yearstart = exh.exh_date_start;
      this.editObject.yearfinish = exh.exh_date_finish;
      this.editObject.exhtype = exh.exh_type;
      this.editObject.type = "exh";

      axios
        .get(this.baseUrl + "exh_images", {
          params: { exh_id: exh.exh_id },
        })
        .then((res) => {
          this.images = res.data.data;
          this.edit = true;
        });
    },
    editOrders() {
      this.editObject.type = "orders";
      this.order_list = [];
      axios.get(this.baseUrl + "orders").then((res) => {
        console.log(res);
        this.order_list = res.data.data;
        for (let i = 0; i < this.order_list.length; i++) {
          this.order_list[i].artworks = [];
          for (let j = 0; j < res.data.artworks.length; j++) {
            let artwork = res.data.artworks[j];
            if (artwork.order_id == this.order_list[i].order_id) {
              this.order_list[i].artworks.push(artwork);
            }
          }
        }
        this.show_orderlist = true;
      });
    },
    editProj(project) {
      this.editObject = {};
      this.images = [];
      this.editObject.id = project.proj_id;
      this.editObject.title = project.proj_title;
      this.editObject.description = project.proj_desc;
      this.editObject.title_rs = project.proj_title_rs;
      this.editObject.description_rs = project.proj_desc_rs;
      this.editObject.coverphoto_path = project.coverphoto_path;
      this.editObject.yearfinish = project.proj_year;
      this.editObject.coverphoto = project.proj_coverphoto;
      this.editObject.proj_link = project.proj_link;
      this.editObject.type = "project";

      axios
        .get(this.baseUrl + "project_images", {
          params: { proj_id: project.proj_id },
        })
        .then((res) => {
          this.images = res.data.data;
          this.edit = true;
        });
    },
    exitAddArtwork() {
      this.add_artwork = false;
    },
    getArtworks() {
      axios.get(this.baseUrl + "artworks").then((res) => {
        this.artworks = res.data.data;
        this.componentKey += 1;
        // this.edit_artworks = true;
      });
    },
    getAutInfo() {
      // this.changeLoader(true);
      axios.get(this.baseUrl + "author_info").then((res) => {
        this.aut_info.push(res.data.data[0]);
        // this.changeLoader(false);
      });
    },
    getExh() {
      this.projects = [];
      this.changeLoader(true);
      axios.get(this.baseUrl + "exhibitions").then((res) => {
        this.exh = res.data.data;
        this.changeLoader(false);
      });
    },

    getProjects() {
      this.exh = [];
      // this.changeLoader(true);
      axios.get(this.baseUrl + "projects").then((res) => {
        this.projects = res.data.data;
        // this.changeLoader(false);
        console.log(res.data.data);
      });
    },
    goBack() {
      this.edit = false;
      this.addNew = false;
      this.edit_artworks = false;
      this.show_orderlist = false;
      this.editObject = {};
      this.images = [];
    },
    orderCancel(order) {
      let id = order.order_id;
      this.message = "Are you sure you want to cancel this order?";
      this.warning = true;
      this.array = this.order_list;
      this.confirmEditFunction = function () {
        axios
          .delete(this.baseUrl + "orders", {
            params: { sid: localStorage.getItem("sid"), order_id: id },
          })
          .then((res) => {
            console.log(res);
            for (let i = 0; i < order.artworks.length; i++) {
              let formData = new FormData();
              formData.append("sid", localStorage.getItem("sid"));
              formData.append("artwork_id", order.artworks[i].artwork_id);
              axios.put(this.baseUrl + "artworks", formData).then((res) => {
                console.log(res);
                this.changeConfirm(true);
                this.changeConfirmMssg("Order successfully canceled.");
              });
            }
          });
      };
    },
    orderSent(order) {
      let id = order.order_id;
      this.message = "Are you sure you want to declare this order as 'sent'?";
      this.warning = true;
      this.array = this.order_list;
      this.confirmEditFunction = function () {
        let formData = new FormData();
        formData.append("sid", localStorage.getItem("sid"));
        formData.append("order_id", id);
        formData.append("order_sent", true);
        axios.patch(this.baseUrl + "orders", formData).then((res) => {
          console.log(res);
          this.sendEmail(order);
          this.changeConfirm(true);
          this.changeConfirmMssg("Order successfully declared as 'sent'.");
        });
      };
    },
    orderReceived(order) {
      let id = order.order_id;
      this.message =
        "Are you sure you want to declare this order as 'received'?";
      this.warning = true;
      this.array = this.order_list;
      this.confirmEditFunction = function () {
        let formData = new FormData();
        formData.append("sid", localStorage.getItem("sid"));
        formData.append("order_id", id);
        formData.append("order_received", true);
        axios.patch(this.baseUrl + "orders", formData).then((res) => {
          console.log(res);
          this.sendEmail(order);
          this.changeConfirm(true);
          this.changeConfirmMssg("Order successfully declared as 'received'.");
        });
      };
    },
    updateArtwork(updatedArtwork) {
      this.message = "Are you sure you want to submit these changes?";
      this.warning = true;
      this.array = this.artworks;
      this.confirmEditFunction = function () {
        let formData = new FormData();
        formData.append("sid", localStorage.getItem("sid"));
        formData.append("artwork_id", updatedArtwork.id);
        for (let i = 0; i < this.array.length; i++) {
          if (this.array[i].artwork_id == updatedArtwork.id) {
            let artwork = this.array[i];
            if (artwork.artwork_title !== updatedArtwork.title) {
              formData.append("artwork_title", updatedArtwork.title);
            }
            if (artwork.artwork_title_rs !== updatedArtwork.title_rs) {
              formData.append("artwork_title_rs", updatedArtwork.title_rs);
            }
            if (artwork.artwork_material !== updatedArtwork.material) {
              formData.append("artwork_material", updatedArtwork.material);
            }
            if (artwork.artwork_material_rs !== updatedArtwork.material_rs) {
              formData.append(
                "artwork_material_rs",
                updatedArtwork.material_rs
              );
            }
            if (artwork.artwork_technique !== updatedArtwork.technique) {
              formData.append("artwork_technique", updatedArtwork.technique);
            }
            if (artwork.artwork_technique_rs !== updatedArtwork.technique_rs) {
              formData.append(
                "artwork_technique_rs",
                updatedArtwork.technique_rs
              );
            }
            if (artwork.artwork_artform !== updatedArtwork.artform) {
              formData.append("artwork_artform", updatedArtwork.artform);
            }
            if (artwork.artwork_artform_rs !== updatedArtwork.artform_rs) {
              formData.append("artwork_artform_rs", updatedArtwork.artform_rs);
            }
            if (artwork.artwork_price !== updatedArtwork.price) {
              formData.append("artwork_price", updatedArtwork.price);
            }
            if (artwork.artwork_year !== updatedArtwork.year) {
              formData.append("artwork_year", updatedArtwork.year);
            }
            if (artwork.artwork_dmns !== updatedArtwork.dmns) {
              formData.append("artwork_dmns", updatedArtwork.dmns);
            }
            if (artwork.artwork_sold !== updatedArtwork.sold) {
              formData.append("artwork_sold", updatedArtwork.sold);
            }
            if (artwork.artwork_forsale !== updatedArtwork.forSale) {
              formData.append("artwork_forsale", updatedArtwork.forSale);
            }
            // console.log(updatedArtwork.coverphoto)
            if (
              artwork.artwork_coverphoto !== updatedArtwork.coverphoto &&
              updatedArtwork.coverphoto !== ""
            ) {
              formData.append("artwork_coverphoto", updatedArtwork.coverphoto);
              // console.log(updatedArtwork.coverphoto)
            }
            axios.patch(this.baseUrl + "artworks", formData).then((res) => {
              console.log(res);
              this.changeConfirm(true);
              this.changeConfirmMssg("Artwork successfully updated.");

              // this.message = "Artwork successfully updated.";
            });
          }
        }
      };
    },
    sendEmail(order) {
      let email_txt = "";
      for (let i = 0; i < order.artworks.length; i++) {
        email_txt += `<li><p>${order.artworks[i].artwork_title}</p>
                        <img width="200px" src="${order.artworks[i].artwork_imgpath}"/>
                        <p>${order.artworks[i].artwork_price}€</p>
                        </li>`;
      }
      email_txt += ` <h2>Total price: ${order.order_totalprice}€</h2>`;

      let emailFormData = new FormData();
      emailFormData.append("sid", localStorage.getItem("sid"));
      emailFormData.append("email_txt", email_txt);
      emailFormData.append("order_id", order.order_id);
      axios.post(this.baseUrl + "send_email", emailFormData).then((res) => {
        console.log(res);
      });
    },
    submitBioChanges(txt) {
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      formData.append("aut_id", this.aut_info[0].aut_id);
      if (this.aut_info.aut_bio !== txt) {
        formData.append("aut_bio", txt);
        axios.patch(this.baseUrl + "author_info", formData).then((res) => {
          console.log(res);
          // this.$router.go();
          this.changeConfirm(true);
          this.changeConfirmMssg("Biography successfully updated.");
          // this.message = "Biography successfully updated.";
        });
      }
    },
    submitEdit(editedObject) {
      this.message = "Are you sure you want to submit these changes?";
      this.warning = true;
      // console.log(this.editObject.yearstart);
      // console.log(editedObject.yearStart);
      if (this.editObject.type === "project") {
        this.confirmEditFunction = function () {
          let formData = new FormData();
          formData.append("sid", localStorage.getItem("sid"));
          formData.append("proj_id", this.editObject.id);

          if (editedObject.title !== this.editObject.title) {
            formData.append("proj_title", editedObject.title);
          }
          if (editedObject.desc !== this.editObject.description) {
            formData.append("proj_desc", editedObject.desc);
          }
          if (editedObject.title_rs !== this.editObject.title_rs) {
            formData.append("proj_title_rs", editedObject.title_rs);
          }
          if (editedObject.desc_rs !== this.editObject.description_rs) {
            formData.append("proj_desc_rs", editedObject.desc_rs);
          }

          if (editedObject.yearFinish !== this.editObject.yearfinish) {
            formData.append("proj_year", editedObject.yearFinish);
          }
          if (
            editedObject.newCover !== this.editObject.coverphoto &&
            editedObject.newCover !== ""
          ) {
            formData.append("proj_coverphoto", editedObject.newCover);
          }
          if (editedObject.proj_link !== this.editObject.proj_link) {
            formData.append("proj_link", editedObject.proj_link);
          }
          axios.patch(this.baseUrl + "projects", formData).then((res) => {
            console.log(res);
            this.changeConfirm(true);
            this.changeConfirmMssg("Project successfully updated.");
            // this.message = "Project successfully updated.";
          });
        };
      }
      if (this.editObject.type === "exh") {
        this.confirmEditFunction = function () {
          let formData = new FormData();
          formData.append("sid", localStorage.getItem("sid"));
          formData.append("exh_id", this.editObject.id);

          if (editedObject.title !== this.editObject.title) {
            formData.append("exh_title", editedObject.title);
          }
          if (editedObject.desc !== this.editObject.description) {
            formData.append("exh_desc", editedObject.desc);
          }
          if (editedObject.rev !== this.editObject.review) {
            formData.append("exh_rec", editedObject.rev);
          }
          if (editedObject.place !== this.editObject.place) {
            formData.append("exh_place", editedObject.place);
          }
          if (editedObject.title_rs !== this.editObject.title_rs) {
            formData.append("exh_title_rs", editedObject.title_rs);
          }
          if (editedObject.desc_rs !== this.editObject.description_rs) {
            formData.append("exh_desc_rs", editedObject.desc_rs);
          }
          if (editedObject.rev_rs !== this.editObject.review_rs) {
            formData.append("exh_rec_rs", editedObject.rev_rs);
          }
          if (editedObject.place_rs !== this.editObject.place_rs) {
            formData.append("exh_place_rs", editedObject.place_rs);
          }
          if (editedObject.exhType !== this.editObject.exhtype) {
            formData.append("exh_type", editedObject.exhType);
          }
          if (editedObject.yearStart !== this.editObject.yearstart) {
            formData.append("exh_date_start", editedObject.yearStart);
          }
          if (editedObject.yearFinish !== this.editObject.yearfinish) {
            formData.append("exh_date_finish", editedObject.yearFinish);
          }
          if (
            editedObject.newCover !== this.editObject.coverphoto &&
            editedObject.newCover !== ""
          ) {
            formData.append("exh_coverphoto", editedObject.newCover);
          }
          axios.patch(this.baseUrl + "exhibitions", formData).then((res) => {
            console.log(res);
            this.changeConfirm(true);
            this.changeConfirmMssg("Exhibition successfully updated.");
            // this.message = "Exhibition successfully updated.";
          });
        };
      }
    },
  },
  computed: {
    ...mapState(["baseUrl", "confirm_modal", "confirm_mssg"]),
  },
  mounted() {
    this.getAutInfo();
    // this.getProjects();
    // this.getExh();
  },
};
</script>
<style scoped>
button {
  width: 10vh;
  height: 5vh;
  border-radius: 10px;
  border: none;
  background-color: #27f2cb;
  color: #545454;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 1rem;
  font-family: "Forum", cursive;
  text-align: center;
}
.add,
.edit-artwork {
  width: 20vw;
  height: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px dashed #f9fff7;
  cursor: pointer;
  font-size: 3rem;
  background-color: #7e7e7e;
}
.add-artwork {
  width: 100vw;
  /*height: 100vh;*/
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
}
.add-artwork-container,
.edit-container {
  width: 30vw;
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-container {
  width: 30vw;
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
}

.admin {
  height: fit-content;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100vw;
}
.admin-list-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.artworks {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15vh;
  width: 90vw;
  margin-left: 20vw;
}
.artworks-mng {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-left: 1.5rem;
}
.author-info {
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottom-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 5vh;
}
.bottom-title {
  width: 25vw;
}
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.edit-orders-btn {
  width: 7vw;
  height: 6vh;
}
.fade {
  opacity: 0.1;
}
.fa-plus,
.fa-edit {
  color: #27f2cb;
  font-size: 4rem;
}

.img-art {
  width: 30vw;
  height: 30vh;
  object-fit: cover;
}

.list-projects,
.list-exh {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}
.projects,
.exhbs {
  margin-top: 15vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90vw;
  margin-left: 20vw;
}

.title {
  font-family: "HortaRegular", cursive;
  position: absolute;
  transform: rotate(270deg);
  left: 0;
  width: 15vw;
  font-size: 1.5rem;
  color: #acabab;
}
.warning {
  position: fixed;
  top: 30vh;
  width: 40vw;
  height: 50vh;
  align-self: center;
  justify-self: center;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  border: 3px solid #f55977;
  z-index: 5;
}
.warning-div {
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
}
@media only screen and (max-width: 768px) {
  .add,
  .edit-artwork {
    width: 30vw;
    height: 30vw;
  }
  .add-artwork-container,
  .edit-container {
    width: 90vw;
    margin-left: 0%;
    margin-right: 0%;
  }

  .add-container {
    width: 90vw;
    margin-left: 0%;
  }
  .add-file {
    width: 30vw;
    height: 30vw;
    font-size: 2rem;
  }
  .artworks {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .artworks-mng {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .aut-info {
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;
    justify-content: center;
  }
  .bio {
    width: 90vw;
  }
  .bio-content {
    width: 80vw;
  }
  .bottom-title {
    width: 80vw;
  }
  .delete-img-div {
    margin-left: 77%;
  }
  .edit-container {
    width: 90vw;
  }
  .edit-img {
    top: 20vh;
    left: 30vw;
  }
  .img-art {
    width: 90vw;
  }
  .img-prof {
    width: 90vw;
    margin-top: 10vh;
  }
  .list-projects,
  .list-exh {
    width: 90vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }
  .project,
  .exh {
    width: 90vw;
    margin-left: 0%;
  }
  .projects,
  .exhbs {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 0;
  }
  .title {
    transform: none;
    width: 90vw;
    font-size: 1rem;
    margin-top: 10vh;
  }
}
</style>