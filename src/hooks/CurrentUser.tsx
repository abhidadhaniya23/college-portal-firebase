import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const CurrentUser = async () => {
  try {
    const userCollectionRef = collection(db, "users");
    const userDocRef = doc(userCollectionRef, auth.currentUser?.uid);
    const userDocSnap = await getDoc(userDocRef);

    console.log(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      // Use the userName value as needed
      console.log(userData);
      return userData;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export default CurrentUser;
