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
          :class="['p-2 cursor-pointer hover:text-white rounded hover:bg-indigo-400 relative',
          {'bg-indigo-500 text-white': role.id === modelValue}
          ]"
        >
          {{ role.name }}

          <svg class="absolute right-3 top-3.5" v-if="role.id === modelValue" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg" width="12" height="12" x="0" y="0"
               viewBox="0 0 407.51 407.51" style="enable-background:new 0 0 407.51 407.51;" xml:space="preserve">
		<path d="M397.061,161.959h-26.122c-15.452-61.734-63.654-109.936-125.388-125.388V10.449C245.551,4.678,240.873,0,235.102,0
			h-62.694c-5.771,0-10.449,4.678-10.449,10.449v26.122C100.343,52.23,52.23,100.343,36.571,161.959H10.449
			C4.678,161.959,0,166.637,0,172.408v62.694c0,5.771,4.678,10.449,10.449,10.449h26.122
			c15.862,61.5,63.887,109.526,125.388,125.388v26.122c0,5.771,4.678,10.449,10.449,10.449h62.694
			c5.771,0,10.449-4.678,10.449-10.449v-26.122c61.616-15.659,109.729-63.771,125.388-125.388h26.122
			c5.771,0,10.449-4.678,10.449-10.449v-62.694C407.51,166.637,402.832,161.959,397.061,161.959z M334.367,245.551h14.629
			c-14.089,50.158-53.287,89.356-103.445,103.445v-14.629c0-5.771-4.678-10.449-10.449-10.449h-62.694
			c-5.771,0-10.449,4.678-10.449,10.449v14.629c-49.947-14.447-88.997-53.498-103.445-103.445h14.629
			c5.771,0,10.449-4.678,10.449-10.449v-62.694c0-5.771-4.678-10.449-10.449-10.449H58.514
			c14.089-50.158,53.287-89.356,103.445-103.445v14.629c0,5.771,4.678,10.449,10.449,10.449h62.694
			c5.771,0,10.449-4.678,10.449-10.449V58.514c50.158,14.089,89.356,53.287,103.445,103.445h-14.629
			c-5.771,0-10.449,4.678-10.449,10.449v62.694C323.918,240.873,328.597,245.551,334.367,245.551z"/>
</svg>

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
        return !this.query || item.id === this.modelValue || item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
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