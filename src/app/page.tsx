import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import { HomeNavCard } from "@/components/homeNavCard";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Typography
          variant="h3"
        >
          Welcome,
        </Typography>

        <Typography>
          Below are cards that will take you to various areas of the app, at the moment there
          {' '}is one feature, but more may turn up on request to
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
