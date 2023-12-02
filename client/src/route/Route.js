import { Settings } from "../containers/admin/Settings";
import { Home } from "../containers/admin/Home";
import { Home as HomeUser } from "../containers/user/Home";
import { Vehicles as VehicleUser } from "../containers/user/Vehicles";
import { Brand } from "../containers/admin/Brand";
import { BrandProvider } from "../context/BrandContext";
import { Login } from "../containers/admin/Login";
import { AboutUs } from "../containers/user/AboutUs";
import { VehicleDetails } from "../containers/admin/VehicleDetails";
import { SignUp } from "../containers/user/SignUp";
import { Vehicles } from "../containers/admin/Vehicles";

export const publicRoutes = [
  { path: "/", component: <HomeUser /> },
  { path: "/about", component: <AboutUs /> },
  { path: "/signup", component: <SignUp /> },
  { path: "/vehicles", component: <VehicleUser /> },
];

export const privateRoutes = [
  { path: "/admin/", component: <Home /> },
  { path: "/admin/settings", component: <Settings /> },
  { path: "/admin/vehicles", component: <Vehicles /> },
  { path: "/admin/login", component: <Login /> },
  {
    path: "/admin/brand",
    component: (
      <BrandProvider>
        <Brand />
      </BrandProvider>
    ),
  },
  { path: "/admin/vehicle/:id", component: <VehicleDetails /> },
];
