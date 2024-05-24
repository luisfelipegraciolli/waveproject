import { getAdminInfo } from "../api/get-admin-info.js"
import { putAdminInfo } from "../api/put-admin-info.js"
import { getFormData } from "./get-form-data.js"

const form = document.getElementById("pergunta-seguranca-form")
const spanErro = document.querySelector(".mensagem-de-erro")

let primeiro_login
try {
  primeiro_login = (await getAdminInfo("primeiro_login")).primeiro_login
} catch (e) {
  console.error(e)
}

if (!primeiro_login) location.href = "/"

form.querySelector("input").addEventListener("keypress", () => {
  spanErro.innerText = ""
})

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  let { pergunta, resposta } = getFormData(form)

  const selectOptions = e.target.querySelectorAll("option")
  pergunta = selectOptions[pergunta].innerText.trim()

  resposta = resposta.toLowerCase()
  if (resposta === "") {
    spanErro.innerText = "Insira uma resposta!"
    e.target.querySelector("input").focus()
    return
  }

  await putAdminInfo({
    pergunta_de_seguranca: { pergunta, resposta },
    primeiro_login: false,
  })

  sessionStorage.setItem("logado", true)

  location.href = "/"
})
