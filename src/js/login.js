import { getAdminInfo } from "../api/get-admin-info.js"
import { postAdminInfo } from "../api/post-admin-info.js"
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
  dados = await getAdminInfo()

  if (dados === undefined) {
    dados = await postAdminInfo({
      usuario: "admin",
      senha: "admin",
      primeiro_login: true,
    })
  }
} catch (e) {
  console.error(e)
}

formLogin.addEventListener("submit", login)

function login(e) {
  e.preventDefault()
  const { usuario, senha, primeiro_login } = dados

  const { usuario_input, senha_input } = getFormData(e.currentTarget)

  if (!validaInput(usuario_input, usuario) | !validaInput(senha_input, senha)) {
    spanErro.innerText = "Usuário ou senha incorretos."
    e.target.reset()
    e.target.querySelector("input").focus()
    return
  }

  if (primeiro_login) {
    location.href = "/pergunta-seguranca"
  } else {
    location.href = "/"
    sessionStorage.setItem("logado", true)
  }
}

function validaInput(input, esperado) {
  if (input !== esperado) {
    return false
  }

  return true
}
