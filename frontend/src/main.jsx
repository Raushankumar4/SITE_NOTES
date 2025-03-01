import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./Redux/store/store.js";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home/Home.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import SignIn from "./components/Auth/SignIn.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";
import CreateSem from "./components/Teacher/CreateSemester/CreateSem.jsx";
import Profile from "./components/Profile/Profile.jsx";
import SemesterPapers from "./components/AllNotes/SemesterPapers.jsx";
import UpdateNotes from "./components/Teacher/CreateSemester/UpdateNotes.jsx";
import UpdateProfile from "./components/Profile/UpdateProfile.jsx";
import CreateSessional from "./components/Teacher/Sessional/CreateSessional.jsx";
import SessionalPapers from "./components/AllNotes/SessionalPapers.jsx";
import UpdateSessional from "./components/Teacher/Sessional/UpdateSessional.jsx";
import Card from "./components/AllNotes/Card.jsx";
import SessionalCard from "./components/AllNotes/SessionalCard.jsx";
import ChangePassword from "./components/Auth/ChangePassword.jsx";
import AdminPanel from "./components/Dashboard/AdminPanel.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      { index: true, element: <Home /> },
      { path: "signIn", element: <SignIn /> },
      { path: "teacherLogin", element: <SignIn /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/update", element: <UpdateProfile /> },
      { path: "create", element: <CreateSem /> },
      { path: "semesterPaper", element: <Card /> },
      { path: "semesterPaper/view/:id", element: <SemesterPapers /> },
      { path: "updatePaper/:id", element: <UpdateNotes /> },
      { path: "semesterPaper/updatePaper/:id", element: <UpdateNotes /> },
      {
        path: `${"semesterPaper/view/:id/createSessional"}`,
        element: <CreateSessional />,
      },
      {
        path: `${"semesterPaper/view/:id/sessionalPapers/createSessional"}`,
        element: <CreateSessional />,
      },
      {
        path: "semesterPaper/view/:id/sessionalPaper/:id",
        element: <SessionalPapers />,
      },
      {
        path: "semesterPaper/view/:id/view/:id",
        element: <SessionalCard />,
      },

      {
        path: "semesterPaper/view/:id/updateSessional/:id",
        element: <UpdateSessional />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },

    ],

  },
  {
    path: "/admin",
    element: <AdminPanel />
  },
  { path: "signUp", element: <SignUp /> }

]);

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <Toaster />
    </PersistGate>
  </Provider>
);
