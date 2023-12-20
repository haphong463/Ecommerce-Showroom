import { Settings } from "../containers/admin/Settings";
import { Home } from "../containers/admin/Home";
import { Home as HomeUser } from "../containers/user/Home";
import { Vehicles as VehicleUser } from "../containers/user/Vehicles";
import { Brand } from "../containers/admin/Brand";
import { BrandProvider } from "../context/BrandContext";
import { Login } from "../containers/admin/Login";
import { Service as ServiceUser } from "../containers/user/Service";
import { VehicleDetails as VehicleDetailsAdmin } from "../containers/admin/VehicleDetails";
import { SignUp } from "../containers/user/SignUp";
import { Vehicles } from "../containers/admin/Vehicles";
import { VehicleDetails } from "../containers/user/VehicleDetails";
import { VehicleProvider } from "../context/VehicleContext";
import { Signin } from "../containers/user/Signin";
import { Customer } from "../containers/admin/Customer";
import Cart from "../containers/user/Cart";
import { Service } from "../containers/admin/Service";
import { Invoice } from "../containers/admin/Invoice";
import { ServiceProvider } from "../context/ServiceContext";
import { Profile } from "../containers/user/Profile";
import { Order } from "../containers/admin/Order";
import { OrderProvider } from "../context/OrderContext";
import { SaleOrder } from "../containers/admin/SaleOrder";
import { SaleOrderProvider } from "../context/SaleOrderContext";
import { Employee } from "../containers/admin/Employee";
import { AccountProvider } from "../context/AccountContext";

export const publicRoutes = [
  {
    path: "/",
    component: (
      <VehicleProvider>
        <HomeUser />
      </VehicleProvider>
    ),
  },
  {
    path: "/service",
    component: (
      <ServiceProvider>
        <ServiceUser />
      </ServiceProvider>
    ),
  },
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
  { path: "/profile", component: <Profile /> },
  { path: "cart", component: <Cart /> },
];

export const privateRoutes = [
  { path: "/admin/", component: <Home />, roles: ["Admin", "Employee"] },
  {
    path: "/admin/settings",
    component: <Settings />,
    roles: ["Admin", "Employee"],
  },
  {
    path: "/admin/vehicles",
    component: (
      <VehicleProvider>
        <Vehicles />
      </VehicleProvider>
    ),
    roles: ["Admin", "Employee"],
  },
  {
    path: "/admin/brand",
    component: (
      <BrandProvider>
        <Brand />
      </BrandProvider>
    ),
    roles: ["Admin", "Employee"],
  },
  {
    path: "/admin/customer",
    component: <Customer />,
    roles: ["Admin", "Employee"],
  },
  {
    path: "/admin/vehicle/:id",
    component: (
      <VehicleProvider>
        <VehicleDetailsAdmin />
      </VehicleProvider>
    ),
    roles: ["Admin", "Employee"],
  },
  {
    path: "/admin/service",
    component: (
      <ServiceProvider>
        <Service />
      </ServiceProvider>
    ),
    roles: ["Admin", "Employee"],
  },
  {
    path: "/admin/purchaseOrder",
    component: (
      <OrderProvider>
        <Order />
      </OrderProvider>
    ),
    roles: ["Admin", "Employee"],
  },
  {
    path: "/admin/salesOrder",
    component: (
      <SaleOrderProvider>
        <SaleOrder />
      </SaleOrderProvider>
    ),
    roles: ["Admin", "Employee"],
  },
  {
    path: "/admin/invoice",
    component: <Invoice />,
    roles: ["Admin", "Employee"],
  },
  {
    path: "/admin/employee",
    component: (
      <AccountProvider>
        <Employee />
      </AccountProvider>
    ),
    roles: ["Admin", "Employee"],
  },
];
