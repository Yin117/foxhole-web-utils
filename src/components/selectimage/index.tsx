import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Image from "next/image";

type PropsSelectImage = {
  base: React.ComponentProps<typeof Select>
  options: Array<{
    value: string,
    text: string,
    src: string,
    width?: number,
    height?: number,
    alt?: string,
  }>
}

export function SelectImage(props: PropsSelectImage) {
  return (
    <Select
      {...props.base}
    >
      {props.options.map(({ text, src, width, height, alt, value }) => (
        <MenuItem key={text ?? alt} value={value}>
          <Image
            src={src}
            alt={alt ?? text}
            width={width ?? 20}
            height={height ?? 20}
          />
          <p>{text}</p>
        </MenuItem>
      ))}
      {/*<MenuItem>
        <Image
          alt="Colonial"
          width={20}
          height={20}
          src="/foxhole-web-utils/images/Factions/Colonial.png"
        />
        <p>Colonial</p>
      </MenuItem>*/}
    </Select>
  )  
}