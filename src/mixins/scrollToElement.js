export const scrollToElement = {
    methods: {
        scrollToElement(clss) {
            const el = this.$el.getElementsByClassName(clss)[0];

            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }
}