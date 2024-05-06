import { useState, useEffect } from "react";
import JobCard from "../../components/jobcard/JobCard";
import styles from "./jobs.module.css";
import { experienceData, minSalary } from "../../constants/constant";
import RolesFilter from "../../components/rolesFilter/RolesFilter";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RemoteFilter from "../../components/remoteFilter/RemoteFilter";
import LocationFilter from "../../components/location/LocationFilter";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredjobs, setFilteredjobs] = useState([]);
    const [minBasePay, setMinBasePay] = useState("none");
    const [experience, setExperience] = useState("none");
    const [roles, setRoles] = useState([]);
    const [remote, setRemote] = useState([]);
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);

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
        offset: offset,
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
        if (roles.length !== 0) {
            temp =
                temp.length === 0
                    ? jobs.filter((job) => roles.includes(job.jobRole))
                    : temp.filter((job) => roles.includes(job.jobRole));
        }
        if (remote.length === 1) {
            temp =
                temp.length === 0
                    ? jobs.filter((job) =>
                          remote[0] === "remote" ? job.location === "remote" : job.location !== "remote"
                      )
                    : temp.filter((job) =>
                          remote[0] === "remote" ? job.location === "remote" : job.location !== "remote"
                      );
        }
        if (location.length !== 0) {
            temp =
                temp.length === 0
                    ? jobs.filter((job) => location.includes(job.location))
                    : temp.filter((job) => location.includes(job.location));
        }
        setFilteredjobs(temp);
    };

    useEffect(() => {
        handleFilter();
    }, [minBasePay, experience, roles, remote, location, jobs]);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
    };

    useEffect(() => {
        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
            .then((response) => response.json())
            .then((result) => setJobs([...jobs, ...result.jdList]))
            .catch((error) => console.error(error));
    }, [offset]);

    // Infinite Scrolling and reducing api call using debouncing

    function debounce(func, delay) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func();
            }, delay);
        };
    }

    function handleScroll() {
        if (
            document.documentElement.scrollTop + document.documentElement.clientHeight + 50 >=
            document.documentElement.scrollHeight
        ) {
            setOffset((prev) => prev + 10);
            setLoading(true);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", debounce(handleScroll, 500));
        return () => {
            window.removeEventListener("scroll", debounce(handleScroll, 500));
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <RolesFilter roles={roles} setRoles={setRoles} />
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
                <LocationFilter location={location} setLocation={setLocation} />
                <RemoteFilter remote={remote} setRemote={setRemote} />
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
                {minBasePay !== "none" ||
                experience !== "none" ||
                roles.length > 0 ||
                remote.length > 0 ||
                location.length > 0 ? (
                    filteredjobs.length > 0 ? (
                        filteredjobs?.map((job) => <JobCard key={job.jdUid} jobDetails={job} />)
                    ) : (
                        <div className={styles.nojob}>No Jobs available for this category at the moment</div>
                    )
                ) : jobs.length > 0 ? (
                    jobs?.map((job) => <JobCard key={job.jdUid} jobDetails={job} />)
                ) : (
                    <div className={styles.nojob}>No Jobs available for this category at the moment</div>
                )}

                <div className="loader-container">{loading && <div className="loader"></div>}</div>
            </div>
        </div>
    );
};
export default Jobs;
