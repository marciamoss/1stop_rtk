import { useState, useEffect } from "react";

function useFormatDate(actualDate) {
  const [rDate, setRDate] = useState("");

  useEffect(() => {
    if (actualDate) {
      const dt = new Date(`
        ${actualDate.substring(5, 7)}/${actualDate.substring(
        8,
        10
      )}/${actualDate.substring(0, 4)}`);
      const dte =
        dt.getDate().toString().length === 1
          ? `0${dt.getDate()}`
          : dt.getDate();
      setRDate(
        `${dte}${new Intl.DateTimeFormat("en-US", { month: "short" }).format(
          dt
        )}${dt.getFullYear()}`
      );
    }
  }, [actualDate]);

  return [rDate];
}

export default useFormatDate;
