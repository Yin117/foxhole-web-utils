'use client'

// import MetaHeatmap from "@/components/pages/metaHeatmap"
import dynamic from "next/dynamic"

const MetaHeatmap = dynamic(() => import('@/components/pages/metaHeatmap'), {
  ssr: false,
});

export default function PageMetaHeatmap() {
  return <MetaHeatmap/>
}
