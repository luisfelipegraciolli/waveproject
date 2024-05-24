import { db } from "../lib/firebase-config.js"

export async function postAdminServices(data) {
  const servicesRef = db.collection("admin").doc("info").collection("services")
  await servicesRef.add(data)
  return data
}
