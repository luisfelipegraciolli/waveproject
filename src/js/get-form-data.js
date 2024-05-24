export function getFormData(form) {
  const inputNodeList = form.querySelectorAll("input, select")
  return Array.from(inputNodeList).reduce((acc, input) => {
    acc[input.name] = input.value.trim()
    return acc
  }, {})
}
