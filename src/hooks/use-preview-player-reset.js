import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setPreviewPlayerSliceData, useStopPlayerMutation } from "../store";

const usePreviewPlayerReset = () => {
  const location = useLocation();
  const [stopPlayer] = useStopPlayerMutation();
  useEffect(() => {
    stopPlayer({
      setPreviewPlayerSliceData,
    });
  }, [location, stopPlayer]);
};
export default usePreviewPlayerReset;
