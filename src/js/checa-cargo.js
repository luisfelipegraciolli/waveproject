const cargoAdmin = JSON.parse(sessionStorage.getItem("admin"))

if (!cargoAdmin) location.href = "/"
