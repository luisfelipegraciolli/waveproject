import { getAdminInfo } from "../api/get-admin-info.js"
import { postAdminInfo } from "../api/post-admin-info.js"

const formLogin = document.getElementById("form-principal")
const usuarioInput = document.getElementById("usuario-input")
const senhaInput = document.getElementById("senha-input")
const spanErro = document.querySelector(".mensagem-de-erro")

usuarioInput.addEventListener("focus", () => {
  spanErro.innerText = ""
})

senhaInput.addEventListener("focus", () => {
  spanErro.innerText = ""
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

  if (!validaInput(usuarioInput, usuario) | !validaInput(senhaInput, senha)) {
    spanErro.innerText = "Usuário ou senha incorretos."
    e.target.reset()
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
  const inputValue = input.value.trim()

  if (inputValue !== esperado) {
    return false
  }

  return true
}
