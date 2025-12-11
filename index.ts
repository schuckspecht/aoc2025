import { promises as fs } from "fs";

async function main() {
  await solveDayOne();
  await solveDayTwo();
}

async function solveDayOne() {
  const path = "input_d1.txt";
  const text = await fs.readFile(path, "utf8");

  let dial = 50;
  let passwordPart1 = 0;
  let passwordPart2 = 0;
  const lines = text.replace(/\r/g, "").split("\n");

  //Part 1
  for (const line of lines) {
    const dir = line[0];
    const value = Number(line.slice(1));

    if (dir === "L") {
      dial = (dial - value + 100) % 100;
    } else if (dir === "R") {
      dial = (dial + value) % 100;
    }
    if (dial === 0) passwordPart1++;
  }

  //Part 2
  dial = 50;
  for (const line of lines) {
    const dir = line[0];
    const value = Number(line.slice(1));
    const modValue = value % 100;

    // count full 100-moves
    passwordPart2 += Math.floor(Math.abs(value) / 100);

    if (dir === "R") {
      dial += modValue;
      if (dial > 99) {
        passwordPart2++;
        dial -= 100;
      }
    } else if (dir === "L") {
      const oldPosition = dial;
      dial -= modValue;
      if (dial < 0) {
        if (oldPosition !== 0) passwordPart2++;
        dial += 100;
      }
      if (dial === 0) passwordPart2++;
    }
  }

  console.log("Day 1 Part 1 Solution:", passwordPart1);
  console.log("Day 1 Part 2 Solution:", passwordPart2);
}

async function solveDayTwo() {
  const path = "input_d2.txt";
  const text = await fs.readFile(path, "utf8");

  const lines = text.replace(/\r?\n/g, "").split(",");

  //Part 1
  let totalPart1 = 0;
  for (const line of lines) {
    const ids = line.split("-").map((id) => Number(id));
    for (let i = ids[0]; i <= ids[1]; i++) {
      let string = i.toString();

      const first = string.slice(0, string.length / 2);
      const second = string.slice(string.length / 2, string.length);

      if (first === second) {
        totalPart1 += i;
      }
    }
  }

  let totalPart2 = 0;
  let invalidIds: number[] = [];
  for (const line of lines) {
    const ids = line.split("-").map((id) => Number(id));
    for (let i = ids[0]; i <= ids[1]; i++) {
      const string = i.toString();
      const length = string.length;
      let chunks: string[] = [];
      for (let size = 1; size <= length / 2; size++) {
        for (let i = 0; i < string.length; i += size) {
          chunks.push(string.substring(i, i + size));
        }
        const same = chunks.every((chunk) => chunk === chunks[0]);
        if (same) {
          const found = invalidIds.indexOf(i);

          if (found === -1) {
            invalidIds.push(i);
            totalPart2 += i;
          }
        }
        chunks = [];
      }
    }
  }
  console.log("Day 2 Part 1 Solution:", totalPart1);
  console.log("Day 2 Part 2 Solution:", totalPart2);
}

main();
