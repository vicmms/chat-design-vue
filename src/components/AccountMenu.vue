<template>
  <div
    class="d-flex align-center pointer relative"
    @click="showMenu = !showMenu"
  >
    <span class="title white--text pr-1">Victor</span>
    <i class="fa-solid fa-user icon-lg white--text"></i>
    <div v-if="showMenu" class="account-menu">
      <ul>
        <li><a href="#">Ver perfil</a></li>
        <li><a href="#">Configuración</a></li>
        <li><a href="#">Cerrar sesión</a></li>
      </ul>
    </div>
  </div>
  <!--  -->
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.account-menu {
  position: absolute;
  top: 45px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 100;
  border-radius: 5px;
}

.account-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.account-menu ul li {
  margin: 0;
  padding: 5px 0;
}

.account-menu ul li a {
  display: block;
  padding: 5px 10px;
  text-decoration: none;
  color: #333;
  border-radius: 3px;
}

.account-menu ul li a:hover {
  background-color: #a7b6c3;
}
</style>