import { useState, useEffect } from "react";
import JobCard from "../../components/jobcard/JobCard";
import styles from "./jobs.module.css";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
        limit: 10,
        offset: 0,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
    };

    useEffect(() => {
        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
            .then((response) => response.json())
            .then((result) => setJobs(result.jdList))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className={styles.jobs}>{jobs && jobs?.map((job) => <JobCard key={job.jdUid} jobDetails={job} />)}</div>
    );
};
export default Jobs;
