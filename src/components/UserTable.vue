<template>
  <table class="w-full">
    <thead>
    <tr>
      <th class="text-left">Name</th>
      <th class="text-left">Email</th>
      <th class="text-left">Avatar</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in users"
      :key="item.id"
      class="hover:bg-gray-10 rounded-xl transition">
      <td class="p-2">{{ item.first_name }} {{ item.last_name }}</td>
      <td class="p-2">{{ item.email }}</td>
      <td class="p-2">
        <div class="rounded-full overflow-hidden bg-gray-10 w-12 h-12">
          <img :src="item.avatar" alt="">
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  props: {
    users: {
      type: Array
    }
  }
}
</script>