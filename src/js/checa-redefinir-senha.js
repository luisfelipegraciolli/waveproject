import { getAdminInfo } from "../api/get-admin-info.js"

const logado = JSON.parse(sessionStorage.getItem("logado"))

const { pergunta_de_seguranca } = await getAdminInfo("pergunta_de_seguranca")

if (logado) location.href = "/"
else if (!pergunta_de_seguranca) {
  alert("Não é possível redefinir sua senha sem uma pergunta de segurança cadastrada!")
  location.href = "/login"
}
