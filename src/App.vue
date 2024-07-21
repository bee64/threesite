<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <!-- <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Cute</RouterLink>
          <RouterLink to="/edgy">Edgy</RouterLink>
        </nav>
      </div>
    </header> -->
    <RouterView />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
