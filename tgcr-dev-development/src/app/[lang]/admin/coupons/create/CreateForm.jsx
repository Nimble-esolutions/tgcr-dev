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
			code: "",
			discount: 0.0,
		},
	});
	const onSubmit = async (data) => {
		try {
			const url = `/api/admin/coupons`;

			const response = await axios.post(url, data);
			toast.success(response.data.message);
			router.push("/admin/coupons");
			router.refresh();
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
				<div className="col-md-6">
					<Input
						label="Coupon Code"
						id="code"
						disabled={isLoading}
						register={register}
						errors={errors}
					/>
				</div>

				<div className="col-md-6">
					<Input
						label="Discount (ex: 9.9)"
						id="discount"
						disabled={isLoading}
						register={register}
						errors={errors}
						type="number"
					/>
				</div>

				<div className="col-12">
					<button
						type="submit"
						className="default-btn"
						disabled={!isValid}
					>
						<i className="flaticon-right-arrow"></i>
						Create Coupon <span></span>
					</button>
				</div>
			</div>
		</form>
	);
};

export default CreateForm;
