import { useState, useEffect } from "react";
import JobCard from "../../components/jobcard/JobCard";
import styles from "./jobs.module.css";
import { minSalary } from "../../constants/constant";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredjobs, setFilteredjobs] = useState([]);
    const [minBasePay, setMinBasePay] = useState("none");

    const handleMinBasePay = (e) => {
        setMinBasePay(e.target.value);
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
        limit: 10,
        offset: 0,
    });

    const handleFilter = () => {
        let temp = [];
        if (minBasePay !== "none") {
            temp = jobs.filter((job) => job.minJdSalary >= minBasePay);
            setFilteredjobs(temp);
        }
    };

    useEffect(() => {
        handleFilter();
    }, [minBasePay]);

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
        <div className="">
            <div className={styles.filter}>
                <Box sx={{ minWidth: 240 }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        {minBasePay !== "none" && <p className="">Min Base Pay</p>}
                        <Select value={minBasePay} onChange={handleMinBasePay}>
                            <MenuItem value="none" style={{ display: "none" }}>
                                Minimum Base Pay
                            </MenuItem>
                            {minSalary.map((item, idx) => (
                                <MenuItem key={idx} value={item}>
                                    {`${item}L`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div className={styles.jobs}>
                {filteredjobs.length > 0
                    ? filteredjobs?.map((job) => <JobCard key={job.jdUid} jobDetails={job} />)
                    : jobs?.map((job) => <JobCard key={job.jdUid} jobDetails={job} />)}
            </div>
        </div>
    );
};
export default Jobs;
