const form = document.getElementById("novo-servico-form")
const tbody = document.querySelector("#tabela-principal tbody")
const semServicos = document.getElementById("sem-servicos")

const funcionario = form.funcionario
const cliente = form.cliente
const servico = form["servico"]
const categoria = form["categoria-servico"]
const dataHora = form["data-hora"]

let servicos = JSON.parse(localStorage.getItem("servicos")) ?? []

exibirServicos(servicos, tbody, semServicos)

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

  tbody.parentElement.style.display = "table"
  semServicos.style.display = "none"

  servicos = [...servicos, inputs]

  exibirServicos(servicos, tbody, semServicos)

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
      td.innerText = dataObject.toLocaleString().slice(0, -3)
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

  tbody.innerHTML = ""

  const servicosPorData = servicos.sort((a, b) => {
    const data1 = new Date(a["data-hora"])
    const data2 = new Date(b["data-hora"])
    return data1 - data2
  })

  for (let info of servicosPorData) {
    const tr = criarLinhaDaTabela(info)
    tbody.appendChild(tr)
  }
}
