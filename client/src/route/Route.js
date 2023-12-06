import { Settings } from "../containers/admin/Settings";
import { Home } from "../containers/admin/Home";
import { Home as HomeUser } from "../containers/user/Home";
import { Vehicles as VehicleUser } from "../containers/user/Vehicles";
import { Brand } from "../containers/admin/Brand";
import { BrandProvider } from "../context/BrandContext";
import { Login } from "../containers/admin/Login";
import { Service } from "../containers/user/Service";
import { VehicleDetails as VehicleDetailsAdmin } from "../containers/admin/VehicleDetails";
import { SignUp } from "../containers/user/SignUp";
import { Vehicles } from "../containers/admin/Vehicles";
import { VehicleDetails } from "../containers/user/VehicleDetails";
import { VehicleProvider } from "../context/VehicleContext";
import { Signin } from "../containers/user/Signin";
import { Customer } from "../containers/admin/Customer";
import Cart from "../containers/user/Cart";

export const publicRoutes = [
  {
    path: "/",
    component: (
      <VehicleProvider>
        <HomeUser />
      </VehicleProvider>
    ),
  },
  { path: "/service", component: <Service /> },
  { path: "/signup", component: <SignUp /> },
  {
    path: "/vehicles",
    component: (
      <VehicleProvider>
        <VehicleUser />
      </VehicleProvider>
    ),
  },
  {
    path: "/vehiclesUsed",
    component: (
      <VehicleProvider>
        <VehicleUser />
      </VehicleProvider>
    ),
  },
  {
    path: "/vehicle/:id",
    component: (
      <VehicleProvider>
        <VehicleDetails />
      </VehicleProvider>
    ),
  },
  { path: "/admin/login", component: <Login /> },
  { path: "/login", component: <Signin /> },
  { path: "/cart", component: <Cart />, roles: ["Admin", "User"] },
];

export const privateRoutes = [
  { path: "/admin/", component: <Home />, roles: ["Admin"] },
  { path: "/admin/settings", component: <Settings />, roles: ["Admin"] },
  {
    path: "/admin/vehicles",
    component: (
      <VehicleProvider>
        <Vehicles />
      </VehicleProvider>
    ),
    roles: ["Admin"],
  },
  {
    path: "/admin/brand",
    component: (
      <BrandProvider>
        <Brand />
      </BrandProvider>
    ),
    roles: ["Admin"],
  },
  {
    path: "/admin/customer",
    component: <Customer />,
    roles: ["Admin"],
  },
  {
    path: "/admin/vehicle/:id",
    component: (
      <VehicleProvider>
        <VehicleDetailsAdmin />
      </VehicleProvider>
    ),
    roles: ["Admin"],
  },
];
