import { mapState } from 'vuex';
export const checkLanguage = {
    data() {
        return {
           
        }
    },
    methods: {
        changeToLanguage(object_array) {
            if (this.curLanguage === "RS") {
                for (let i = 0; i < object_array.length; i++) {
                    object_array.title = object_array[i].artwork_title_rs;
                    object_array.material = object_array[i].artwork_material_rs;
                    object_array.technique = object_array[i].artwork_tech_rs;

                }
            }
            if (this.curLanguage === "EN") {
                for (let i = 0; i < object_array.length; i++) {
                    object_array.title = object_array[i].artwork_title_en;
                    object_array.material = object_array[i].artwork_material_en;
                    object_array.technique = object_array[i].artwork_tech_en;
                }
            }
        }
    },
    computed: {
        ...mapState(['curLanguage'])
    }
}