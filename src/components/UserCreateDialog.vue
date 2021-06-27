<template>
  <VDialog
    v-model="dialog"
    content-class="p-4 rounded-xl bg-white"
  >
    <template #default="{close}">
      <div style="width: 750px; max-width: 100%;" class="relative">
        <button @click="close"
                class="p-2 absolute text-gray-400 hover:text-black right-0 hover:bg-gray-100 rounded-2xl">
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px"
            width="15" height="15" viewBox="0 0 41.756 41.756"
            xml:space="preserve">
	<path d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465
		c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071
		C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343
		c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"/>
</svg>
        </button>
        <div class="mb-3">
          <h1 class="text-2xl mb-1 font-medium">Create new user</h1>
          <span v-show="error" class="text-red-400">Something went wrong</span>
        </div>
        <form @submit.prevent="submit">
          <div class="mb-4">
            <label for="userName" class="mb-1 inline-block font-medium text-gray-600">First name</label>
            <input
              v-model="user.first_name"
              id="userName"
              class="bg-gray-100 focus:outline-none border-transparent focus:border-indigo-500 border-solid border-2 h-12 w-full rounded-xl px-2"
              type="text">
          </div>
          <div class="mb-4">
            <label for="lastName" class="mb-1 inline-block font-medium text-gray-600">Last name</label>
            <input
              v-model="user.last_name"
              id="lastName"
              name="last_name"
              class="bg-gray-100 focus:outline-none border-transparent focus:border-indigo-500 border-solid border-2 h-12 w-full rounded-xl px-2"
              type="text">
          </div>

<UserRoleSelect
  :roles="roles"
  v-model="user.role"
></UserRoleSelect>
          <div class="flex justify-end">
            <button class="bg-indigo-500 items-center flex px-10 rounded h-10 text-white hover:bg-opacity-90">
              <svg v-show="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </template>
  </VDialog>
</template>


<script>
import VDialog from "./ui/VDialog.vue";
import {CreateUser} from "../fakeApi";
import UserRoleSelect from "./UserRoleSelect.vue";

export default {
  name: 'UserCreateDialog',
  props: {
    roles: {
      type: Array
    }
  },
  emits: ['ADDED_NEW_USER'],
  data() {
    return {
      dialog: false,
      loading: false,
      error: false,
      user: {
        first_name: null,
        last_name: null,
        role: 1
      }
    }
  },
  components: {UserRoleSelect, VDialog},
  methods: {
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    async submit() {
      this.loading = true
      this.error = false
      try {
        const data = await CreateUser({
          body: this.user,
          delay: 1000,
        })
        this.$emit('ADDED_NEW_USER', data)
        this.close()
      } catch (e) {
        debugger
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>