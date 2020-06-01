import React, { useContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export type RouteType = {
  name: string;
  path: string;
  exact?: boolean;
  component: any;
  showItem?: boolean;
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

export const Router: React.FC<{ routes: RouteType[], navbar?: any, brand?: string }> = ({ routes, navbar: Navbar, brand: initalBrand }) => {
  const [brand, setBrand] = useState(initalBrand)
  const [showNavbar, setShowNavbar] = useState(true)

  const onSetBrand = (brand: string) => setBrand(brand)
  const onShowNavbar = (option: boolean) => setShowNavbar(option)

  return (
    <RouterContext.Provider value={{ routes, brand, onSetBrand, showNavbar, onShowNavbar }}>
      <BrowserRouter>
        {Navbar && <Navbar />}
        <Switch>
          {routes.map((route, index) => <Route key={index} {...route} />)}
        </Switch>
      </BrowserRouter>
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext<RouterProps>(RouterContext);

  return context;
};
