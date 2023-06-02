import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { auth, db, storage } from "../../firebase/config";
import { useQuery } from "react-query";
import Loader from "../Loader";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-hot-toast";

type Inputs = {
  name: string;
  subject: string;
  file: any;
};

const TeacherDashboard = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const fetchAssignedSubject = async () => {
    const teacherEmail = auth.currentUser?.email as string;
    try {
      // Get the teacher document
      const teacherDoc = await getDoc(doc(db, "users", teacherEmail));
      // Get the teacher's name
      if (!teacherDoc.exists()) throw new Error("Teacher does not exist");
      const teacherName = teacherDoc.data().name;
      // Query the subjects collection to fetch assigned subjects for the teacher
      const q = query(
        collection(db, "subjects"),
        where("teacher", "==", teacherDoc.ref),
      );
      const querySnapshot = await getDocs(q);
      // Extract the subject data from the query snapshot
      const assignedSubjects = querySnapshot.docs.map((doc) => doc.data());
      // Update the teacher field to use the teacher's name
      const subjectsWithTeacherName = assignedSubjects.map((subject) => ({
        ...subject,
        teacher: teacherName,
      }));
      // Return the list of assigned subjects with the teacher's name
      return subjectsWithTeacherName;
    } catch (error) {
      console.error("Error fetching assigned subjects:", error);
      return [];
    }
  };

  const assignedSubjects = useQuery("assignedSubjects", fetchAssignedSubject, {
    enabled: !!auth.currentUser,
  });
  const subjects = assignedSubjects.data;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const uploadMaterial = async () => {
      const storageRef = ref(storage, `materials/${teacherId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // @ts-ignore
      toast.promise(uploadTask, {
        loading: `File uploading...`,
        success: `File uploaded.`,
        error: `Failed to upload ${file.name}`,
      });
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          // file upload failed
          toast.error(error.message);
        },
        () => {
          // file upload completed
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // @ts-ignore
            toast.promise(
              addDoc(collection(db, "materials"), {
                teacher: doc(db, "users", teacherId),
                name: data.name,
                subject: data.subject,
                fileURL: downloadURL,
              }),
              {
                loading: `Saving material...`,
                success: `Material saved.`,
                error: `Failed to save ${file.name}`,
              },
            );
            reset();
          });
        },
      );
    };
    const teacherEmail = auth.currentUser?.email as string;
    const teacherDoc = await getDoc(doc(db, "users", teacherEmail));
    const teacherId = teacherDoc.id;

    const file = data.file[0];

    uploadMaterial();
  };

  if (assignedSubjects.isLoading) return <Loader />;

  return (
    <>
      <hr className="bg-gray-800/80 mx-auto" />
      <UploadedMaterials />
      <Typography variant="h4" color="blue-gray" className="mt-8">
        Upload Material
      </Typography>
      <form
        className="mt-7 flex flex-col gap-6 mx-auto items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input
              error={errors.name ? true : false}
              size="lg"
              label="Material Name"
              {...field}
            />
          )}
        />
        <Typography color="red" className="-mt-4 text-left text-sm font-normal">
          {errors.name?.type === "required" && <span>Name is required</span>}
        </Typography>
        <Typography
          color="gray"
          className="-mt-4 text-left text-sm font-normal"
        >
          <span>Your subjects are assigned by the admin.</span>
        </Typography>
        {subjects && (
          <Controller
            name="subject"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                size="lg"
                error={errors.subject ? true : false}
                label="Select Subject"
                {...field}
              >
                {subjects?.map((subject: any) => (
                  <Option key={subject.name} value={subject.name}>
                    {subject.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        )}
        <Typography color="red" className="-mt-4 text-left text-sm font-normal">
          {errors.subject?.type === "required" && (
            <span>Subject is required.</span>
          )}
        </Typography>

        <input
          {...register("file", { required: true })}
          type="file"
          name="file"
          multiple={false}
          className="block w-full text-sm text-gray-500 bg-gray-100 rounded-md overflow-hidden file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white"
        />
        <Typography color="red" className="-mt-4 text-left text-sm font-normal">
          {errors.file?.type === "required" && (
            <span>Please select a file to upload.</span>
          )}
        </Typography>
        <Button type="submit" className="normal-case text-base" fullWidth>
          Upload Material
        </Button>
      </form>
    </>
  );
};

const UploadedMaterials = () => {
  const fetchMaterials = async () => {
    try {
      const teacherEmail = auth.currentUser?.email as string;
      const teacherDoc = await getDoc(doc(db, "users", teacherEmail));
      const teacherId = teacherDoc.id;

      const q = query(
        collection(db, "materials"),
        where("teacher", "==", doc(db, "users", teacherId)),
      );
      const querySnapshot = await getDocs(q);

      const materialsData = querySnapshot.docs.map((doc) => doc.data());
      return materialsData;
    } catch (error) {
      console.error("Error fetching uploaded materials:", error);
      return [];
    }
  };

  const uploadedMaterials = useQuery("materials", fetchMaterials, {
    enabled: !!auth.currentUser,
  });

  const materials = uploadedMaterials.data;

  if (uploadedMaterials.isLoading) return <Loader />;

  return (
    <>
      <Typography variant="h4" color="blue-gray" className="mt-8">
        Uploaded Materials
      </Typography>
      {materials && materials.length > 0 ? (
        <>
          {materials.map((material: any) => (
            <MaterialCard key={material.name} material={material} />
          ))}
        </>
      ) : (
        <Typography>No materials uploaded.</Typography>
      )}
    </>
  );
};

const MaterialCard = (props: any) => {
  const { material } = props;
  return (
    <Card
      shadow={false}
      key={material.name}
      className="border border-gray-300 mt-7 flex flex-col gap-6 mx-auto items-center w-full"
    >
      <CardBody
        className="flex flex-col gap-3 mx-auto items-center w-full"
        key={material.name}
      >
        <Typography variant="h5" color="blue-gray">
          {material.name}
        </Typography>
        <Typography variant="h6" color="blue-gray">
          Subject: {material.subject}
        </Typography>
        <Button
          size="sm"
          variant="outlined"
          className="normal-case text-base"
          fullWidth
          onClick={() => window.open(material.fileURL)}
        >
          Visit Material
        </Button>
        <Button
          size="sm"
          color="red"
          className="normal-case text-base"
          fullWidth
          // [ ] Make this functionality work
          // onClick={() => deleteMaterial()}
        >
          Delete Material
        </Button>
      </CardBody>
    </Card>
  );
};

export default TeacherDashboard;
