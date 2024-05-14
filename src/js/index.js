const form = document.getElementById("novo-servico-form")
const tbody = document.querySelector("#tabela-principal tbody")
const semServicos = document.getElementById("sem-servicos")

const funcionario = form.funcionario
const cliente = form.cliente
const servico = form["servico"]
const categoria = form["categoria-servico"]
const dataHora = form["data-hora"]

let servicos = JSON.parse(localStorage.getItem("servicos")) ?? []

for (let i = 0; i < 40; i++) {
  exibirServicos(servicos, tbody, semServicos)
}

form.addEventListener("submit", adicionarServico)

function adicionarServico(e) {
  e.preventDefault()

  const inputs = {
    [funcionario.name]: funcionario.value,
    [cliente.name]: cliente.value,
    [servico.name]: servico.value,
    [categoria.name]: categoria.value,
    [dataHora.name]: dataHora.value,
  }

  for (let i = 0; i < 50; i++) {
    const tr = criarLinhaDaTabela(inputs)

    tbody.appendChild(tr)
  }

  tbody.parentElement.style.display = "table"
  semServicos.style.display = "none"

  servicos = [...servicos, inputs]

  localStorage.setItem("servicos", JSON.stringify(servicos))

  e.target.reset()
}

function criarLinhaDaTabela(info) {
  const tr = document.createElement("tr")
  tr.className = "linha"
  for (let [key, value] of Object.entries(info)) {
    const td = document.createElement("td")
    if (key == "data-hora") {
      const dataObject = new Date(value)
      td.innerText = dataObject.toLocaleDateString()
      td.title = dataObject.toLocaleTimeString().slice(0, -3)
      td.className = "data"
    } else {
      td.innerText = value
    }
    tr.appendChild(td)
  }
  return tr
}

function exibirServicos(servicos, tbody, semServicos) {
  if (!servicos.length) {
    tbody.parentElement.style.display = "none"
    return
  } else {
    semServicos.style.display = "none"
  }

  for (let info of servicos) {
    const tr = criarLinhaDaTabela(info)
    tbody.appendChild(tr)
  }
}
