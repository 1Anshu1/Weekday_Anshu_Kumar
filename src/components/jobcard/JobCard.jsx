import styles from "./jobcard.module.css";
import { useState } from "react";

const JobCard = ({ jobDetails }) => {
    const [viewMore, setViewMore] = useState(false);

    const handleViewMore = () => {
        setViewMore(!viewMore);
    };

    return (
        <div className={styles.jobcard}>
            <div className={styles.jobContainer}>
                <div className={styles.logoContainer}>
                    <img src={jobDetails?.logoUrl} alt="" className={styles.companyLogo} />
                    <div className={styles.jobInfo}>
                        <span className={styles.companyName}>{jobDetails?.companyName}</span>
                        <span className={styles.role}>{jobDetails?.jobRole}</span>
                        <span className={styles.location}>{jobDetails?.location}</span>
                    </div>
                </div>
                {/* handling null values in salary */}
                {(jobDetails?.minJdSalary || jobDetails?.maxJdSalary) && (
                    <div className={styles.salary}>
                        Estimated Salary:{" "}
                        {`${jobDetails?.salaryCurrencyCode} ${
                            jobDetails?.minJdSalary
                                ? jobDetails?.maxJdSalary
                                    ? `${jobDetails?.minJdSalary} - ${jobDetails?.maxJdSalary}`
                                    : `${jobDetails?.minJdSalary}`
                                : `${jobDetails?.maxJdSalary}`
                        } LPA ✅`}
                    </div>
                )}
                {jobDetails?.jobDetailsFromCompany && (
                    <div className="">
                        <h4 className="">Job Description:</h4>
                        <p className={viewMore ? styles.expanded : styles.description}>
                            {jobDetails?.jobDetailsFromCompany}
                        </p>
                        <p className={styles.viewMore} onClick={handleViewMore}>
                            {viewMore ? "View Less" : "View More"}
                        </p>
                    </div>
                )}
                {/* handling null value in experience */}
                {(jobDetails?.minExp || jobDetails?.maxExp) && (
                    <div className={styles.experienceContainer}>
                        <div className={styles.experienceHeading}>Experience Required</div>
                        <div className="">
                            {` ${
                                jobDetails?.minExp
                                    ? jobDetails?.maxExp
                                        ? `${jobDetails?.minExp} - ${jobDetails?.maxExp} years`
                                        : `${jobDetails?.minExp}`
                                    : `${jobDetails?.maxExp}`
                            }`}
                        </div>
                    </div>
                )}
            </div>
            <button className={styles.btnApply}>⚡Easy Apply</button>
        </div>
    );
};
export default JobCard;
