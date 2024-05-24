import { db } from "../lib/firebase-config.js"

export async function putAdminInfo(data) {
  const infoRef = db.collection("admin").doc("info")

  await infoRef.update(data)
}
