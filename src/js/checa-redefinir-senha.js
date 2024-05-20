const pergunta = localStorage.getItem("pergunta-de-seguranca")
const logado = JSON.parse(sessionStorage.getItem("logado"))

if (logado) location.href = "/"
else if (!pergunta) {
  alert("Não é possível redefinir sua senha sem uma pergunta de segurança cadastrada!")
  location.href = "/login"
}
