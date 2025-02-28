import { getMapItemDetail, hexInfo, HexKeysUnion } from "@/consts/foxhole";
import {
  MapDynamic,
  MapItem,
} from "@/types/warData";
import {
  Stage,
  Layer,
  Image,
} from "react-konva";
import useImage from "use-image";
import URLImage from "../URLImage";
import { ImageConfig } from "konva/lib/shapes/Image";

const iconSize = 24;

type PropsRegion = {
  hex: HexKeysUnion,
  width?: number,
  height?: number
  data: MapDynamic & {
    mapItems: (MapItem & Partial<ImageConfig>)[]
  },
};

const mapItemBasePath = '/foxhole-web-utils/images/MapIcons';

function MapItemImage({ mapItem, iconSize, hexWidth, hexHeight }: { mapItem: MapItem & Partial<ImageConfig>, iconSize: number, hexWidth: number, hexHeight: number }) {
  const detail = getMapItemDetail(mapItem.iconType);

  // TODO: need to find a non-hook approach
  const src = !detail.iconFunc
      ? `${mapItemBasePath}/MapIconUNKNOWN.png`
      : `${mapItemBasePath}/${detail.iconFunc(mapItem.teamId)}.png`;

  if (!detail?.iconFunc) {
    console.warn(`Was unable to render Map Item`, mapItem);
    return null;
  }

  // console.log(`Render ${detail.iconFunc(mapItem.teamId)}`, mapItem);
  
  // TODO: shift icons by 50% their width and

  return (
    <URLImage
      {...mapItem}
      src={src}
      x={mapItem.x * hexWidth}
      y={mapItem.y * hexHeight}
      width={mapItem.width ?? iconSize}
      height={mapItem.height ?? iconSize}
      alt={detail.name ?? detail.friendlyName}
    />
  )

  // return (
  //   <Image
  //     image={image}
  //     x={mapItem.x * hexWidth}
  //     y={mapItem.y * hexHeight}
  //     width={iconSize}
  //     height={iconSize}
  //     alt={detail.name ?? detail.friendlyName}
  //   />
  // )
}

function MapItemImages({ mapItems, iconSize, hexWidth, hexHeight }: { mapItems: (MapItem & Partial<ImageConfig>)[], iconSize: number, hexWidth: number, hexHeight: number }) {
  return mapItems.map(mapItem => {
    const key = `${mapItem.iconType}_${mapItem.x}_${mapItem.y}`;
    if (key === '38') {
      console.log('key', key, mapItem);
    }
    return (
      <MapItemImage
        key={key}
        mapItem={mapItem}
        iconSize={iconSize}
        hexWidth={hexWidth}
        hexHeight={hexHeight}
      />
    )
  });
}

export default function Region(props: PropsRegion) {
  const {
    hex,
    data,
    width = 500,
    height = 500,
  } = props;
  
  console.log('Region', { data });
  const [image] = useImage(`/foxhole-web-utils/images/Maps/${hexInfo[hex]?.icon}.png`);
  
  return (
    <Stage width={width} height={height} style={{ border: '1px solid gainsboro' }}>
      <Layer>
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          alt="MapCallumsCapeHex"
        />

        <MapItemImages
          mapItems={data.mapItems}
          iconSize={iconSize}
          hexWidth={width}
          hexHeight={height}
        />

      </Layer>
    </Stage>
  );
}