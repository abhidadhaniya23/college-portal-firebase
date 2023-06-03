import { useQuery } from "react-query";
import CurrentUser from "../../hooks/CurrentUser";
import { User } from "../../hooks/AuthState";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import Subjects from "../../pages/Subjects";

const Dashboard = () => {
  const { data } = useQuery("user", CurrentUser, { enabled: !!User() });
  return (
    <>
      {data?.role === "admin" ? (
        <AdminDashboard />
      ) : data?.role === "teacher" ? (
        <TeacherDashboard />
      ) : data?.role === "student" ? (
        <Subjects />
      ) : null}
    </>
  );
};

export default Dashboard;
