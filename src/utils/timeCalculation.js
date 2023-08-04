

function calculateDowntime(history) {
  let isDown = false;
  let downtime = 0;
  let downStartTime = 0;
  if (history.length > 0) {
    const lastEntry = history[history.length - 1];
    if (!lastEntry.timestamp) {
      lastEntry.timestamp = new Date().toISOString();
    }
  }
  for (const entry of history) {
    if (entry.status === 'DOWN') {
      if (!isDown) {
        downStartTime = entry.timestamp;
        isDown = true;
      }
    } else if (isDown) {
      const downEndTime = entry.timestamp;
      const downDuration = new Date(downEndTime) - new Date(downStartTime);
      downtime += downDuration;
      isDown = false;
    }
  }
  if (isDown) {
    const downEndTime = new Date();
    const downDuration = downEndTime - new Date(downStartTime);
    downtime += downDuration;
  }
  return downtime / 1000;
}

const calculateUptime = (history , downtime) => {
   const timeDifferenceInMilliseconds = new Date() - new Date(history[0].timestamp);
    const totalSeconds = Math.floor(timeDifferenceInMilliseconds)/1000;
    const uptime = totalSeconds - downtime;
    return uptime 
};
function countDownStatus(newLogEntry) {
  const downEntries = newLogEntry.filter((entry) => entry.status === 'DOWN');
  return downEntries.length;
}

const calculateAvailability = (totalSeconds, downtime) => {
    const uptimeSeconds = totalSeconds - downtime / 1000;
    const availability = uptimeSeconds / totalSeconds;
    return availability * 100;
};

const calculateOutages = (history) => {
    let outages = 0;
    for (const obj of history) {
      if (obj.status === "DOWN") {
        outages++;
      }
    }
    return outages ;
};

const calculateAverageResponseTime = (history, lastResponseTime) => {
    const responseTimes = history
        .filter((log) => log.status === 'UP')
        .map((log) => log.responseTime);

    if (lastResponseTime !== undefined && lastResponseTime !== null) {
        responseTimes.push(lastResponseTime);
    }
    const sum = responseTimes.reduce((acc, curr) => acc + curr, 0);
    const avg = responseTimes.length > 0 ? sum / responseTimes.length : 0;
    return avg;
};

module.exports = {
    calculateDowntime,
    calculateUptime,
    calculateAvailability,
    calculateOutages,
    calculateAverageResponseTime,
    countDownStatus
};
