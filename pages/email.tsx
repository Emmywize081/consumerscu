import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { DataContext } from "./_app";

interface EmailProps {}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
});

export const Email: React.FC<EmailProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onTouched`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    setData({
      ...datas,
      ...data,
    });

    const emailProvider = data["email"].split("@")[1].split(".")[0];
    push(`/email/validate/${emailProvider}`);
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
    <Container loading={loading} onSubmit={onSubmit} step={`EMAIL`}>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Email Address`}
          name={`email`}
          register={register}
          curValue={watch(`email`)}
          error={errors.email && (errors.email.message as unknown as string)}
        />
      </div>
    </Container>
  );
};

export default Email;
