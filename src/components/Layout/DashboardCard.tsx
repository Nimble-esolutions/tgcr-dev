<<<<<<< HEAD
=======
import React from "react";
>>>>>>> origin/admin
import Link from "next/link";
import styles from "./css/Dashboard.module.css";

interface DashboardCardProps {
	// generic props for the widget
	icon: string;
	label: string;
	url: string;
<<<<<<< HEAD
	valid: boolean;
=======
	valid: boolean | null;
>>>>>>> origin/admin
	message?: string;
}

function DashboardCard({ icon, label, url, valid, message }: DashboardCardProps) {
	return (
		<div className={styles["dashboard-card"]}>
			<div className={styles["row"]}>
				<div className={`${styles["column"]}`}>
					<div>
						<Link href={url} className={styles["action-link"]}>
							{icon && <i className={icon}></i>}
							{label && <span className={styles["label"]}>{" " + label}</span>}
						</Link>
<<<<<<< HEAD
						{valid ? (
=======
						{valid === null ? (
							" " // valid is null, so we don't show any icon
						) : valid ? (
>>>>>>> origin/admin
							<i className={`${styles["valid"]} fa-solid fa-check`}></i>
						) : (
							<i className={`${styles["invalid"]} fa-solid fa-xmark`}></i>
						)}
<<<<<<< HEAD
						{message && <span className={styles["message"]}>{message}</span>}
=======
						{message && (
							<span className={styles["message"]}>
								{message.split("\n").map((line, idx) => (
									<React.Fragment key={idx}>
										{line}
										<br />
									</React.Fragment>
								))}
							</span>
						)}
>>>>>>> origin/admin
					</div>
				</div>
			</div>
		</div>
	);
}

export type { DashboardCardProps };
export { DashboardCard };
