<template>
  <nav class="topbar d-flex justify-space-between align-center px-1">
    <div class="d-flex align-center">
      <i class="fa-brands fa-rocketchat white--text icon-xl"></i>
      <span class="display-1 white--text pl-1">Hey!</span>
    </div>
    <AccountMenu />
  </nav>
</template>
<script>
import AccountMenu from "./AccountMenu.vue";
export default {
  components: {
    AccountMenu,
  },
};
</script>