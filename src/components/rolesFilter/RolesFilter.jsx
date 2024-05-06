// import { useState } from "react";
// import styles from "./rolesFilter.module.css";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Chip from "@mui/material/Chip";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 18;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// function getStyles(name, personName, theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
//     };
// }

// const handleDelete = () => {};

// export default function MultipleSelectChip({ roles }) {
//     const theme = useTheme();
//     const [personName, setPersonName] = useState([]);

//     const handleChange = (event) => {
//         const {
//             target: { value },
//         } = event;
//         setPersonName(
//             // On autofill we get a stringified value.
//             typeof value === "string" ? value.split(",") : value
//         );
//     };

//     return (
//         <div>
//             <FormControl sx={{ m: 1, width: 300 }}>
//                 <p className={roles.length === 0 ? styles.hideLabel : styles.showLabel}>Roles</p>
//                 <Select
//                     multiple
//                     value={personName}
//                     onChange={handleChange}
//                     renderValue={(selected) => (
//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                             {selected.map((value) => (
//                                 <Chip key={value} label={value} onDelete={handleDelete} />
//                             ))}
//                         </Box>
//                     )}
//                     MenuProps={MenuProps}
//                 >
//                     <MenuItem value="none" style={{ display: "none" }}>
//                         Roles
//                     </MenuItem>
//                     {roleData.map((name) => (
//                         <MenuItem key={name} value={roles} style={getStyles(name, personName, theme)}>
//                             {name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         </div>
//     );
// }

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
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
