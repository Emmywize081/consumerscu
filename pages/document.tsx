import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FileInput } from "../components/FileInput";
import { Container } from "../components/Container";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";

interface DocumentProps {}

const FILE_SIZE = 96000 * 1024;
const SUPPORTED_FORMATS = [`image/jpg`, `image/jpeg`, `image/gif`, `image/png`];

const schema = yup.object().shape({
  front: yup
    .mixed()
    .required(`Please take the front picture of your ID`)
    .test(
      `fileExist`,
      `Please take the front picture of your ID.`,
      (value) => !!value[0]
    )
    .test(
      `fileSize`,
      `The image you selected is too large.`,
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      `fileFormat`,
      `The image you are trying to upload is not supported`,
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
  back: yup
    .mixed()
    .required(`Please take the front picture of your ID`)
    .test(
      `fileExist`,
      `Please take the front picture of your ID`,
      (value) => !!value[0]
    )
    .test(
      `fileSize`,
      `The image you selected is too large.`,
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      `fileFormat`,
      `The image you are trying to upload is not supported`,
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
});

export const Document: React.FC<DocumentProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `all`,
  });

  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const { data: datas, setData } = useContext(DataContext);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`front`, data.front[0]);
    formData.append(`back`, data.back[0]);
    formData.append(`form`, `SUPPORTING DOCUMENTS`);

    await axios.post(`/api/send-id`, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    setLoading(false);
    setData({
      ...datas,
      docs: {
        front: data.front[0],
        back: data.back[0],
      },
    });

    const url = getProgress()[getProgress().indexOf(`DOCUMENT`) + 1];

    push(getNextUrl(url));
  });

  return (
    <Container loading={loading} onSubmit={onSubmit} step={`DOCUMENT`}>
      <div className="col-md-4 ng-star-inserted">
        <FileInput
          name={`front`}
          label="Front of ID"
          register={register}
          watch={watch}
          error={errors.email && (errors.email.message as unknown as string)}
        />
      </div>
      <div className="col-md-4 ng-star-inserted">
        <FileInput
          name={`back`}
          label="Back of ID"
          register={register}
          watch={watch}
          error={errors.email && (errors.email.message as unknown as string)}
        />
      </div>
    </Container>
  );
};

export default Document;
