let inactivityTime = function () {
  let time
  window.onload = resetTimer
  document.onmousemove = resetTimer
  document.onkeypress = resetTimer

  async function logout() {
    console.log("Auto logging out")
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
      document.location.href = document.location.href
    } else {
      alert(response.statusText)
    }
  }
  function resetTimer() {
    clearTimeout(time)
    // set sessionTime to 1 minute to test and don't do anything
    const sessionTime = 10 //in minutes
    const logoutTime = sessionTime * 60 * 1000
    time = setTimeout(logout, logoutTime)
  }
}
inactivityTime()
