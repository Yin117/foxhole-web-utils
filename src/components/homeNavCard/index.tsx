import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type PropsHomeNavCard = {
  imagePath?: string,
  label: string,
  subtext?: string,
  navPath: string,
}

export function HomeNavCard(props: PropsHomeNavCard) {
  const {
    imagePath,
    label,
    subtext,
    navPath,
  } = props;

  return (
    <Card
      raised
    >
      <Link
        href={navPath}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {label}
          </Typography>
          {(subtext?.length ?? 0) > 0 &&
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {subtext}
          </Typography>}
        </CardContent>
        {imagePath &&
        <Image
          alt={label}
          src={imagePath}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} // optional
        />}
      </Link>
    </Card>
  );
}