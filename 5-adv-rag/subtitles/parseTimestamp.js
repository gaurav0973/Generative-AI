export function parseTimestamp(timestamp) {

    const [startTime, endTime] = timestamp.split(" --> ");

    return {
        start: convertToMilliseconds(startTime),
        end: convertToMilliseconds(endTime),
    };
}

function convertToMilliseconds(time) {

    const [hours, minutes, seconds] = time.split(":");

    const [sec, milliseconds] = seconds.replace(".", ",").split(",");

    return (
        Number(hours) * 60 * 60 * 1000 +
        Number(minutes) * 60 * 1000 +
        Number(sec) * 1000 +
        Number(milliseconds)
    );
}
