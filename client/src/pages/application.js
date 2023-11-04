import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { getApplications } from "@/services/application";
import Application from "@/components/Application";
import styles from "@/styles/ApplicationPage.module.css";

const ApplicationPage = () => {
	const { user } = useContext(UserContext);
	const [applications, setApplications] = useState([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const fetchApplications = async () => {
			if (user && user.email) {
				setLoading(true);
				const response = await getApplications(user.email);
				setApplications(response);
				setLoading(false);
			}
		};

		fetchApplications();
	}, [user]);

	if (isLoading) {
		return <p>Loading your applications...</p>;
	}

	if (!user) {
		return <p>Please log in to see your applications.</p>;
	}

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Applications</h2>
			<div>
				{applications.map((application, index) => (
					<Application application={application} index={index} />
				))}
			</div>
		</div>
	);
};

export default ApplicationPage;
