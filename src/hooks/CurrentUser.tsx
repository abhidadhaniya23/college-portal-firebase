import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const CurrentUser = async () => {
  try {
    return getDoc(doc(db, "users", auth.currentUser?.email!))
      .then((doc) => {
        if (doc.exists()) {
          return doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

};


export default CurrentUser;
