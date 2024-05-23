import { putAdminInfo } from "../api/put-admin-info"

const form = document.getElementById("muda-senha-form")
const inputSenha = document.getElementById("senha")
const inputConfirmaSenha = document.getElementById("confirma-senha")
const spanErro = document.querySelector(".mensagem-de-erro")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const senha = inputSenha.value.trim()
  const confirmaSenha = inputConfirmaSenha.value.trim()

  if (senha === "") {
    spanErro.innerText = "Digite algo!"
    return
  }

  if (senha !== confirmaSenha) {
    spanErro.innerText = "As senhas não correspondem!"
    return
  }

  await putAdminInfo({
    senha,
  })

  sessionStorage.removeItem("pergunta-respondida")

  location.href = "/login"
})
