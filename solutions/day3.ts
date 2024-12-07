import * as fs from "fs";
import * as path from "path";

export function day3Solution(): string {
  const filePath = path.join(__dirname, "../inputs/day3.txt");

  const data = fs.readFileSync(filePath, "utf-8");

  const raw = data.trim();

  var answer1 = part1(raw);
  var answer2 = part2(raw);

  return answer1.toString() + " - " + answer2.toString();
}

function part1(raw: string) {
  const regex = /mul\(\d+,\d+\)/g;
  const matches = [...raw.matchAll(regex)];

  var total = 0;
  matches.forEach((match) => {
    console.log(match[0]);
    var numbers = match[0].split("(")[1].split(")")[0].split(",");
    total += parseInt(numbers[0]) * parseInt(numbers[1]);
  });
  return total;
}

function part2(raw: string) {
  const regex = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g;
  const matches = [...raw.matchAll(regex)];

  var total = 0;
  var enabled = true;
  matches.forEach((match) => {
    var str = match[0];
    console.log(str);

    if (str == "do()") {
      enabled = true;
    } else if (str == "don't()") {
      enabled = false;
    } else {
      if (enabled) {
        console.log("READ");
        var numbers = str.split("(")[1].split(")")[0].split(",");
        total += parseInt(numbers[0]) * parseInt(numbers[1]);
      } else {
        console.log("SKIP");
      }
    }
  });
  return total;
}
