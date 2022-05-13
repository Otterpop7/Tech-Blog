async function editFormHandler(event) {
  event.preventDefault()

  const id = document.querySelector('input[name="post-id"]').value
  const title = document.querySelector('input[name="post-title"]').value

  const post_text = document.querySelector('textarea[name="post-text"]').value

  const response = await fetch(`/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.ok) {
    document.location.replace("/dashboard")
    // otherwise, display the error
  } else {
    alert(response.statusText)
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler)
