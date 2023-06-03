import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const TeacherList = async () => {
  const q = query(collection(db, "users"), where("role", "==", "teacher"));

  const querySnapshot = await getDocs(q);
  const teachers = querySnapshot.docs.map((doc) => doc.data());
  return teachers;
};


export default TeacherList;
