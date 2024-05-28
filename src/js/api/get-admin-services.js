import { db } from "../lib/firebase-config.js"

export async function getAdminServices(id) {
  const servicesRef = db.collection("admin").doc("info").collection("services")
  if (!id) {
    const querySnapshot = await servicesRef.get()
    const services = []
    querySnapshot.forEach((doc) => {
      const { funcionario, cliente, servico, categoria, data_hora } = doc.data()
      services.push({ funcionario, cliente, servico, categoria, data_hora, id: doc.id })
    })
    return services
  } else {
    const docRef = servicesRef.doc(id)
    const doc = await docRef.get()
    const { funcionario, cliente, servico, categoria, data_hora } = doc.data()
    return { funcionario, cliente, servico, categoria, data_hora, id: doc.id }
  }
}
