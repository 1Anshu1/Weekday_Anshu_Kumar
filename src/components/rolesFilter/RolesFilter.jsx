import { useState } from "react";
import styles from "./rolesFilter.module.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { roleData } from "../../constants/constant";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function RolesFilter({ roles, setRoles }) {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                minWidth: 250,
            },
        },
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRoles(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleDelete = (e, value) => {
        e.preventDefault();
        setRoles(roles.filter((item) => item !== value));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
                <p className={roles.length === 0 ? styles.hideLabel : styles.showLabel}>Roles</p>
                <Select
                    multiple
                    displayEmpty
                    value={roles}
                    onChange={handleChange}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <div>Roles</div>;
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
                    {roleData.map((role) => (
                        <MenuItem key={role} value={role} className={styles.role}>
                            {role}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
