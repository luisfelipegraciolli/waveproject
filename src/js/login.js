import { getAdminInfo } from "./api/get-admin-info.js"
import { getFuncionarioInfo } from "./api/get-funcionario-info.js"
import { postAdminInfo } from "./api/post-admin-info.js"
import { postFuncionarioInfo } from "./api/post-funcionario-info.js"
import { getFormData } from "./get-form-data.js"

const formLogin = document.getElementById("form-principal")
const spanErro = document.querySelector(".mensagem-de-erro")

formLogin.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keypress", () => {
    spanErro.innerText = ""
  })
})

let dados
try {
  dados = await Promise.all([getAdminInfo(), getFuncionarioInfo()])

  if (dados.includes(undefined)) {
    dados.push(
      await postAdminInfo({
        usuario: "admin",
        senha: "admin",
        primeiro_login: true,
      }),
      await postFuncionarioInfo({
        usuario: "funcionário",
        senha: "5stododia",
      }),
    )
  }
} catch (e) {
  console.error(e)
}

formLogin.addEventListener("submit", login)

function login(e) {
  e.preventDefault()
  const { usuario_input, senha_input } = getFormData(e.currentTarget)

  let usuarioLogado
  for (const credenciais of dados) {
    if (credenciais.usuario == usuario_input && credenciais.senha == senha_input) {
      usuarioLogado = credenciais
      break
    }
  }

  if (!usuarioLogado) {
    spanErro.innerText = "Usuário ou senha incorretos."
    e.target.reset()
    e.target.querySelector("input").focus()
    return
  }

  if (usuarioLogado.primeiro_login === undefined) sessionStorage.setItem("admin", false)
  else sessionStorage.setItem("admin", true)

  if (usuarioLogado.primeiro_login) {
    location.href = "/pergunta-seguranca"
  } else {
    location.href = "/"
    sessionStorage.setItem("logado", true)
  }
}
