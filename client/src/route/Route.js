import { Settings } from "../containers/admin/Settings";
import { Home } from "../containers/admin/Home";
import { Vehicles } from "../containers/admin/Vehicles";
import { Brand } from "../containers/admin/Brand";
import { BrandProvider } from "../context/BrandContext";

export const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/settings", component: <Settings /> },
  { path: "/vehicles", component: <Vehicles /> },
  {
    path: "/brand",
    component: (
      <BrandProvider>
        <Brand />
      </BrandProvider>
    ),
  },
];
