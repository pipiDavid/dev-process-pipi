const searchUsers = document.getElementById('searchUsers')
const users = document.getElementById('users')
let allUser = []


async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    allUser = await response.json()
    
  } catch(error) {
    users.innerHTML = '<p>Error al cargar usuarios</p>'
  }
}

function renderUsers(userToRender) {
    users.innerHTML = ''
    userToRender.forEach((user) => {
        const p = document.createElement('p')
        p.textContent = `${user.name}`
        users.appendChild(p)
    })
}

searchUsers.addEventListener('input', () => {
    const searchTerm = searchUsers.value.toLowerCase()

    if(searchTerm === '') {
        users.innerHTML = ''
        return
    }
    const filteredUsers = allUser.filter((user) => 
    user.name.toLowerCase().includes(searchTerm)
    )
    renderUsers(filteredUsers)
})


getUsers()
