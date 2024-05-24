import { getAdminInfo } from "../api/get-admin-info.js"
import { getFormData } from "./get-form-data.js"

const form = document.getElementById("pergunta-de-seguranca-form")
const perguntaContainer = document.getElementById("pergunta-de-seguranca")
const spanErro = document.querySelector(".mensagem-de-erro")

const { pergunta_de_seguranca } = await getAdminInfo("pergunta_de_seguranca")
const dados = pergunta_de_seguranca

perguntaContainer.innerText = dados.pergunta

form.querySelector("input").addEventListener("keypress", () => {
  spanErro.innerText = ""
})

form.addEventListener("submit", (e) => {
  e.preventDefault()

  let { resposta } = getFormData(form)

  resposta = resposta.toLowerCase()

  if (resposta === "") {
    spanErro.innerText = "Insira uma resposta!"
    return
  }

  if (resposta !== dados.resposta) {
    spanErro.innerText = "Resposta incorreta!"
    return
  }

  sessionStorage.setItem("pergunta-respondida", true)

  location.href = "/redefinir-senha/redefine.html"
})
