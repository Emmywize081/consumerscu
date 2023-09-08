import React, { useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import ReactInputMask from "react-input-mask";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  boxStyle?: React.CSSProperties | undefined;
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  register?: UseFormRegister<FieldValues>;
  registerOptions?: any;
  mask?: string;
  curValue?: string;
}

export const Input: React.FC<InputProps> = ({
  boxStyle,
  label,
  name,
  placeholder,
  error,
  register = () => ({}),
  registerOptions,
  curValue,
  mask,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      autoCapitalize="off"
      autoCorrect="off"
      id="loginUsername"
      data-e2e="login-username"
      className={`${error ? `mb-4` : `mb-2`} form-group ng-pristine ${
        curValue && !error ? `ng-dirty ng-valid` : `ng-invalid`
      } ng-touched`}
    >
      <div
        className={
          props.type === `password` ? `icon-right has-error` : `has-error`
        }
      >
        <div className="sub-form-group">
          {mask ? (
            <ReactInputMask mask={mask} {...register(name, registerOptions)}>
              {
                // @ts-ignore
                () => (
                  <input
                    autoCapitalize="off"
                    autoCorrect="off"
                    className={`form-control ${curValue ? `has-value` : ``}`}
                    placeholder=""
                    tabIndex={0}
                    maxLength={500}
                    aria-describedby="ibLjXvVWM1vUFF7vsiimerrorMessage"
                    autoComplete="off"
                    aria-autocomplete="list"
                    {...register(name, registerOptions)}
                    {...props}
                    type={showPassword ? `text` : props.type || `text`}
                    style={
                      error
                        ? {
                            color: "var(--fail-color)",
                            borderColor: "var(--fail-color)",
                          }
                        : {}
                    }
                  />
                )
              }
            </ReactInputMask>
          ) : (
            <input
              autoCapitalize="off"
              autoCorrect="off"
              className={`form-control ${curValue ? `has-value` : ``}`}
              placeholder=""
              tabIndex={0}
              maxLength={500}
              aria-describedby="ibLjXvVWM1vUFF7vsiimerrorMessage"
              autoComplete="off"
              aria-autocomplete="list"
              {...register(name, registerOptions)}
              {...props}
              type={showPassword ? `text` : props.type || `text`}
              style={
                error
                  ? {
                      color: "var(--fail-color)",
                      borderColor: "var(--fail-color)",
                    }
                  : {}
              }
            />
          )}

          {/**/}
          {/**/}
          <span
            className="form-control-animation ng-star-inserted"
            style={
              error
                ? {
                    width: "100%",
                    backgroundColor: "var(--fail-color)",
                  }
                : {}
            }
          />
          {/**/}
          <label
            className="form-control-label fs-unmask ng-star-inserted"
            htmlFor="ibLjXvVWM1vUFF7vsiim"
          >
            {label}
          </label>
          {/**/}
          {props.type === `password` ? (
            <span
              className="form-control-icon right-icon fs-unmask ng-star-inserted"
              onClick={() => setShowPassword(!showPassword)}
            >
              <em
                aria-hidden="true"
                className="material-icons"
                style={
                  error
                    ? {
                        color: "var(--danger)",
                      }
                    : {}
                }
              >
                {showPassword ? `visibility_off` : `visibility`}
              </em>
            </span>
          ) : null}
          {/**/}
          <span
            role="alert"
            className="form-control-feedback fs-unmask"
            style={
              error
                ? {
                    display: "block",
                    color: "var(--fail-color)",
                  }
                : {}
            }
          >
            {/**/}
            {/**/}
          </span>
          {error ? (
            <span
              role="alert"
              className="form-control-feedback fs-unmask error"
              id="ibLjXvVWM1vUFF7vsiimerrorMessage"
              style={
                error
                  ? {
                      display: "block",
                      color: "var(--fail-color)",
                    }
                  : {}
              }
            >
              <span className="ng-star-inserted">
                <em aria-hidden="true" className="material-icons">
                  error
                </em>{" "}
                {error}
              </span>
              {/**/}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
