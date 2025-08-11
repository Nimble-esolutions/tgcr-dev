"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ParseTime } from "@/utils/dateUtils";
import Input from "@/components/FormHelpers/Input";
import SelectTime from "../FormHelpers/SelectTime";
import Checkbox from "../FormHelpers/Checkbox";

const CalendarWeeklyForm = ({ lang, currentUser, dict }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      lang: "en",
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const monday = watch("monday");
  const tuesday = watch("tuesday");
  const wednesday = watch("wednesday");
  const thursday = watch("thursday");
  const friday = watch("friday");
  const saturday = watch("saturday");
  const sunday = watch("sunday");

  useEffect(() => {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    setValue("startTime", "09:00 AM");
    setValue("endTime", "01:00 PM");
    setValue("monday", true);
    setValue("tuesday", true);
    setValue("wednesday", true);
    setValue("thursday", true);
    setValue("friday", true);
    setValue("startDate", today.toISOString().split("T")[0]);
    setValue("endDate", nextYear.toISOString().split("T")[0]);
  }, [setValue]);

  useEffect(() => {
    // set error if start time is greater than end time
    if (startTime && endTime) {
      const start = ParseTime(startTime);
      const end = ParseTime(endTime);

      if (end <= start) {
        setError("endTime", {
          type: "manual",
          message: dict.endTimeE1,
        });
      } else {
        clearErrors("endTime");
      }
    }
  }, [startTime, endTime, clearErrors, setError, dict]);

  useEffect(() => {
    if (
      !monday &&
      !tuesday &&
      !wednesday &&
      !thursday &&
      !friday &&
      !saturday &&
      !sunday
    ) {
      setError("sunday", {
        type: "manual",
        message: dict.daysE1,
      });
    } else {
      clearErrors("sunday");
    }
  }, [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    clearErrors,
    setError,
    dict,
  ]);

  const onSubmit = async (data) => {
    console.log(data);
    // setIsLoading(true);
    // await axios
    // 	.post("/api/profile/personal", {
    // 		...data,
    // 		lang,
    // 	})
    // 	.then((response) => {
    // 		toast.success(profilePersonal.success);
    // 	})
    // 	.catch((error) => {
    // 		toast.error(error.message);
    // 	})
    // 	.finally(() => {});
    // setIsLoading(false);
  };

  return (
    <div className="subnav-form">
      <p>{dict.pageTitleH}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <label className="input-label">{dict.days}</label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Checkbox
              id="monday"
              label={dict.monday}
              helptext={""}
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{}}
              watch={watch}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <Checkbox
              id="tuesday"
              label={dict.tuesday}
              helptext={""}
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{}}
              watch={watch}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <Checkbox
              id="wednesday"
              label={dict.wednesday}
              helptext={""}
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{}}
              watch={watch}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <Checkbox
              id="thursday"
              label={dict.thursday}
              helptext={""}
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{}}
              watch={watch}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <Checkbox
              id="friday"
              label={dict.friday}
              helptext={""}
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{}}
              watch={watch}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <Checkbox
              id="saturday"
              label={dict.saturday}
              helptext={""}
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{}}
              watch={watch}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <Checkbox
              id="sunday"
              label={dict.sunday}
              helptext={""}
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{}}
              watch={watch}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <SelectTime
              id="startTime"
              label={dict.startTime}
              helptext={dict.startTimeH}
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{}}
              watch={watch}
              setValue={setValue}
            />
          </div>
          <div className="col-md-6">
            <SelectTime
              id="endTime"
              label={dict.endTime}
              helptext={dict.endTimeH}
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{}}
              watch={watch}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Input
              id="startDate"
              label={dict.startDate}
              helptext={dict.startDateH}
              type="date"
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{
                required: dict.mandatoryInput,
              }}
              watch={watch}
              setValue={setValue}
            />
          </div>
          <div className="col-md-6">
            <Input
              id="endDate"
              label={dict.endDate}
              helptext={dict.endDateH}
              type="date"
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={{
                required: dict.mandatoryInput,
                validate: (value) => {
                  const start = new Date(startDate);
                  const end = new Date(value);
                  const oneYearLater = new Date(start);
                  oneYearLater.setFullYear(start.getFullYear() + 1);

                  return end <= oneYearLater || dict.endDateE1;
                },
              }}
              watch={watch}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="col-12">
          <button type="submit" disabled={isLoading}>
            {isLoading ? dict.pleaseWait : dict.confirmBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalendarWeeklyForm;
