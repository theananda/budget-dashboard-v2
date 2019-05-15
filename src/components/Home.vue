<template>
  <div class="home_wrapper">
    <div class="mdl-typography--text-center">
      <h1>Budget Dashboard</h1>
      <router-link to="/regions" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" style="margin:20px;">Explore by Regions</router-link>
      <router-link to="/departments" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" style="margin:20px;">Explore by Sectors</router-link>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

