import clsx from "clsx";
import Spinner from "../Spinner";
import type { TPageLoaderProps } from "./types";

import "./PageLoader.scss";

const PageLoader = (props: TPageLoaderProps) => {
  const { fullscreen = false } = props;

  return (
    <div
      className={clsx("page-loader", fullscreen && "page-loader--fullscreen")}
    >
      <Spinner size="large" />
    </div>
  );
};

export default PageLoader;
