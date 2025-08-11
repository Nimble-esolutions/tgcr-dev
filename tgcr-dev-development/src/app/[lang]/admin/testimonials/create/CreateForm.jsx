"use client";

import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import ImageUpload from "@/components/FormHelpers/ImageUpload";
import Input from "@/components/FormHelpers/Input";

const CreateForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isLoading, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      bioTitle: "",
      description: "",
    },
  });

  const image = watch("image");

  const onSubmit = async (data) => {
    if (!data.image) {
      toast.error("Please drop image 300x300 before submitting.");
      return;
    }

    axios
      .post("/api/admin/testimonials", data)
      .then((response) => {
        toast.success(response.data.message);
        router.push("/admin/testimonials");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-12">
          <ImageUpload
            onChange={(value) => setCustomValue("image", value)}
            value={image}
            label="User image 300x300"
          />
        </div>

        <div className="col-md-12">
          <Input
            label="Name"
            id="name"
            disabled={isLoading}
            register={register}
            errors={errors}
          />
        </div>

        <div className="col-md-12">
          <Input
            label="Designation"
            id="bioTitle"
            disabled={isLoading}
            register={register}
            errors={errors}
          />
        </div>

        <div className="col-md-12">
          <Input
            label="Description"
            id="description"
            disabled={isLoading}
            register={register}
            errors={errors}
          />
        </div>

        <div className="col-12">
          <button className="default-btn" type="submit">
            <i className="flaticon-right-arrow"></i>
            Save <span></span>
            <span></span>{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
