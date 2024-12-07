import * as fs from "fs";
import * as path from "path";

export function day2Solution(): string {
  const filePath = path.join(__dirname, "../inputs/day2.txt");

  const data = fs.readFileSync(filePath, "utf-8");

  const lines = data.trim().split("\n");
  const reports: number[][] = [];

  lines.forEach((line) => {
    reports.push(line.trim().split(" ").map(Number));
  });

  const answer1 = analyze(reports, false);
  const answer2 = analyze(reports, true);

  return answer1.toString() + " - " + answer2.toString();
}

function analyze(reports: number[][], damper: boolean) {
  var safeReports = 0;

  reports.forEach((report, index) => {
    var failed = checkReport(report);

    if (!failed) {
      safeReports++;
      console.log(report.join(" ") + " - SAFE");
    } else if (damper) {
      for (let i = 0; i < report.length; i++) {
        const damped = report.slice();
        damped.splice(i, 1);
        if (!checkReport(damped)) {
          safeReports++;
          console.log(damped.join(" ") + " - DAMPED SAFE");
          break;
        }
      }
    }
  });

  return safeReports;
}

function checkReport(report: number[]): boolean {
  var last = -1;
  var increasing: boolean | null = null;
  var failed = false;

  var line = "";

  var i = 0;
  for (let num of report) {
    line += num + " ";
    if (failed) {
      break;
    } else {
      if (last >= 0) {
        if (num == last) {
          failed = true;
        } else {
          var diff = num - last;

          if (Math.abs(diff) > 3) {
            failed = true;
          } else {
            if (increasing === null) {
              increasing = diff > 0;
            } else if (increasing && diff < 0) {
              failed = true;
            } else if (!increasing && diff > 0) {
              failed = true;
            }
          }
        }
      }
    }

    last = num;
    i++;
  }

  if (failed) {
    line += " - FAIL";
  }

  console.log(line);
  return failed;
}

function part2(array1: number[], array2: number[]) {
  var answer2 = 0;

  var map = new Map();
  array2.forEach((num) => {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  });

  array1.forEach((num1, i) => {
    if (map.has(num1)) {
      answer2 += num1 * map.get(num1);
    }
  });
  return answer2;
}
