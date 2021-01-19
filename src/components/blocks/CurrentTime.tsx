import React, { useEffect, useState } from "react"

const INTERVAL_TIME = 1000
const NB_DIGITS = 2

const CurrentTime = () => {
    const [time, setTime] = useState(buildTime)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(buildTime())
        }, INTERVAL_TIME)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return <span>{time}</span>
}

/**
 * Return the current time
 */
function buildTime(): string {
    const date: Date = new Date()
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
    if (str.length < NB_DIGITS) {
        do {
            str = `0${n}`
            // eslint-disable-next-line no-magic-numbers
        } while (str.length < NB_DIGITS)
    }
    return str
}

export { CurrentTime }
