<template>
  <div class="flex">
    <TheSidebar/>
    <div class="container pt-5 mx-auto h-screen overflow-auto">
      <RouterView/>
    </div>
  </div>
</template>


<script>
import TheSidebar from "./components/layout/TheSidebar.vue";
import VDialog from "./components/ui/VDialog.vue";
export default {
  name: "App",
  components: {VDialog, TheSidebar},
}
</script>