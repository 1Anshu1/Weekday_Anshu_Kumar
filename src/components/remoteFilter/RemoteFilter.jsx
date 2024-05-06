import styles from "./remoteFilter.module.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function RemoteFilter({ remote, setRemote }) {
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
        setRemote(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleDelete = (e, value) => {
        e.preventDefault();
        setRemote(remote.filter((item) => item !== value));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <p className={remote.length === 0 ? styles.hideLabel : styles.showLabel}>Remote</p>
                <Select
                    multiple
                    displayEmpty
                    value={remote}
                    onChange={handleChange}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <div>Remote</div>;
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
                    <MenuItem value={"remote"} className={styles.role}>
                        Remote
                    </MenuItem>
                    <MenuItem value={"onsite"} className={styles.role}>
                        Onsite
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
