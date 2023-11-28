import { Settings } from "../containers/admin/Settings";
import { Home } from "../containers/admin/Home";
import { Vehicles } from "../containers/admin/Vehicles";
import { Brand } from "../containers/admin/Brand";
import { BrandProvider } from "../context/BrandContext";
import { Login } from "../containers/admin/Login";

export const publicRoutes = [
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
];
