import { getAdminInfo } from "./api/get-admin-info.js"
import { putAdminInfo } from "./api/put-admin-info.js"
import { getFormData } from "./get-form-data.js"

const spanUsuario = document.getElementById("usuario")

const formUsuario = document.getElementById("form-usuario")
const spanErroUsuario = formUsuario.querySelector(".mensagem-de-erro")

const formSenha = document.getElementById("form-senha")
const spanErroSenha = formSenha.querySelector(".mensagem-de-erro")

const { usuario } = await getAdminInfo("usuario")

spanUsuario.innerText = usuario

const todosInputs = document.querySelectorAll("input")
for (const input of todosInputs) {
  input.addEventListener("keypress", () => {
    input.parentNode.querySelector(".mensagem-de-erro").innerText = ""
  })
}

formUsuario.addEventListener("submit", async (e) => {
  e.preventDefault()

  const { novo_usuario } = getFormData(e.target)

  if (!novo_usuario) {
    spanErroUsuario.innerText = "Insira um novo nome de usuário válido!"
    e.target.reset()
    return
  }

  const opcao = confirm(
    `Tem certeza que deseja mudar seu usuário para "${novo_usuario}"?`,
  )

  if (!opcao) {
    alert("Mudança de usuário cancelada.")
    e.target.reset()
    return
  }

  await putAdminInfo({
    usuario: novo_usuario,
  })

  alert("Mudança de usuário concluída com sucesso!")

  location.reload()
})

formSenha.addEventListener("submit", async (e) => {
  e.preventDefault()

  const { senha } = await getAdminInfo("senha")
  const { antiga_senha, nova_senha, confirma_nova_senha } = getFormData(e.target)

  if (antiga_senha !== senha) {
    spanErroSenha.innerText = "A senha antiga está incorreta."
    return
  }

  if (nova_senha !== confirma_nova_senha) {
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
    senha: nova_senha,
  })

  alert("Mudança de senha concluída com sucesso!")
  e.target.reset()
})
