import { putAdminInfo } from "./api/put-admin-info.js"
import { getFormData } from "./get-form-data.js"

const form = document.getElementById("muda-senha-form")
const spanErro = document.querySelector(".mensagem-de-erro")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const { senha, confirma_senha } = getFormData(form)

  if (senha === "") {
    spanErro.innerText = "Digite algo!"
    return
  }

  if (senha !== confirma_senha) {
    spanErro.innerText = "As senhas não correspondem!"
    return
  }

  await putAdminInfo({
    senha,
  })

  sessionStorage.removeItem("pergunta-respondida")

  location.href = "/login"
})
