import { useQuery } from "react-query";
import CurrentUser from "../../hooks/CurrentUser";
import { User } from "../../hooks/AuthState";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = () => {
  const { data } = useQuery("user", CurrentUser, { enabled: !!User() });
  return (
    <>
      {data?.role === "admin" ? (
        <AdminDashboard />
      ) : data?.role === "teacher" ? (
        <TeacherDashboard />
      ) : null}
    </>
  );
};

export default Dashboard;
