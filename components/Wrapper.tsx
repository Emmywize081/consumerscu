import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface WrapperProps {
  children?: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="logged-out">
      <Header />
      <div id="main-wrapper" className="main-wrapper">
        {children}
        <Footer />
      </div>
    </div>
  );
};
