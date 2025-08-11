"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "@/components/FormHelpers/Input";

const CreateForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isLoading, isValid },
	} = useForm({
		defaultValues: {
			name: "",
		},
	});
	const onSubmit = async (data) => {
		try {
			const url = `/api/admin/categories`;

			const response = await axios.post(url, data);
			toast.success(response.data.message);
			router.push("/admin/categories");
		} catch (err) {
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="row">
				<div className="col-md-12">
					<Input
						label="Category Name"
						id="name"
						disabled={isLoading}
						register={register}
						errors={errors}
					/>
				</div>

				<div className="col-12">
					<button
						type="submit"
						className="default-btn"
						disabled={!isValid || isLoading}
					>
						<i className="flaticon-right-arrow"></i>
						Add Category <span></span>
					</button>
				</div>
			</div>
		</form>
	);
};

export default CreateForm;
