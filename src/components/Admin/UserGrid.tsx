"use client";

import React from "react";
import Link from "next/link";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Role, User, LessonRequest } from "@prisma/client";
import { ADMIN_SPAGE_SIZE } from "@/libs/constants";
import { UIDate } from "@/utils/dateUtils";
import Button from "@mui/material/Button";
import styles from "./css/UserGrid.module.css";

interface UserGridProps {
	lang: string;
	users: User[];
	currentUser: User;
	adminUserMgmtDict: { [key: string]: string };
}

const UserGrid: React.FC<UserGridProps> = ({ lang, currentUser, users, adminUserMgmtDict }) => {
	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: adminUserMgmtDict.displayName,
			width: 150,
			sortable: true,
			filterable: true,
		},
		{ field: "firstName", headerName: adminUserMgmtDict.firstName, width: 130 },
		{ field: "middleName", headerName: adminUserMgmtDict.middleName, width: 130 },
		{ field: "lastName", headerName: adminUserMgmtDict.lastName, width: 130 },
		{ field: "email", headerName: adminUserMgmtDict.email, width: 200 },
		{ field: "gender", headerName: adminUserMgmtDict.gender, width: 100 },
		{
			field: "dob",
			headerName: adminUserMgmtDict.dob,
			width: 130,
			valueGetter: (value) => value && UIDate(value),
		},
		{
			field: "details",
			headerName: "",
			width: 100,
			sortable: false,
			filterable: false,
			renderCell: (params: GridRenderCellParams<any, User>) => (
				<>
					{/* <Link href={`/${params.row.id}/details`} passHref className="default-btn mt-2">
						<Button variant="contained" size="small">
							Details
						</Button>
					</Link> */}
					<Link href={`/${lang}/profile/personal?id=${params.row.id}`}>
						<Button variant="contained" size="small">
							{adminUserMgmtDict.details}
						</Button>
					</Link>
				</>
			),
		},
	];

	return (
		<div className={styles["grid-style"]}>
			<DataGrid
				rows={users}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { pageSize: ADMIN_SPAGE_SIZE, page: 0 },
					},
				}}
				pageSizeOptions={[10, 25, 50]}
				disableRowSelectionOnClick
				sx={{
					".MuiDataGrid-columnSeparator": {
						display: "none",
					},
					"& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaderTitle": {
						fontWeight: "bold",
						color: "#3877B0",
					},
				}}
			/>
		</div>
	);
};

export { UserGrid };
