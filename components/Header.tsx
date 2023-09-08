import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const isMobile = useMediaQuery(`(max-width: 767.98px)`);
  const isTable = useMediaQuery(`(max-width: 1079.98px)`);

  return (
    <>
      {isMobile ? (
        <span className="ng-tns-c225-0 navbar">
          {/**/}
          <nav className="app-navbar navbar fs-unmask ng-tns-c225-0">
            <div className="navbar-area ng-tns-c225-0">
              {/**/}
              <div
                className="navbar-brand-container mt-1 ng-tns-c225-0 ng-star-inserted"
                aria-label="FI Logo"
              >
                <a className="navbar-brand logo-white ng-tns-c225-0" />
              </div>
              {/**/}
              {/**/}
              {/**/}
              {/**/}
              {/**/}
              {/**/}
              {/**/}
              {/**/}
            </div>
            {/**/}
            {/**/}
          </nav>
          {/**/}
          {/**/}
          {/**/}
        </span>
      ) : isTable ? (
        <span className="ng-tns-c225-0 navbar">
          {/**/}
          <nav className="app-navbar navbar fs-unmask ng-tns-c225-0">
            <div className="navbar-area ng-tns-c225-0">
              {/**/}
              <div
                className="navbar-brand-container mt-1 ng-tns-c225-0 ng-star-inserted"
                aria-label="FI Logo"
              >
                <a className="navbar-brand logo-white ng-tns-c225-0" />
              </div>
              {/**/}
              {/**/}
              {/**/}
              {/**/}
              {/**/}
              {/**/}
              {/**/}
              {/**/}
            </div>
            {/**/}
            {/**/}
          </nav>
          {/**/}
          {/**/}
          {/**/}
        </span>
      ) : (
        <span className="ng-tns-c225-0 navbar">
          {/**/}
          <nav className="app-navbar navbar fs-unmask ng-tns-c225-0">
            <div className="navbar-area ng-tns-c225-0">
              {/**/}
              {/**/}
            </div>
            <div className="navbar-menu ng-tns-c225-0 ng-star-inserted">
              <div className="logo-white-container ng-tns-c225-0 ng-star-inserted">
                <a className="navbar-brand logo-white ng-tns-c225-0" />
              </div>
              {/**/}
              {/**/}
              <ul className="navbar-nav navbar-icons ng-tns-c225-0 ng-star-inserted">
                {/**/}
              </ul>
              {/**/}
              {/**/}
            </div>
            {/**/}
            {/**/}
          </nav>
          {/**/}
          {/**/}
          {/**/}
        </span>
      )}
    </>
  );
};
