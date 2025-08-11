import Link from "next/link";
import styles from "./css/Dashboard.module.css";

interface DashboardCardProps {
	// generic props for the widget
	icon: string;
	label: string;
	url: string;
	valid: boolean;
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
						{valid ? (
							<i className={`${styles["valid"]} fa-solid fa-check`}></i>
						) : (
							<i className={`${styles["invalid"]} fa-solid fa-xmark`}></i>
						)}
						{message && <span className={styles["message"]}>{message}</span>}
					</div>
				</div>
			</div>
		</div>
	);
}

export type { DashboardCardProps };
export { DashboardCard };
