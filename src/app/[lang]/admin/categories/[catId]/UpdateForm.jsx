"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "@/components/FormHelpers/Input";

const UpdateForm = ({ category }) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isLoading, isValid },
	} = useForm({
		defaultValues: {
			name: "",
		},
	});

	useEffect(() => {
		setValue("name", category.name);
	}, [category, setValue]);

	const onUpdate = async (data) => {
		try {
			const url = `/api/admin/categories/${category.id}`;
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
		<form onSubmit={handleSubmit(onUpdate)}>
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
					<button type="submit" className="btn default-btn">
						<i className="flaticon-right-arrow"></i>
						Update <span></span>
					</button>
				</div>
			</div>
		</form>
	);
};

export default UpdateForm;
