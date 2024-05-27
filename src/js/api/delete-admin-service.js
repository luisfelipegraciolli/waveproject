import { db } from "../lib/firebase-config.js"

export function deleteAdminService(id) {
  const servicesRef = db.collection("admin").doc("info").collection("services")
  if (id) {
    servicesRef
      .doc(id)
      .delete()
      .catch((e) => console.error(e))
  } else {
    servicesRef.get().then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        await servicesRef
          .doc(doc.id)
          .delete()
          .catch((e) => console.error(e))
      })
    })
  }
}
