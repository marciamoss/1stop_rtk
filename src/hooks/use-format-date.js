import { useState, useEffect } from 'react';

function useFormatDate(actualDate) {
    const [rDate, setRDate] = useState('');

    useEffect(() => {   
        if(actualDate) {
            const dt = new Date(actualDate);
            const dte = (dt.getDate()).toString().length === 1 ? `0${dt.getDate()}` : dt.getDate();
            setRDate(`${dte}${new Intl.DateTimeFormat("en-US", { month: "short" }).format(dt)}${dt.getFullYear()}`);
        }
    }, [actualDate]);

    return {
        rDate
    }
}

export default useFormatDate;
