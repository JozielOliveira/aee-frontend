import React, { useContext, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AdminProvider, useAdmin } from "hooks/Admin";

export type RouteType = {
  name: string;
  path: string;
  exact?: boolean;
  component: any;
  showItem?: boolean;
  isPrivate?: boolean;
  isAdmin?: boolean;
};

export interface RouterProps {
  routes: RouteType[];
  navbar?: any;
  brand?: string;
  showNavbar?: boolean;
  onSetBrand(title: string): void;
  onShowNavbar(option: boolean): void;
}

const RouterContext = React.createContext<RouterProps>({
  routes: [],
  onSetBrand: () => { },
  onShowNavbar: () => { }
});

export const Router: React.FC<{ routes: RouteType[], navbar?: any, brand?: string }> = ({ routes, navbar: Navbar, brand: initialBrand }) => {
  const [brand, setBrand] = useState(initialBrand)
  const [showNavbar, setShowNavbar] = useState(true)

  const onSetBrand = (brand: string) => setBrand(brand)
  const onShowNavbar = (option: boolean) => setShowNavbar(option)

  return (
    <RouterContext.Provider value={{ routes, brand, onSetBrand, showNavbar, onShowNavbar }}>
      <BrowserRouter>
        <AdminProvider>
          {Navbar && <Navbar />}
          <Switch>
            {routes.map(({ component, ...route }, index) => (
              <Route key={index} {...route}>
                <RouterValidator component={component} route={route} />
              </Route>
            ))}
          </Switch>
        </AdminProvider>
      </BrowserRouter>
    </RouterContext.Provider>
  );
};

const RouterValidator = ({ component: Component, route }: any) => {
  const { logged, isAdmin } = useAdmin();

  // eslint-disable-next-line
  if (route.isPrivate && !logged || route.isAdmin && !isAdmin)
    return <Redirect to="/" />
  else
    return <Component />
}

export const useRouter = () => {
  const context = useContext<RouterProps>(RouterContext);

  return context;
};
