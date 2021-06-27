import {reactive, ref} from 'vue'

export default function useApi(getResult, defaultResult) {
  const loading = ref(false)
  const error = ref(false)
  let result = reactive(defaultResult)
  const lastPage = ref(0)
  const callApi = async () => {
    loading.value = true
    error.value = false
    try {
      const {data, pages} = await getResult()
      lastPage.value = pages
      debugger
      result = data
    } catch (e) {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    result,
    callApi,
    lastPage
  }
}