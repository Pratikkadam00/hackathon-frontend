import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { useEventsStore } from "../store/events.store";
import { useLoginStore } from "../store/login.store";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  date: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in the format DD/MM/YYYY")
    .required("Date is required"),
  attendees: yup.array().min(1, "At least one attendee is required"),
});

const EventForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.attendees?.map((att) => att.value));
    data.attendees = data.attendees?.map((att) => att.value);
    data.date = new Date(data.date);
    addEvent(data);
    reset();
    navigate("/dashboard/events");
  };

  const { attendees, getAttendees, addEvent } = useEventsStore();

  useEffect(() => {
    getAttendees();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
      <h1 className=" font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-2">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium text-sm"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className={`w-full p-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium text-sm"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className={`w-full p-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-medium text-sm"
          >
            Date (MM/DD/YYYY)
          </label>
          <input
            type="text"
            id="date"
            {...register("date")}
            className={`w-full p-2 border ${
              errors.date ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs">{errors.date.message}</p>
          )}
        </div>

        {/* Attendees */}
        <div className="mb-4">
          <label
            htmlFor="attendees"
            className="block text-gray-700 font-medium text-sm"
          >
            Attendees
          </label>
          <Controller
            name="attendees"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={attendees?.map((att) => ({
                  value: att?._id,
                  label: att?.name,
                }))}
                isMulti
                className={`w-full text-black ${
                  errors.attendees ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.attendees && (
            <p className="text-red-500 text-sm">{errors.attendees.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
