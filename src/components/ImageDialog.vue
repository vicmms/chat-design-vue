<template>
  <!-- modal -->
  <div v-if="isDialogOpen" class="modal">
    <div class="modal-content">
      <img :src="imageDialog" alt="" />
      <div @click="isDialogOpen = false">
        <i class="fa-solid fa-circle-xmark primary--text icon-xl"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dialog", "imageDialog"],
  data() {
    return {
      isDialogOpen: false,
    };
  },
  watch: {
    dialog() {
      this.isDialogOpen = !this.isDialogOpen;
    },
  },
};
</script>
<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  position: relative;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
}
.modal svg {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 35px;
  cursor: pointer;
}
</style>