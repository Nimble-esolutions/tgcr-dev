"use client";

import Select from "react-select";

const access_values = [
	{ value: "Lifetime", label: "Lifetime" },
	{ value: "Three_Months", label: "Three Months" },
	{ value: "Six_Months", label: "Six Months" },
	{ value: "One_Year", label: "One Year" },
];

const AccessTime = ({ label, value, onChange }) => {
	const selectedOption = access_values.find(
		(category) => category.value === value
	);

	return (
		<div className="form-gorup">
			<label>{label}</label>
			<Select
				placeholder="Select"
				required
				isClearable
				isSearchable={true}
				options={access_values}
				value={selectedOption || value}
				onChange={(value) => onChange(value)}
				formatOptionLabel={(option) => (
					<div className="flex flex-row items-center gap-3">
						<div>{option.label}</div>
					</div>
				)}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: "green",
						primary25: "#ffe4e6",
					},
				})}
			/>
		</div>
	);
};

export default AccessTime;
