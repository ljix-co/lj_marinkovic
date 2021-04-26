
export const checkLanguage = {

    methods: {
        changeToLanguage() {
           
            if (this.curLanguage === "RS") {
                if (this.artworks) {
                    for (let i = 0; i < this.artworks.length; i++) {
                        this.artworks[i].title = this.artworks[i].artwork_title_rs;
                        this.artworks[i].material = this.artworks[i].artwork_material_rs;
                        this.artworks[i].technique = this.artworks[i].artwork_technique_rs;
                        this.artworks[i].artform = this.artworks[i].artwork_artform_rs;
                    }
                }
                if (this.projects) {
                 
                    for (let i = 0; i < this.projects.length; i++) {
                        this.projects[i].title = this.projects[i].proj_title_rs;
                        this.projects[i].desc = this.projects[i].proj_desc_rs;
                        if (this.projects[i].proj_desc_rs.length > 600) {
                            this.projects[i].short_desc = this.projects[i].proj_desc_rs.substr(0, 600) + '<b>...</b>';
                        }
                        else if (this.projects[i].proj_desc_rs.length <= 600) {
                            this.projects[i].short_desc = this.projects[i].proj_desc_rs
                        }
                    }
                }
                if (this.exhibitions) {
                    for (let i = 0; i < this.exhibitions.length; i++) {
                        this.exhibitions[i].title = this.exhibitions[i].exh_title_rs;
                        this.exhibitions[i].desc = this.exhibitions[i].exh_desc_rs;
                        this.exhibitions[i].rev = this.exhibitions[i].exh_rec_rs;
                        this.exhibitions[i].place = this.exhibitions[i].exh_place_rs;
                        if (this.exhibitions[i].exh_desc_rs.length > 600) {
                            this.exhibitions[i].short_desc = this.exhibitions[i].exh_desc_rs.substr(0, 600) + '<b>...</b>';
                        }
                        else if (this.exhibitions[i].exh_desc_rs.length <= 600) {
                            this.exhibitions[i].short_desc = this.exhibitions[i].exh_desc_rs
                        }
                    }
                }

            }
            if (this.curLanguage === "EN") {
                if (this.artworks) {
                    for (let i = 0; i < this.artworks.length; i++) {
                        this.artworks[i].title = this.artworks[i].artwork_title;
                        this.artworks[i].material = this.artworks[i].artwork_material;
                        this.artworks[i].technique = this.artworks[i].artwork_technique;
                        this.artworks[i].artform = this.artworks[i].artwork_artform;
                    }
                }
                if (this.projects) {
                   
                    for (let i = 0; i < this.projects.length; i++) {
                        this.projects[i].title = this.projects[i].proj_title;
                        this.projects[i].desc = this.projects[i].proj_desc;
                        if (this.projects[i].proj_desc.length > 600) {
                            this.projects[i].short_desc = this.projects[i].proj_desc.substr(0, 600) + '<b>...</b>';
                        }
                        else if (this.projects[i].proj_desc.length <= 600) {
                            this.projects[i].short_desc = this.projects[i].proj_desc
                        }
                    }
                }
                if (this.exhibitions) {

                    for (let i = 0; i < this.exhibitions.length; i++) {
                        this.exhibitions[i].title = this.exhibitions[i].exh_title;
                        this.exhibitions[i].desc = this.exhibitions[i].exh_desc;
                        this.exhibitions[i].rev = this.exhibitions[i].exh_rec;
                        this.exhibitions[i].place = this.exhibitions[i].exh_place;
                        if (this.exhibitions[i].exh_desc.length > 600) {
                            this.exhibitions[i].short_desc = this.exhibitions[i].exh_desc.substr(0, 600) + '<b>...</b>';
                        }
                        else if (this.exhibitions[i].exh_desc.length <= 600) {
                            this.exhibitions[i].short_desc = this.exhibitions[i].exh_desc
                        }
                    }
                }
            }
        }
    },
}