import { db } from "../lib/firebase-config.js"

export async function getAdminServices() {
  const servicesRef = db.collection("admin").doc("info").collection("services")
  const querySnapshot = await servicesRef.get()
  const services = []
  querySnapshot.forEach((doc) => {
    const { funcionario, cliente, servico, categoria, data_hora } = doc.data()
    services.push({ funcionario, cliente, servico, categoria, data_hora })
  })
  return services
}
