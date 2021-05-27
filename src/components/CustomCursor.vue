<template>
  <div class="custom-cursor">
    <div
      class="custom-cursor__circle"
      :style="circleStyle"
      ref="customCursorCircle"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    targets: Array,
    circleColor: String,
    circleColorHover: String,
    hoverSize: Number,
  },
  data() {
    return {
      scale: 1,
      x: null,
      y: null,
      circlePosX: null,
      circlePosY: null,
      circleStyle: null,
    };
  },
  methods: {
    customCursor($e) {
      // cursor pos
      this.x = $e.clientX;
      this.y = $e.clientY;
      // cursor circle
      const circle = this.$refs.customCursorCircle;

      this.circlePosX = this.x - circle.clientWidth / 2;
      this.circlePosY = this.y - circle.clientWidth / 2;

      //change style when hovering on selected targets
      if (
        (this.targets.length > 0 &&
          this.targets.includes($e.target.tagName.toLowerCase())) ||
        this.targets.includes($e.target.className.toLowerCase())
      ) {
        this.scale = this.hoverSize;
        this.circleStyle = {
          borderColor: this.circleColorHover,
          borderStyle: "solid",
          borderWidth: "1px",
          backgroundColor: "transparent",
        };
      } else {
        this.scale = 1;
        this.circleStyle = { borderColor: this.circleColor };
      }
      //move custom cursor
      circle.style.transform = `translate(${this.circlePosX}px,${this.circlePosY}px) scale(${this.scale})`;
      //   dot.style.transform = `translate(${this.dotPosX}px,${this.dotPosY}px)`;

      document.addEventListener("mouseleave", () => {
        const circle = this.$refs.customCursorCircle;
        circle.style.visibility = "hidden";
      });
      document.addEventListener("mouseenter", () => {
        const circle = this.$refs.customCursorCircle;
        circle.style.visibility = "visible";
      });
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.customCursor);
  },
};
</script>
<style scoped>
/*
$ease: cubic-bezier(0.23, 1, 0.32, 1);*/
.custom-cursor {
  cursor: none;
  pointer-events: none;
}
.custom-cursor__circle {
  position: fixed;
  cursor: none;
  top: 0;
  left: 0;
  width: .7rem;
  height: .7rem; /*
  border: 7px solid #27f2cb;*/
  background-color: #27f2cb;
  border-radius: 50%;
  transform: translate(-100%, -100%);
  transition: transform 0.1s;
  z-index: 5; /*
  display: flex;
  align-items: center;
  justify-content: center;*/
}
.custom-cursor__dot {
  /*
//   position: fixed;*/

  cursor: none;

  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #545454;
  transform: translate(-100%, -100%); /*
  transition: transform 0.2s;*/
}
</style>