import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/config";

export const fetchSubjects = async () => {
  const q = query(collection(db, "subjects"));
  const querySnapshot = await getDocs(q);
  const subjects: {
    name: string;
    teacher: {
      name: string;
      email: string;
      role: string;
    };
  }[] = [] as any;

  for (const doc of querySnapshot.docs) {
    const subjectData = doc.data();
    const teacherRef = subjectData.teacher;

    // Fetch the teacher document using the reference
    const teacherDoc = await getDoc(teacherRef);
    const teacherData = teacherDoc.data();

    // Update the teacher field in the subject data with the actual teacher data
    const subjectWithTeacher = {
      ...subjectData,
      teacher: teacherData,
    };

    // @ts-ignore
    subjects.push(subjectWithTeacher);
  }

  return subjects;
};
