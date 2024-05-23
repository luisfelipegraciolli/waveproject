import { db } from "../lib/firebase-config.js"

export async function getAdminServices() {
  const servicesRef = db.collection("admin").doc("info").collection("services")
  const querySnapshot = await servicesRef.get()
  const services = []
  querySnapshot.forEach((doc) => {
    services.push(doc.data())
  })
  return services
}
