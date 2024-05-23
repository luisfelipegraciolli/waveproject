import { getAdminInfo } from "../api/get-admin-info.js"

const form = document.getElementById("pergunta-de-seguranca-form")
const pergunta = document.getElementById("pergunta-de-seguranca")
const resposta = document.getElementById("resposta")
const spanErro = document.querySelector(".mensagem-de-erro")

const { pergunta_de_seguranca } = await getAdminInfo("pergunta_de_seguranca")

const dados = pergunta_de_seguranca

pergunta.innerText = dados.pergunta

resposta.addEventListener("focus", () => {
  spanErro.innerText = ""
})

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const inputResposta = resposta.value.trim().toLowerCase()

  if (inputResposta === "") {
    spanErro.innerText = "Insira uma resposta!"
    return
  }

  if (inputResposta !== dados.resposta) {
    spanErro.innerText = "Resposta incorreta!"
    return
  }

  sessionStorage.setItem("pergunta-respondida", true)

  location.href = "/redefinir-senha/redefine.html"
})
