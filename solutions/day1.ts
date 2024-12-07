import * as fs from "fs";
import * as path from "path";

export function day1Solution(): string {
  const filePath = path.join(__dirname, "../inputs/day1.txt");

  var data = fs.readFileSync(filePath, "utf-8");

  const lines = data.trim().split("\n");
  const array1: number[] = [];
  const array2: number[] = [];

  lines.forEach((line) => {
    const [num1, num2] = line.trim().split("   ").map(Number);
    array1.push(num1);
    array2.push(num2);
  });

  var answer1 = part1(array1, array2);
  var answer2 = part2(array1, array2);

  return answer1.toString() + " - " + answer2.toString();
}

function part1(array1: number[], array2: number[]) {
  var array1Sorted = array1.slice().sort();
  var array2Sorted = array2.slice().sort();

  var answer1 = 0;
  array1Sorted.forEach((num1, i) => {
    var num2 = array2Sorted[i];
    answer1 += Math.abs(num1 - num2);
  });
  return answer1;
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
