import { useState, useEffect } from "react";
export const useInitialRender = () => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    if (!initialRenderComplete) setInitialRenderComplete(true);
  }, [initialRenderComplete]);

  return initialRenderComplete;
};