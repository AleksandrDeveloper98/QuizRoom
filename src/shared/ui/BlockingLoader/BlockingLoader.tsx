import Spinner from "../Spinner";
import "./BlockingLoader.scss";

const BlockingLoader = () => {
  return (
    <div className="blocking-loader">
      <Spinner size="large" />
    </div>
  );
};

export default BlockingLoader;
