import PageLoader from "@/shared/ui/PageLoader";
import { Suspense, type ReactNode } from "react";

type TPageSuspenseProps = {
  children: ReactNode;
};

const PageSuspense = ({ children }: TPageSuspenseProps) => {
  return <Suspense fallback={<PageLoader fullscreen />}>{children}</Suspense>;
};

export default PageSuspense;
