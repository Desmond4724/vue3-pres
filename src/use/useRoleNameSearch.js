import {computed, ref} from 'vue'

export default function useRoleSearch(roles) {
  const query = ref('')
  const filteredRoles = computed(() => {
    return roles.value.filter(item => {
      return !query.value || item.name.toLowerCase().indexOf(query.value.toLowerCase()) > -1
    })
  })

  return {
    query,
    filteredRoles
  }
}
