"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import { HomeNavCard } from "@/components/homeNavCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (isClient === false) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Typography
          variant="h3"
        >
          Welcome,
        </Typography>

        <Typography>
          Below are cards that will take you to various areas of the app, more features, may turn up, e.g. on request to
          {' '}<span style={{ fontWeight: 'bold' }}>Yinoguns</span> on Discord, or
          {' '}<a className={styles.hyperlink} href="https://github.com/Yin117/foxhole-web-utils/tree/main" target="_blank">clone the repo</a> and submit your own Pull Request with a new Feature or small changes!
          {' '}(Subject to Approval)
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          flexDirection="row"
          justifyContent="space-between"
          marginTop={5}
        >
          <Box maxWidth="30%">
            <HomeNavCard
              label="Compare War Resource Layouts"
              imagePath="/foxhole-web-utils/images/Concepts/App/CompareResources.png"
              navPath="/tools/resources-compare"
              subtext="Ever wanted to see the differnt layouts of resources between two wars?"
            />
          </Box>

          <Box maxWidth="30%">
            <HomeNavCard
              label="Platform Heatmap"
              imagePath="/foxhole-web-utils/images/Concepts/App/PlatformHeatmap.png"
              navPath="/tools/meta-heatmap"
              subtext="Curious how each faction tends to position their Storm Cannons?"
            />
          </Box>

          <Box maxWidth="30%">
            <HomeNavCard
              label="Meta Stats"
              imagePath="/foxhole-web-utils/images/Concepts/App/MetaStats.png"
              navPath="/tools/meta-stats"
              subtext="Want to know how many Storm Cannons, Intel Centers, and Rockets occured in a war?"
            />
          </Box>

        </Box>
      </main>
      <footer className={styles.footer}>
        <Typography variant="caption">
          Made with next.js
        </Typography>
        <Box display="flex" gap="2rem">
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/foxhole-web-utils/images/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/foxhole-web-utils/images/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/foxhole-web-utils/images/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </Box>
      </footer>
    </div>
  );
}
