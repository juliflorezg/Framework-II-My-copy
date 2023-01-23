import React, { FC } from "react";
import { UIProvider } from './'
import { ModalComponent } from "./common/ModalComponent";

const Layout: FC<any> = ({ children }) => {
  return (
    <UIProvider>
      {children}
      <ModalComponent />
    </UIProvider>
  );
};

export default Layout;