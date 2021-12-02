import { World, Commands } from "mojang-minecraft";

export function getScore(objective, player, { minimum, maximum } = {}) {
  const data = runCommand(
    `scoreboard players test "${player}" ${objective} ${
      minimum ? minimum : "*"
    } ${maximum ? maximum : "*"}`
  );
  if (!data.statusMessage) return;
  return parseInt(data.statusMessage.match(/-?\d+/)[0]);
}

export function EntityGetScore(objective, entity, { minimum, maximum } = {}) {
  const data = runCommand(
    `scoreboard players test ${entity} ${objective} ${
      minimum ? minimum : "*"
    } ${maximum ? maximum : "*"}`
  );
  if (!data.statusMessage) return;
  return parseInt(data.statusMessage.match(/-?\d+/)[0]);
}

export function runCommand(command) {
  try {
    return {
      error: false,
      ...Commands.run(command, World.getDimension(`overworld`)),
    };
  } catch (error) {
    return { error: true };
  }
}

export function runCommands(commands) {
  const conditionalRegex = /^%/;
  if (conditionalRegex.test(commands[0]))
    throw "[Server]: runCommands(): Error - First command in the Array CANNOT be Conditional";
  let error = false;
  commands.forEach((cmd) => {
    if (error && conditionalRegex.test(cmd)) return;
    error = runCommand(cmd.replace(conditionalRegex, "")).error;
  });
  return { error: error };
}

export function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num <= 999) {
    return num; // if value < 1000, nothing to do
  }
}

export function hasTag(name, tag) {
  let allTags = runCommand(`tag "${name}" list`)
    .statusMessage.match(/§a.*?§r/g)
    ?.map((v) => v.slice(2, -2));
  if (allTags == null) {
    return false;
  }
  let incTag = allTags.includes(tag);
  if (incTag == true) {
    return true;
  }
}
