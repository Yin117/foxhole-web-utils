import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type PropsHomeNavCard = {
  imagePath?: string,
  label: string,
  navPath: string,
}

export function HomeNavCard(props: PropsHomeNavCard) {
  const {
    imagePath,
    label,
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
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
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