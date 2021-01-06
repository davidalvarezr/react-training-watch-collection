import React, {useEffect, useState} from "react";

function CurrentTime() {
    const [time, setTime] = useState(buildTime)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(buildTime())
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    })



    return (
        <span>{time}</span>
    )
}

function buildTime(): string {
    const date: Date = new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}


export default CurrentTime