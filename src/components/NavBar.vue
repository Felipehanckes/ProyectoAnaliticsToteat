<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
            src="../assets/logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'main-view' }"> General </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'products-view' }"> Productos </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'pay-method' }"> Medios de pago </b-navbar-item>
    </template>
    <template slot="end">
        <b-navbar-item tag="div">
            <div class="buttons">
                <a class="button is-primary">
                    <strong>Sign up</strong>
                </a>
                <a class="button is-light">
                    Log in
                </a>
            </div>
        </b-navbar-item>
    </template>
  </b-navbar>
  
</template> 

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav-item-container{
  margin-left: 300px;
  display: flex;
  flex-direction: row;
}

</style>
