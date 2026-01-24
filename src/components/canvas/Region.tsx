import { factionForKey, factions, getMapItemDetail, hexInfo, HexKeysUnion } from "@/consts/foxhole";
import {
  MapDynamic,
  MapItem,
} from "@/types/warData";
import {
  Stage,
  Layer,
  Image,
  Circle,
  Text,
} from "react-konva";
import useImage from "use-image";
import URLImage from "../URLImage";
import { ImageConfig } from "konva/lib/shapes/Image";
import { mapItemBasePath } from "@/consts/repo";
import { KonvaEventObject } from "konva/lib/Node";

const defaultIconSize = 24;

export type Positioning = {
  scale: number,
  x: number,
  y: number,
}

type PropsRegion = {
  hex: HexKeysUnion,
  width?: number,
  height?: number,
  stage?: Partial<Positioning>,
  onPositioning?: (positioning: Positioning) => void,
  data: MapDynamic & {
    mapItems: (MapItem & Partial<ImageConfig>)[]
  },
};

type MapItemArg  = { mapItem: MapItem & Partial<ImageConfig>, iconSize: number, hexWidth: number, hexHeight: number, scale: number };
type MapItemsArg = { mapItems: (MapItem & Partial<ImageConfig>)[], iconSize: number, hexWidth: number, hexHeight: number, scale: number };
function MapItemImage({ mapItem, iconSize, hexWidth, hexHeight, scale }: MapItemArg) {

  const detail = getMapItemDetail(mapItem.iconType);

  if (detail?.iconFunc == undefined) {
    const faction = factionForKey(mapItem.teamId);
    return (
      <>
        <Circle
          x={(mapItem.x * hexWidth)}
          y={(mapItem.y * hexHeight)}
          radius={iconSize / 2}
          alt={`UNK: ${mapItem.iconType}`}
          fill={faction?.[1].fill ?? '#FF0000'}
        />
        <Text
          x={(mapItem.x * hexWidth) - (iconSize / 2)}
          y={(mapItem.y * hexHeight) - (iconSize / 2)}
          width={iconSize}
          height={iconSize}
          text={`${mapItem.iconType}`}
          fontSize={12 / scale}
          align="center"
          verticalAlign="middle"
        />
      </>
    )
  }

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

  const rgb = factionForKey(mapItem.teamId)?.[1] ?? { };

  const width = mapItem.width ?? iconSize;
  const height = mapItem.height ?? iconSize;
  return (
    <URLImage
      {...mapItem}
      src={src}
      x={(mapItem.x * hexWidth) - (width / 2)}
      y={(mapItem.y * hexHeight) - (height / 2)}
      width={width}
      height={height}
      alt={detail.name ?? detail.friendlyName}
      {...rgb}
    />
  )
}

function MapItemImages({ mapItems, iconSize, hexWidth, hexHeight, scale }: MapItemsArg) {
  if (mapItems == null) {
    return null;
  }
  return mapItems.map(mapItem => {
    const key = `${mapItem.iconType}_${mapItem.x}_${mapItem.y}`;
    if (key === '38') {
      console.log('key', key, mapItem);
    }
    return (
      <MapItemImage
        key={key}
        mapItem={mapItem}
        scale={scale}
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
    stage,
    onPositioning,
  } = props;

  const scale = stage?.scale ?? 1;
  const x = stage?.x ?? 0;
  const y = stage?.y ?? 0;

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.08; // 1.02;
    const stage = e.target.getStage();
    if (onPositioning == null || stage == null || stage.getPointerPosition == null) {
      return;
    }
    const pos = stage.getPointerPosition();
    if (pos == null) {
      return;
    }
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: pos.x / oldScale - stage.x() / oldScale,
      y: pos.y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    onPositioning({
      scale: newScale,
      x: (pos.x / newScale - mousePointTo.x) * newScale,
      y: (pos.y / newScale - mousePointTo.y) * newScale
    });
  };

  
  console.log(`Region (${data?.mapItems?.length} Map Items)`, { data });
  const [image] = useImage(`/foxhole-web-utils/images/Maps/${hexInfo[hex]?.icon}.png`);
  
  return (
    <Stage
      width={width}
      height={height}
      style={{ border: '1px solid gainsboro' }}
      onWheel={handleWheel}
      scaleX={scale}
      scaleY={scale}
      x={x}
      y={y}
    >
      <Layer>
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          alt={hex}
        />

        <MapItemImages
          mapItems={data.mapItems}
          iconSize={defaultIconSize / scale}
          hexWidth={width}
          hexHeight={height}
          scale={scale}
        />

      </Layer>
    </Stage>
  );
}