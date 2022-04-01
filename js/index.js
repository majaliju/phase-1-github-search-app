// included a defer src tag in the html script JS line

const form = document.getElementById("github-form")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  // data we want to pass to the form 
  const target = event.target[0].value
  // we fetch the API 
  fetch(`https://api.github.com/search/users?q=${target}`)
  .then(response => response.json())
  .then (response => {
    const userList = document.querySelector("#user-list")
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    userList.innerHTML = ""
    response.items.map(item => {
      const li = document.createElement("li")
      const h2 = document.createElement("h2")
      h2.textContent = item.login
      
      h2.addEventListener("click", e => showUserRepos(item.login, e))
      const img = document.createElement('img')
      img.src = item.avatar_url

      li.append(h2, img)
      userList.append(li)

    })
  })

  form.reset()
 })

  function showUserRepos(username, e) {
    const userList = document.querySelector("#user-list")
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(response => response.map(repo => {
      const li = document.createElement("li")
      const h1 = document.createElement("h1")
      h1.textContent = repo.name
      li.append(h1)
      reposList.append(li)
    }))
  }