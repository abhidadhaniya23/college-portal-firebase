import { Button, Typography } from "@material-tailwind/react";


import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import StudentBox from "../components/StudentBox";
import { Unsubscribe } from "firebase/auth";

const Subjects = () => {

const [documents, setDocuments] = useState<Document[]>([]);
    
interface Document {
  // Define your document properties here
  // For example:
  id: string;
  title: string;
  content: string;
    Unsubscribe: string;
    name: string;
    teacher: string;
}    
    
const fetchData = async (subject: string): Promise<Unsubscribe> => {
  try {
    const querySnapshot = collection(db, "subjects");
    const q = query(querySnapshot, orderBy("timestamp", "desc"));

    const unsubscribe:Unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Document[] = [];
      snapshot.docs.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Document);
      });
      setDocuments(data);
    });
      return unsubscribe;
      
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

  useEffect(() => {
      setDocuments; 
  }, []);
    
    return (
      // <div>Subjects</div>
      <div>
        {documents &&
          documents.map((documents) => (
            <StudentBox key={documents.id} {...documents}></StudentBox>
          ))}
      </div>
    );
}

export default Subjects;





 