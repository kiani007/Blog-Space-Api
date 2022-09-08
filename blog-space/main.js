const formId = document.getElementById("new-post");
const app = document.getElementById("app")
const titleRef = document.getElementById("title")
const description = document.getElementById("description")

let postsArray = []

function renderPosts() {
    let html = ""
    for (let post of postsArray) {
        html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
        `
    }
    app.innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })

formId.addEventListener("submit", function(e) {
    e.preventDefault()
    const postTitle = titleRef.value
    const postBody = description.value

    const data = {
        title: postTitle,
        body: postBody
    }
    console.log(data)

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        .then(post => {
            postsArray.unshift(post)
            renderPosts()
        })
})