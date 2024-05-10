const formUsuario = document.getElementById("form-usuario")
const usuarioInput = document.getElementById("usuario-input")
const spanErroUsuario = formUsuario.querySelector(".mensagem-de-erro")

const formSenha = document.getElementById("form-senha")
const antigaSenhaInput = document.getElementById("antiga-senha")
const novaSenhaInput = document.getElementById("nova-senha")
const confirmaNovaSenhaInput = document.getElementById("confirma-nova-senha")
const spanErroSenha = formSenha.querySelector(".mensagem-de-erro")

// * apaga mensagem de erro ao clicar novamente no input
const todosInputs = document.querySelectorAll("input")
for (const input of todosInputs) {
  input.addEventListener("focus", () => {
    input.parentNode.querySelector(".mensagem-de-erro").innerText = ""
  })
}

formUsuario.addEventListener("submit", (e) => {
  e.preventDefault()

  const novoUsuario = usuarioInput.value.trim("")

  if (!novoUsuario) {
    spanErroUsuario.innerText = "Insira um novo nome de usuário válido!"
    e.target.reset()
    return
  }

  const dadosAntigos = JSON.parse(localStorage.getItem("dados"))
  const dadosNovos = { ...dadosAntigos, usuario: novoUsuario }
  localStorage.setItem("dados", JSON.stringify(dadosNovos))
})

formSenha.addEventListener("submit", (e) => {
  e.preventDefault()

  const dadosAntigos = JSON.parse(localStorage.getItem("dados"))

  const antigaSenha = antigaSenhaInput.value.trim()
  const novaSenha = novaSenhaInput.value.trim()
  const confirmaNovaSenha = confirmaNovaSenhaInput.value.trim()

  if (antigaSenha !== dadosAntigos.senha) {
    spanErroSenha.innerText = "A senha antiga está incorreta."
    return
  }

  if (novaSenha !== confirmaNovaSenha) {
    spanErroSenha.innerText = "As novas senhas informadas não são iguais!"
    return
  }

  const dadosNovos = { ...dadosAntigos, senha: novaSenha }
  localStorage.setItem("dados", JSON.stringify(dadosNovos))
})
