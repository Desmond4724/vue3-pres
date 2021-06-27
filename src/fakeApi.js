export const CreateUser = ({body, delay = 250, error = false}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) reject({message: 'Something went wrong....'})
      body = {
        ...body,
        email: body.first_name + '@gmail.com'
      }
      resolve(body)
    }, delay)
  })
}


export const GET_ROLES = ({delay = 250, error = false}) => {
  return new Promise((resolve, reject) => {
    const ROLES = [
      "ADMIN",
      "GUEST",
      "EMPLOYEE",
      "USER",
      "TESTER",
      'INSTRUCTOR'
    ]
    setTimeout(() => {
      if (error) reject({message: 'Something went wrong....'})
      const data = ROLES.map((item, index) => {
        return {
          id: index + 1,
          name: item
        }
      })
      resolve({
        data,
        total_pages: 3
      })
    }, delay)
  })
}