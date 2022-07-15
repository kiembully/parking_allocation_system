import React, { Component, useEffect, useState } from "react";
import Clock from "./Clock";

const Count = (props) => {
    const [timeIn, setTimeIn] = useState("July, 14, 2022, 17:50:05")
    
    useEffect(() => {
        var date = new Date(props.date)
        setTimeIn(
            (handleMonth(date.getMonth()+1))+
            ", "+date.getDate()+
            ", "+date.getFullYear()+
            ", "+date.getHours()+
            ":"+date.getMinutes()+
            ":"+date.getSeconds()
        )
    }, [])

    const handleMonth = (val) => {
        switch(val) {
            case 1: return 'January'
            case 2: return 'February'
            case 3: return 'March'
            case 4: return 'April'
            case 5: return 'May'
            case 6: return 'June'
            case 7: return 'July'
            case 8: return 'August'
            case 9: return 'September'
            case 10: return 'October'
            case 11: return 'November'
            case 12: return 'December'
        }
    }
    
    return (
        <div>
            <Clock data={props.data} timeIn={timeIn} />
        </div>
    );
}

export default Count;
