'use client';

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCurrentWarState } from "@/apiFunctions/foxhole/war";

export function ApplicationBar() {

  const {
    data,
  } = useQuery({
    queryKey: ['CurrentWar'],
    queryFn: async () => {
      return await getCurrentWarState();
    },
    enabled: true,
  });

  // console.log('data', data);
  const warNumber = data?.data.warNumber;
  const isResistancePhase = !!data?.data.resistanceStartTime;


  return (
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Typography variant="h6">
            Foxhole Web Utils
          </Typography>
        </Link>
        {warNumber && (
          <Typography marginLeft={2}>
            WC{warNumber}{isResistancePhase ? ' (Resistance Phase)' : ''}
          </Typography>
        )}
        <Box marginLeft="auto">
          <Image
            aria-hidden
            src="/foxhole-web-utils/images/FoxholeBotImage.png"
            alt="Foxhole Bot Image"
            width={52}
            height={52}
            style={{
              borderRadius: '50%',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}