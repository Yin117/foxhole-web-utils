'use client'

import styles from "@/app/page.module.css";
import { getMapDynamicForWar } from "@/utils/warData";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

export default function ResourcesCompare() {
  const [warNumber, setWarNumber] = useState("99");

  const mapDynamicData = useMemo(() => {
    return getMapDynamicForWar(warNumber);
  }, [warNumber]);

  // TODO: Refactor this into importing files from /pages
  // This will be made up of several components in order to simplifiy
  // the code and handle edge cases, such as if War Number picked is invalid
  
  return (
    <div className={styles.page}>
      <Box>
        <TextField
          select
          label="War Number"
          value={warNumber}
          onChange={({ target: { value } }) => {
            setWarNumber(value);
          }}
        >
          <MenuItem value="99">WC99</MenuItem>
          <MenuItem value="100">WC100</MenuItem>
          <MenuItem value="101">WC101</MenuItem>
        </TextField>
        {mapDynamicData &&
        <Typography>
          {JSON.stringify(mapDynamicData)}
        </Typography>}
      </Box>
    </div>
  );
}
