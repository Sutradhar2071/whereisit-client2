import Lottie from "lottie-react";
import loadingAnim from "../assets/loading.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Lottie animationData={loadingAnim} loop={true} className="w-72 h-72" />
    </div>
  );
};

export default Loading;
