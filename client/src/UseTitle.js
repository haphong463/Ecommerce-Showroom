import { useEffect } from "react";

export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "AutoCar | " + title;
    return () => {
      document.title = prevTitle;
    };
  });
}
