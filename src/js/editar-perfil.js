import { getAdminInfo } from "../api/get-admin-info.js"
import { putAdminInfo } from "../api/put-admin-info.js"

const formUsuario = document.getElementById("form-usuario")
const usuarioInput = document.getElementById("usuario-input")
const spanErroUsuario = formUsuario.querySelector(".mensagem-de-erro")

const formSenha = document.getElementById("form-senha")
const antigaSenhaInput = document.getElementById("antiga-senha")
const novaSenhaInput = document.getElementById("nova-senha")
const confirmaNovaSenhaInput = document.getElementById("confirma-nova-senha")
const spanErroSenha = formSenha.querySelector(".mensagem-de-erro")

const spanUsuario = document.getElementById("usuario")

const { usuario } = await getAdminInfo("usuario")

spanUsuario.innerText = usuario

const todosInputs = document.querySelectorAll("input")
for (const input of todosInputs) {
  input.addEventListener("focus", () => {
    input.parentNode.querySelector(".mensagem-de-erro").innerText = ""
  })
}

formUsuario.addEventListener("submit", async (e) => {
  e.preventDefault()

  const novoUsuario = usuarioInput.value.trim("")

  if (!novoUsuario) {
    spanErroUsuario.innerText = "Insira um novo nome de usuário válido!"
    e.target.reset()
    return
  }

  const opcao = confirm(`Tem certeza que deseja mudar seu usuário para "${novoUsuario}"?`)

  if (!opcao) {
    alert("Mudança de usuário cancelada.")
    e.target.reset()
    return
  }

  await putAdminInfo({
    usuario: novoUsuario,
  })

  alert("Mudança de usuário concluída com sucesso!")

  location.reload()
})

formSenha.addEventListener("submit", async (e) => {
  e.preventDefault()

  const { senha } = await getAdminInfo("senha")

  const antigaSenha = antigaSenhaInput.value.trim()
  const novaSenha = novaSenhaInput.value.trim()
  const confirmaNovaSenha = confirmaNovaSenhaInput.value.trim()

  if (antigaSenha !== senha) {
    spanErroSenha.innerText = "A senha antiga está incorreta."
    return
  }

  if (novaSenha !== confirmaNovaSenha) {
    spanErroSenha.innerText = "As novas senhas informadas não são iguais!"
    return
  }

  const opcao = confirm(`Tem certeza que deseja mudar sua senha?`)

  if (!opcao) {
    alert("Mudança de senha cancelada.")
    e.target.reset()
    return
  }

  await putAdminInfo({
    senha: novaSenha,
  })

  alert("Mudança de senha concluída com sucesso!")
  e.target.reset()
})
