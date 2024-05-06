import styles from "./locationFilter.module.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { locationData } from "../../constants/constant";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function LocationFilter({ location, setLocation }) {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                minWidth: 120,
            },
        },
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setLocation(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleDelete = (e, value) => {
        e.preventDefault();
        setLocation(location.filter((item) => item !== value));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <p className={location.length === 0 ? styles.hideLabel : styles.showLabel}>Location</p>
                <Select
                    multiple
                    displayEmpty
                    value={location}
                    onChange={handleChange}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <div>Location</div>;
                        }
                        return (
                            <Box sx={{ display: "flex", gap: 1 }}>
                                {selected.map((value) => (
                                    <Chip
                                        key={value}
                                        label={value}
                                        onMouseDown={(event) => event.stopPropagation()}
                                        onDelete={(e) => handleDelete(e, value)}
                                        style={{ borderRadius: "10px" }}
                                    />
                                ))}
                            </Box>
                        );
                    }}
                    MenuProps={MenuProps}
                >
                    {locationData.map((location) => (
                        <MenuItem key={location} value={location} className={styles.role}>
                            {location}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
