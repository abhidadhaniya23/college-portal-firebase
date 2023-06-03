import { auth, db } from "../firebase/config";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

const Subjects = () => {
  const fetchUploadedMaterials = async () => {
    try {
      // Query the materials collection to fetch all uploaded materials
      const q = query(collection(db, "materials"));
      const querySnapshot = await getDocs(q);

      // Extract the material data from the query snapshot
      const uploadedMaterials = querySnapshot.docs.map(async (doc) => {
        const materialData = doc.data();

        // Fetch the teacher data for the material
        const teacherDoc = await getDoc(materialData.teacher);
        const teacherData = teacherDoc.data();

        return {
          id: doc.id,
          fileURL: materialData.fileURL,
          name: materialData.name,
          subject: materialData.subject,
          teacher: {
            // @ts-ignore
            ...teacherData,
          },
        };
      });

      // Return the list of uploaded materials with the teacher's data
      return Promise.all(uploadedMaterials);
    } catch (error) {
      console.error("Error fetching uploaded materials:", error);
      return [];
    }
  };

  const subject = useQuery("subjects", fetchUploadedMaterials, {
    enabled: !!auth.currentUser?.uid,
  });

  if (subject.isLoading) return <Loader />;

  return (
    <>
      <section className="flex flex-col gap-10">
        <Typography
          variant="h3"
          color="blue-gray"
          className="text-center mt-10"
        >
          Uploaded Materials
        </Typography>
        <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
          {subject.data?.map((material, index) => (
            <>
              <MaterialCard key={index} material={material} />
            </>
          ))}
        </div>
      </section>
    </>
  );
};

type MaterialProps = {
  material: {
    name: string;
    subject: string;
    fileURL: string;
    teacher: {
      name: string;
      email: string;
      role: string;
    };
  };
};

const MaterialCard = (props: MaterialProps) => {
  const { material } = props;
  return (
    <Card
      shadow={false}
      key={material.name}
      className="w-full sm:w-64 lg:w-72 border border-gray-300 flex flex-col gap-6 mx-auto items-center"
    >
      <CardBody
        className="flex flex-col gap-1 mx-auto items-center w-full"
        key={material.name}
      >
        <Typography variant="h5" color="blue-gray">
          {material.name}
        </Typography>
        <Typography variant="h6" color="blue-gray">
          Subject: {material.subject}
        </Typography>
        <Typography variant="small">By {material.teacher.name}</Typography>
        <Button
          size="sm"
          variant="outlined"
          className="mt-3 normal-case text-base"
          fullWidth
          onClick={() => window.open(material.fileURL)}
        >
          Open Material
        </Button>
      </CardBody>
    </Card>
  );
};

export default Subjects;
