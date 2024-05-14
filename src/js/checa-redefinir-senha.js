const pergunta = localStorage.getItem("pergunta-de-seguranca")
const logado = JSON.parse(sessionStorage.getItem("logado"))

if (logado) location.href = "/"
else if (!pergunta) location.href = "/login"
