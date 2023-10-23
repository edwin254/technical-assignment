const events = require('events');
const fs = require('fs');
const readline = require('readline');

async function readInputByLine() {
  try {
    const dataArray = [];
    const rl = readline.createInterface({
      input: fs.createReadStream('data/jobs.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      dataArray.push(parseInt(line));
    });

    await events.once(rl, 'close');

    const jobs = [];

    for (let i = 0; i < dataArray.length; i += 3) {
      jobs.push({
        "name": `job-${Math.floor(i / 3) + 1}`,
        "startTime": dataArray[i],
        "endTime": dataArray[i + 1],
        "earnings": dataArray[i + 2]
      });
    }

    jobs.sort((a, b) => a.startTime - b.startTime);
    console.log('jobs:',jobs)
    return jobs;
  } catch (err) {
    console.error(err);
  }
}

async function findEmployeeEarningAndJobs() {
  try {
    const jobs = await readInputByLine();

    let maxValuePath = [];
    let maxEarning = 0;

    function removeOverlap(currJob, filterJobs) {
      return filterJobs.filter(job =>
        currJob.endTime <= job.startTime || currJob.name === job.name
      );
    }

    function findPath(node, earnings, jobPath) {
      jobPath.push(node.name);

      if (earnings > maxEarning) {
        maxValuePath = [...jobPath];
        maxEarning = earnings;
      }

      const nextJobs = removeOverlap(node, jobs);

      for (const nextJob of nextJobs) {
        if (jobPath.includes(nextJob.name)) {
          continue; // Skip this job to avoid circular references
        }

        const newJobs = jobs.filter(job => job.name !== nextJob.name);
        findPath(nextJob, earnings + nextJob.earnings, jobPath.slice());
      }
    }

    for (const startJob of jobs) {
      const newJobs = jobs.filter(job => job.name !== startJob.name);
      findPath(startJob, startJob.earnings, []);
    }

    console.log("Max Earnings:", maxEarning);
    console.log("Job Path:", maxValuePath);

    // Calculate the remaining earnings
    const remainingJobs = jobs.filter(job => !maxValuePath.includes(job.name));
    const remainingEarnings = remainingJobs.reduce((total, job) => total + job.earnings, 0);
    
    // console.log("Remaining Earnings:", remainingEarnings);
    return remainingEarnings, remainingJobs;

  } catch (err) {
    console.error(err);
  }
}

findEmployeeEarningAndJobs();




// async function  findEmployeeEarningAndJobs(){
//     // group the data array into a list of maps of 3
//     const jobs = await readinputByLine();



    // get the starting jobs array, which are jobs that overlap with the earliest job.
    // This will be assumed to be joibs that can only be selected first not after another.
    // const earliestJobs = jobs.filter(job => job.startTime < earliestJob.endTime);

//     const adjacencyList = Object.fromEntries(earliestJobs.map(job => [job.name, []]));
//     console.log(adjacencyList)

//     // Create a job schedule 
//     //  That is all the possible jobs combination without overlap each other.
//     // const scheduleS = [];
//     // for (let i = 0; i < earliestJobs.length; i++) {
//     //     const schedule = {};
//     //     for (let j = i + 1; j < earliestJobs.length; j++) {
//     //         schedule.push([earliestJobs[i], earliestJobs[j]]);
//     //     }
//     // }



// }