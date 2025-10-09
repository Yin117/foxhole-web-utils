'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { PropsWithChildren } from "react";
import { ProviderUseQuery } from "./ProviderUseQuery";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "@/theme/theme";
import CssBaseline from '@mui/material/CssBaseline';






export function Providers({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider
    >
      <ProviderUseQuery>
        <ThemeProvider theme={createTheme(themeOptions)}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ProviderUseQuery>
    </AppRouterCacheProvider>
  )
}