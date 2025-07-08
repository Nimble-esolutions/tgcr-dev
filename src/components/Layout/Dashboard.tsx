"use client";

import React from "react";
import { User } from "@prisma/client";
import { DashboardCard, DashboardCardProps } from "@/components/Layout/DashboardCard";
import styles from "./css/Dashboard.module.css";

interface DashboardProps {
	lang: string;
	currentUser: User;
	dashboardCardList: DashboardCardProps[];
	dashboardDict: { [key: string]: string };
}

const Dashboard = ({ lang, currentUser, dashboardCardList, dashboardDict }: DashboardProps) => {
	return (
		<div className="subnav-form">
			<div className={styles["dashboard-grid"]}>
				{dashboardCardList.length > 0 ? (
					dashboardCardList.map((cardProps, index) => (
						<DashboardCard
							key={"dashboardcard-" + index}
							icon={cardProps.icon}
							label={cardProps.label}
							url={cardProps.url}
							valid={cardProps.valid}
							message={cardProps.message}
						/>
					))
				) : (
					<p>{""}</p>
				)}
			</div>
		</div>
	);
};

export { Dashboard };
