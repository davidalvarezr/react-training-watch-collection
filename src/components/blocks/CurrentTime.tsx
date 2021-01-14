import React, { useEffect, useState } from "react"

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

    return <span>{time}</span>
}

/**
 * Return the current time
 */
function buildTime(): string {
    let date: Date = new Date()
    return `${getHours(date)}:${getMinutes(date)}:${getSeconds(date)}`
}

function getHours(date: Date): string {
    return addLeadingZero(date.getHours())
}

function getMinutes(date: Date): string {
    return addLeadingZero(date.getMinutes())
}

function getSeconds(date: Date): string {
    return addLeadingZero(date.getSeconds())
}

/**
 * Transform hours, minutes or seconds that have less than 2 digits to having 2 digits by appending
 * zeros(s) at the beginning
 * @param n the number representing either the hours, the minutes or the seonds
 */
function addLeadingZero(n: number): string {
    let str = n.toString()
    if (str.length < 2) {
        do {
            str = `0${n}`
        } while (str.length < 2)
    }
    return str
}

export default CurrentTime
