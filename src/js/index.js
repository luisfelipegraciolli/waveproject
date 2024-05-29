import { getAdminServices } from "./api/get-admin-services.js"
import { postAdminServices } from "./api/post-admin-services.js"
import { getFormData } from "./get-form-data.js"
import { deleteAdminService } from "./api/delete-admin-service.js"
import { putAdminServices } from "./api/put-admin-services.js"

const formNovoServico = document.getElementById("novo-servico-form")
const tituloForm = document.getElementById("titulo-form")
const botaoForm = formNovoServico.querySelector(".botao")
const formFiltro = document.getElementById("form-filtro")
const botaoExcluir = document.getElementById("delete")
const tbody = document.querySelector("#tabela-principal tbody")
const semServicos = document.getElementById("sem-servicos")

let servicos = []
try {
  servicos = (await getAdminServices()) ?? []
} catch (error) {
  console.error(error)
}

exibirServicos(servicos, tbody, semServicos)

const dataHoraInput = formNovoServico.data_hora

dataHoraInput.addEventListener("change", () => {
  if (!dataHoraInput.reportValidity()) dataHoraInput.setCustomValidity("")
})

formNovoServico.addEventListener("submit", (e) => {
  e.preventDefault()
  if (dataHoraInput.value.split("-")[0].length > 4) {
    dataHoraInput.setCustomValidity("O ano deve ter somente 4 dígitos!")
    dataHoraInput.reportValidity()
    return
  }
  const serviceId = e.currentTarget.dataset.serviceId
  if (!serviceId) {
    adicionarServico(e)
  } else {
    editarServico(e, serviceId)
  }
  scroll(0, 0)
})

formFiltro.addEventListener("submit", filtrarServicos)
botaoExcluir.addEventListener("click", excluirServicos)

//! CRUD dos servicos
async function adicionarServico(e) {
  const inputs = getFormData(formNovoServico)

  tbody.parentElement.style.display = "table"
  semServicos.style.display = "none"

  formFiltro.filtro.value = ""

  try {
    const id = await postAdminServices(inputs)
    servicos = [...servicos, { ...inputs, id }]
    exibirServicos(servicos, tbody, semServicos)
  } catch (error) {
    alert("Ocorreu algum erro. Tente novamente.")
    console.error(error)
  }

  e.target.reset()
}

function exibirServicos(servicos, tbody, semServicos) {
  const antigosPopovers = document.querySelectorAll("[popover]")
  if (antigosPopovers.length) {
    antigosPopovers.forEach((popover) => popover.remove())
  }

  if (!servicos.length) {
    tbody.parentElement.style.display = "none"
    semServicos.style.display = "block"
    semServicos.innerText = "Ainda não há serviços cadastrados!"
    return
  } else {
    tbody.parentElement.style.display = "table"
    semServicos.style.display = "none"
  }

  tbody.innerHTML = ""

  const servicosPorData = servicos.sort((a, b) => {
    const data1 = new Date(a.data_hora)
    const data2 = new Date(b.data_hora)
    return data2 - data1
  })

  for (let info of servicosPorData) {
    const tr = criarLinhaDaTabela(info)
    tbody.appendChild(tr)
  }
}

function filtrarServicos(e) {
  e.preventDefault()
  const form = e.target
  const search = form.filtro.value.trim().toLowerCase()
  if (search === "") {
    exibirServicos(servicos, tbody, semServicos)
    return
  }

  if (servicos.length) {
    const servicosFiltrados = servicos.reduce((acc, servico) => {
      const linha = Object.entries(servico)
        .filter(([key, _]) => key !== "id")
        .map(([key, column]) => {
          if (key == "data_hora") {
            return new Date(column).toLocaleString().slice(0, -3)
          }
          return column.toLowerCase()
        })
      console.log(linha)
      const match = linha
        .map((column) => column.includes(search))
        .some((value) => value === true)
      if (match) {
        acc.push(servico)
      }
      return acc
    }, [])
    exibirServicos(servicosFiltrados, tbody, semServicos)
    if (!servicosFiltrados.length)
      semServicos.innerText = "Não existem serviços cadastrados com essa informação!"
  }
}

async function editarServico(e, id) {
  const inputs = getFormData(formNovoServico)

  formFiltro.filtro.value = ""

  try {
    const novosDados = await putAdminServices(inputs, id)
    servicos = [...servicos.filter((servico) => servico.id !== id), { ...novosDados, id }]
    exibirServicos(servicos, tbody, semServicos)
  } catch (error) {
    alert("Ocorreu algum erro. Tente novamente.")
    console.error(e)
  }

  mudaFormulario()
}

function excluirServicos() {
  if (confirm("Deseja excluir TODOS os serviços registrados?")) {
    deleteAdminService()
    servicos = []
    exibirServicos(servicos, tbody, semServicos)
  }
}

function excluirUnicoServico(id) {
  const opt = confirm("Deseja deletar o serviço?")
  if (opt) {
    deleteAdminService(id)
    servicos = servicos.filter((servico) => servico.id !== id)
    exibirServicos(servicos, tbody, semServicos)
  } else {
    alert("O serviço não foi deletado.")
  }
}

//! Auxiliares para a tabela
function criarLinhaDaTabela(info) {
  const tr = document.createElement("tr")
  tr.className = "linha"

  tr.popovertarget = info.id
  const popover = criarPopover({
    id: info.id,
  })
  document.body.appendChild(popover)
  tr.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    e.stopPropagation()
  })

  tr.addEventListener("auxclick", (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { pageX, pageY } = e
    mostrarPopover({ pageX, pageY, popover })
  })

  tr.addEventListener("dblclick", (e) => {
    const { pageX, pageY } = e
    mostrarPopover({ pageX, pageY, popover })
  })

  const entries = Object.entries(info).filter((entry) => entry[0] != "id")
  for (let [key, value] of entries) {
    const td = document.createElement("td")
    if (key == "data_hora") {
      const dataObject = new Date(value)
      td.innerText = dataObject.toLocaleString().slice(0, -3)
    } else {
      td.innerText = value
    }
    tr.appendChild(td)
  }
  return tr
}

function criarPopover({ id }) {
  const popover = document.createElement("div")

  popover.classList.add("popover")

  popover.popover = "auto"
  popover.id = id

  const editar = document.createElement("div")
  editar.innerText = "Editar serviço"
  editar.classList.add("popover-option")
  editar.addEventListener("click", async () => {
    mudaFormulario(true, id)
  })
  const excluir = document.createElement("div")
  excluir.innerText = "Excluir serviço"
  excluir.classList.add("popover-option")
  excluir.onclick = () => excluirUnicoServico(id)

  popover.onclick = popover.hidePopover

  popover.appendChild(editar)
  popover.appendChild(excluir)

  return popover
}

function mostrarPopover({ pageX, pageY, popover }) {
  const left = pageX
  const top = pageY
  popover.style.left = left + "px"
  popover.style.top = top + "px"
  popover.showPopover()
}

//! Auxiliares para o formulario
async function mudaFormulario(editar, id) {
  if (editar) {
    const data = await getAdminServices(id)
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "id") formNovoServico[key].value = value
    })
    formNovoServico.dataset.serviceId = id
    tituloForm.innerText = "Editar serviço (Esc para cancelar)"
    const interrompeEdicao = (e) => {
      if (e.key == "Escape") {
        mudaFormulario()
        document.removeEventListener("keydown", interrompeEdicao)
        alert("Edição interrompida.")
      }
    }
    document.addEventListener("keydown", interrompeEdicao)

    botaoForm.innerText = "Editar"
    formNovoServico.scrollIntoView()
    formNovoServico.funcionario.focus()
  } else {
    scroll(0, 0)

    tituloForm.innerText = "Adicionar Serviços"
    botaoForm.innerText = "Adicionar"

    delete formNovoServico.dataset.serviceId
    formNovoServico.reset()
  }
}
