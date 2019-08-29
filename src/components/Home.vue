<template>
  <div class="home_wrapper">
  	<div class="shadow">
  		<div class="mdl-typography--text-center intro-wrapper">
  		  <h1>Myanmar Budget Dashboard</h1>
  		  <p>Myanmar Budget Explorer is designed to provide a simple tool for exploring Myanmar's published budget data in the interest of enhancing transparency and encouraging discussion and analysis of Myanmar's budget process and allocations.</p>
  		  <router-link to="/regions" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-color-text--white" style="margin:20px;">Explore by Regions</router-link>
  		  <router-link to="/2019/Union/sectors" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-color-text--white" style="margin:20px;">Explore by Sectors</router-link>  
        <div class="project-info">
          <p>This project is developed by</p>
          <p class="ananda_logo"><a href="https://theananda.org" target="_blank"><img src="../assets/images/logo.png" height="50" width="50" alt="The Ānanda">The Ānanda</a></p>
          <p>and funded by <a href="https://asiafoundation.org/where-we-work/myanmar/" target="_blank">The Asia Foundation</a></p> 
        </div>
  		</div>
  		<div class="photo-credit">
  			Photo by <a href="https://unsplash.com/@ray30?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">ray rui</a> on <a href="https://unsplash.com/photos/QzmA1qSqTwA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Unsplash</a>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

