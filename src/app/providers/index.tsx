import { PropsWithChildren } from "react";
import { ProviderUseQuery } from "./ProviderUseQuery";






export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ProviderUseQuery>
        {children}
      </ProviderUseQuery>
    </>
  )
}