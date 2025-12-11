import { promises as fs } from "fs";

async function main() {
  await solveDayOne();
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

  console.log("Part 1 Solution:", passwordPart1);
  console.log("Part 2 Solution:", passwordPart2);
}

main();
