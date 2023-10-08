import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

function AppLayout({userEmail, onSignOut}) {
  return (
    <>
      <Header
        userEmail={userEmail}
        onSignOut={onSignOut}
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;