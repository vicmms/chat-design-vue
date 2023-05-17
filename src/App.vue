<template>
  <div id="app">
    <!-- Topbar -->
    <Topbar />
    <!-- content -->
    <Index />
  </div>
</template>

<script>
import Index from "./components/Index.vue"
import Topbar from "./components/Topbar.vue"
export default {
  name: 'App',
  components: {
    Index,
    Topbar
  }
}
</script>

<style lang="scss" src="./assets/scss/styles.scss" />
