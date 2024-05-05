import { useState, useEffect } from "react";
import JobCard from "../../components/jobcard/JobCard";
import styles from "./jobs.module.css";
import { experienceData, minSalary } from "../../constants/constant";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredjobs, setFilteredjobs] = useState([]);
    const [minBasePay, setMinBasePay] = useState("none");
    const [experience, setExperience] = useState("none");

    const handleMinBasePay = (e) => {
        setMinBasePay(e.target.value);
    };

    const handleExperience = (e) => {
        setExperience(e.target.value);
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
        }
        if (experience !== "none") {
            temp =
                temp.length === 0
                    ? jobs.filter((job) => job.minExp <= experience)
                    : temp.filter((job) => job.minExp <= experience);
        }
        setFilteredjobs(temp);
    };

    useEffect(() => {
        handleFilter();
    }, [minBasePay, experience]);

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
                <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <p className={experience === "none" ? styles.hideLabel : styles.showLabel}>Experience</p>
                        <Select value={experience} onChange={handleExperience}>
                            <MenuItem value="none" style={{ display: "none" }}>
                                Experience
                            </MenuItem>
                            {experienceData.map((item, idx) => (
                                <MenuItem key={idx} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <p className={minBasePay === "none" ? styles.hideLabel : styles.showLabel}>Min Base Pay</p>
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
