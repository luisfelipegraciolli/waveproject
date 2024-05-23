import { getAdminInfo } from "../api/get-admin-info.js"
import { putAdminInfo } from "../api/put-admin-info.js"

const form = document.getElementById("pergunta-seguranca-form")
const selectPergunta = document.getElementById("pergunta")
const selectOptions = document.querySelectorAll("#pergunta option")
const inputResposta = document.getElementById("resposta")
const spanErro = document.querySelector(".mensagem-de-erro")

let primeiro_login
try {
  primeiro_login = (await getAdminInfo("primeiro_login")).primeiro_login
} catch (e) {
  console.error(e)
}

if (!primeiro_login) location.href = "/"

inputResposta.addEventListener("focus", () => {
  spanErro.innerText = ""
})

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const indiceSelecionado = selectPergunta.value
  const pergunta = selectOptions[indiceSelecionado].innerText.trim()

  const resposta = inputResposta.value.trim().toLowerCase()
  if (resposta === "") {
    spanErro.innerText = "Insira uma resposta!"
    return
  }

  await putAdminInfo({
    pergunta_de_seguranca: { pergunta, resposta },
    primeiro_login: false,
  })

  sessionStorage.setItem("logado", true)

  location.href = "/"
})
