import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Typography
          variant="h1"
        >
          Foxhole Web Utils
        </Typography>

        <Box>
          <Link
            href={`/tools/resources-compare`}
          >
            Compare War Resource Layouts
          </Link>
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
