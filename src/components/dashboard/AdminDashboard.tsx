import {
  Button,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import TeacherList from "../../hooks/TeacherList";
import { User } from "../../hooks/AuthState";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../Loader";
import { toast } from "react-hot-toast";
import { fetchSubjects } from "../../utils/SubjectList";
import slugify from "slugify";
import { BsTrash3 } from "react-icons/bs";

type Inputs = {
  subjectName: string;
  subjectTeacher: string;
};

const AdminDashboard = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const teacherList = useQuery("teacherList", TeacherList, {
    enabled: !!User(),
  });
  const teacherData = teacherList.data;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const addSubject = async (teacherId: any) => {
      try {
        // Create a new subject document
        const newSubjectDoc = {
          // Set other fields of the subject document
          name: data.subjectName,
          // Set the teacher field as a reference to the teacher document
          teacher: doc(db, "users", teacherId),
        };
        const subjectRef = doc(db, "subjects", slugify(data.subjectName));
        await setDoc(subjectRef, newSubjectDoc);
        toast.success("Subject added successfully");
        reset();

        // Update the subjectsList query after adding a subject
        queryClient.invalidateQueries("subjectsList");
      } catch (error) {
        toast.error("Error in subject creation");
      }
    };

    const selectedTeacher = teacherData?.find(
      (teacher) => teacher.name === data.subjectTeacher,
    );
    if (selectedTeacher) {
      addSubject(selectedTeacher.email); // Pass the teacher's email as an argument
    }
  };

  if (teacherList.isLoading) return <Loader />;
  return (
    <>
      <Typography variant="h4" color="blue-gray" className="mt-8">
        Subject Creation
      </Typography>
      <form
        className="mt-7 flex flex-col mx-auto items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 w-full">
          <Controller
            name="subjectName"
            control={control}
            rules={{
              required: true,
              pattern: /^[a-zA-Z\s]*$/,
            }}
            render={({ field }) => (
              <Input
                error={errors.subjectName ? true : false}
                size="lg"
                label="Name"
                {...field}
              />
            )}
          />
          <Typography
            color="red"
            className="-mt-4 text-left text-sm font-normal"
          >
            {errors.subjectName?.type === "required" && (
              <span>Name is required</span>
            )}
            {errors.subjectName?.type === "pattern" && (
              <span>Enter a valid name (Only alphabet allowed.)</span>
            )}
          </Typography>

          {teacherData && (
            <Controller
              name="subjectTeacher"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  size="lg"
                  error={errors.subjectTeacher ? true : false}
                  label="Assign Teacher"
                  {...field}
                >
                  {teacherData &&
                    teacherData?.map((teacher) => (
                      <Option key={teacher.email} value={teacher.name}>
                        {teacher.name}
                      </Option>
                    ))}
                </Select>
              )}
            />
          )}
          <Typography
            color="red"
            className="-mt-4 text-left text-sm font-normal"
          >
            {errors.subjectTeacher?.type === "required" && (
              <span>Assign Teacher is required.</span>
            )}
          </Typography>

          <Button type="submit" className="normal-case text-base" fullWidth>
            Create Subject
          </Button>
          <hr className="bg-gray-800/80 w-full mx-auto" />
        </div>
      </form>
      <SubjectsList />
    </>
  );
};

const SubjectsList = () => {
  const queryClient = useQueryClient();

  const subjectsList = useQuery("subjectsList", fetchSubjects, {
    enabled: !!User(),
  });
  const subjectsData = subjectsList.data;

  const deleteSubject = async (subjectName: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?",
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const subjectRef = doc(db, "subjects", slugify(subjectName));
      await deleteDoc(subjectRef);
      toast.success("Subject deleted successfully");

      // Update the subjectsList query after deleting a subject
      queryClient.invalidateQueries("subjectsList");
    } catch (error) {
      toast.error("Error deleting subject");
    }
  };

  if (subjectsList.isLoading) return <Loader />;
  return (
    <>
      <Typography variant="h4" color="blue-gray" className="mt-8">
        Subjects - Assigned Teachers
      </Typography>
      <div className="mt-7 flex flex-col mx-auto w-full">
        {subjectsData?.map((subject) => (
          <div
            key={subject.name}
            className="flex justify-between items-center gap-4 border-b border-gray-200 py-2"
          >
            <Typography variant="h6">{subject.name}</Typography>
            <div className="flex flex-row items-center gap-3">
              <Typography variant="h6">{subject.teacher.name}</Typography>
              <IconButton
                color="red"
                onClick={() => deleteSubject(subject.name)}
              >
                <BsTrash3 size={20} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
