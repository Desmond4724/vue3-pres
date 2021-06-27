<template>
  <div class="mb-4">
    <label class="mb-1 block font-medium text-gray-600">Role</label>
    <input
      v-model="query"
      placeholder="Search role"
      class="bg-gray-100 focus:outline-none border-transparent focus:border-indigo-500 border-solid border-2 h-12 w-full rounded-xl px-2"
      type="text">
    <ul class=" bg-gray-100 rounded-xl mt-1">
      <li
        @click="onSelect(role.id)"
        class="py-1"
        :key="role.id"
        v-for="role in filteredRoles">
        <div
          :class="['p-2 cursor-pointer hover:text-white rounded hover:bg-indigo-400',
          {'bg-indigo-500 text-white': role.id === modelValue}
          ]"
        >
          {{ role.name }}
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "UserRoleSelect",
  props: {
    modelValue: {},
    roles: {
      type: Array
    }
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {
    filteredRoles() {
      return this.roles.filter(item => {
        return !this.query || item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
      })
    }
  },
  methods: {
    onSelect(id) {
      this.$emit('update:modelValue', id)
    }
  }
}
</script>