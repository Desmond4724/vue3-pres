<template>
  <table class="w-full">
    <thead>
    <tr>
      <th class="text-left">Id</th>
      <th class="text-left">Name</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in roles"
      :key="item.id"
      class="hover:bg-gray-10 rounded-xl transition">
      <td class="p-2">{{ item.id }}</td>
      <td class="p-2">{{ item.name }}</td>
    </tr>
    </tbody>
  </table>
</template>


<script>
export default {
  props: {
    roles: {
      type: Array
    }
  }
}
</script>
