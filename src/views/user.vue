<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-4xl font-black">Users</h1>
    <button @click="$refs.userDialog.open()" class="bg-indigo-500 h-12 rounded-xl px-2 text-white">Create new user
    </button>
  </div>
  <div class="p-4 bg-white rounded-2xl">
    <h2 v-if="error" class="text-red-400">Oops! Something went wrong....</h2>
    <div v-if="loading" class="flex justify-center items-center">
      <svg
        v-if="loading"
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-bla
" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!--    // table-->
    <div v-show="!loading && !error">
      <form class="mb-3 flex">
        <input
          v-model="query"
          placeholder="search"
          type="Search"
          class="px-2 h-9 bg-gray-100 rounded-xl focus:outline-none">
        <button v-if="query" class="ml-1 bg-gray-100 px-3 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="15" height="15" viewBox="0 0 590.556 590.556"
               xml:space="preserve">
		<path d="M574.099,469.235L437.61,353.434c-3.248-2.709-7.227-4.171-11.266-4.171c-5.643,0-11.018,2.843-14.373,7.606
			c-15.533,22.029-34.578,41.087-56.611,56.635c-4.1,2.895-6.816,7.319-7.449,12.143c-0.635,4.828,0.775,9.602,3.975,13.439
			l115.873,136.61c7.852,9.422,19.252,14.859,31.23,14.859c10.768,0,21.021-4.324,28.877-12.179l48.98-48.981
			c8.346-8.348,12.656-19.241,12.137-30.68C588.46,487.269,583.175,476.8,574.099,469.235z"/>
            <path d="M218.399,433.743c57.923,0,112.385-22.559,153.348-63.522c40.965-40.965,63.523-95.423,63.523-153.349
			C435.271,97.29,337.983,0,218.399,0C98.814,0,1.53,97.29,1.53,216.872S98.817,433.743,218.399,433.743z M71.81,216.872
			c0-80.83,65.759-146.589,146.589-146.589c80.831,0,146.588,65.759,146.588,146.589c0,39.091-15.262,75.885-42.982,103.602
			c-27.721,27.718-64.515,42.984-103.606,42.984C137.569,363.461,71.81,297.701,71.81,216.872z"/>

</svg>
        </button>
      </form>
      <UserTable
        :users="users"
      />
      <ul class="flex justify-end mt-8 select-none">
        <li
          @click="changePage(item)"
          v-for="item in lastPage"
          :key="item"
          class="p-1">
          <div
            :class="['bg-gray-10 cursor-pointer hover:text-white hover:bg-indigo-600 flex rounded w-8 h-8 items-center justify-center',
              {
                'bg-indigo-600': params.page === item,
                'text-white': params.page === item,
              }
            ]">
            {{ item }}
          </div>
        </li>
      </ul>
    </div>
  </div>

  <UserCreateDialog
    @ADDED_NEW_USER="user => users.push(user)"
    ref="userDialog"
  />

</template>

<script>
import UserCreateDialog from "../components/UserCreateDialog.vue";
import UserTable from "../components/UserTable.vue";
import {http} from "../repositories/api/axios";
import useApi from "../use/useApi";
import {reactive, onMounted} from 'vue'

export default {
  setup() {
    const params = reactive({
      page: 1,
      query: null
    })
    const getUserList = async () => {
      const {data: {data, total_pages}} = await http.get('/users', {
        params: {
          ...params,
          delay: 1
        }
      })
      return {data, pages: total_pages}
    }
    const {callApi: getUsers, result: users, error, loading, lastPage} = useApi(getUserList, [])

    onMounted(getUsers)
    return {
      lastPage,
      params,
      users,
      getUsers,
      loading,
      error,
    }
  },
  data() {
    return {
      query: '',
    }
  },
  methods: {
    changePage(i) {
      if (this.params.page !== i) {
        this.params.page = i
        this.$router.push({query: {page: i}})
        this.getUsers()
      }
    },
  },
  components: {UserTable, UserCreateDialog},
  created() {
    if (this.$route.query.page) {
      this.params.page = +this.$route.query.page
    }
  }
}
</script>