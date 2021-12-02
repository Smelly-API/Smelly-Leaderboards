import { World, Commands, BlockLocation } from "mojang-minecraft";
import {
  getScore,
  numFormatter,
  runCommand,
  runCommands,
  hasTag,
} from "./functions.js";

export function customCommand(command, msg) {
  try {
    var sender = msg.sender;

    // Owner Tag REQUIRED!
    if (command.split(" ")[0] == "createlb") {
      if (hasTag(msg.sender.nameTag, "owner")) {
        const objective = command.split(" ")[1];
        var x = command.split(" ")[2];
        var y = command.split(" ")[3];
        var z = command.split(" ")[4];
        if (x == "~") {
          x = Math.round(sender.location.x);
        } else {
          parseInt(x);
        }
        if (y == "~") {
          y = Math.round(sender.location.y);
        } else {
          parseInt(y);
        }
        if (z == "~") {
          z = Math.round(sender.location.z);
        } else {
          parseInt(z);
        }
        if (
          objective != undefined ||
          x != undefined ||
          y != undefined ||
          z != undefined
        ) {
          // makes sure string isnt past 16 chars
          if (objective.length <= 16) {
            // Checks if string is letters
            if (/^[a-zA-Z]+$/.test(objective)) {
              // checks if x is a number
              if (!isNaN(x)) {
                // checks if y is a number
                if (!isNaN(y)) {
                  // checks if z is a number
                  if (!isNaN(z)) {
                    // makes sure there is less than one made
                    var otherLeaderboards = runCommand(
                      `testfor @e[type=binocraft:floating_text,tag=objective:${objective}]`
                    );
                    var ammountOtherLeaderboard =
                      otherLeaderboards.victim?.length ?? 0;
                    if (ammountOtherLeaderboard < 1) {
                      // ALL GOOD RUN

                      // Create Leaderboard
                      runCommand(
                        `scoreboard objectives add ${objective} dummy`
                      );
                      createlb(objective, x, y, z);
                      runCommand(
                        `tellraw "${msg.sender.nameTag}" {"rawtext":[{"text":"§aCreated Leaderboard for §e${objective}§a at §e${x}§a, §e${y}§a, §e${z}§a Succesfully!"}]}`
                      );
                      runCommand(
                        `/playsound random.orb "${msg.sender.nameTag}"`
                      );
                    } else {
                      runCommand(
                        `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.createlb.leaderboardlimit"}]}`
                      );
                    }
                  } else {
                    runCommand(
                      `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.createlb.zerror"}]}`
                    );
                  }
                } else {
                  runCommand(
                    `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.createlb.yerror"}]}`
                  );
                }
              } else {
                runCommand(
                  `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.createlb.xerror"}]}`
                );
              }
            } else {
              runCommand(
                `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.createlb.objectiveletter"}]}`
              );
            }
          } else {
            runCommand(
              `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.createlb.objectivelength"}]}`
            );
          }
        } else {
          runCommand(
            `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.createlb.missingagument"}]}`
          );
        }
      } else {
        runCommand(
          `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.createlb.missingpermission"}]}`
        );
      }
    }
    if (command.split(" ")[0] == "removelb") {
      if (hasTag(msg.sender.nameTag, "owner")) {
        const objective = command.split(" ")[1];
        var x = command.split(" ")[2];
        var y = command.split(" ")[3];
        var z = command.split(" ")[4];
        if (x == "~") {
          x = Math.round(sender.location.x);
        } else {
          parseInt(x);
        }
        if (y == "~") {
          y = Math.round(sender.location.y);
        } else {
          parseInt(y);
        }
        if (z == "~") {
          z = Math.round(sender.location.z);
        } else {
          parseInt(z);
        }
        if (
          objective != undefined ||
          x != undefined ||
          y != undefined ||
          z != undefined
        ) {
          // makes sure string isnt past 16 chars
          if (objective.length <= 16) {
            // Checks if string is letters
            if (/^[a-zA-Z]+$/.test(objective)) {
              // checks if x is a number
              if (!isNaN(x)) {
                // checks if y is a number
                if (!isNaN(y)) {
                  // checks if z is a number
                  if (!isNaN(z)) {
                    // ALL GOOD RUN
                    if (removelb(objective, x, y, z)) {
                      runCommand(
                        `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.success.command.removelb.part1"},{"text":"§e${objective}"},{"translate":"slb.success.command.removelb.part2"},{"text":" §e${x}§a, §e${y}§a, §e${z} "},{"translate":"slb.success.command.removelb.part3"}]}`
                      );
                      runCommand(
                        `/playsound random.orb "${msg.sender.nameTag}"`
                      );
                    } else {
                      runCommand(
                        `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.failed.command.removelb"}]}`
                      );
                    }
                  } else {
                    runCommand(
                      `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.removelb.zerror"}]}`
                    );
                  }
                } else {
                  runCommand(
                    `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.removelb.yerror"}]}`
                  );
                }
              } else {
                runCommand(
                  `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.removelb.xerror"}]}`
                );
              }
            } else {
              runCommand(
                `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.removelb.objectiveletter"}]}`
              );
            }
          } else {
            runCommand(
              `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.removelb.objectivelength"}]}`
            );
          }
        } else {
          runCommand(
            `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.removelb.missingagument"}]}`
          );
        }
      } else {
        runCommand(
          `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.error.command.removelb.missingpermission"}]}`
        );
      }
    }
    if (command.split(" ")[0] == "help") {
      runCommand(`tag @e remove ran`);
      let directory;
      if (command.split(" ")[1]) {
        directory = command.split(" ")[1];
      } else directory = "default";
      if (directory == "createlb") {
        runCommand(
          `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.help.command.createlb.description"}]}`
        );
        runCommand(
          `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.help.command.createlb.usage"}]}`
        );
      }
      if (directory == "removelb") {
        runCommand(
          `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.help.command.removelb.description"}]}`
        );
        runCommand(
          `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.help.command.removelb.usage"}]}`
        );
      }
      if (directory == "default") {
        runCommand(
          `tellraw "${msg.sender.nameTag}" {"rawtext":[{"translate":"slb.help.default"}]}`
        );
      }
    }
  } catch (error) {
    console.warn(
      `say ${error} - ${error.stack}`,
      World.getDimension("overworld")
    );
  }
}

export function removelb(objective, x, y, z) {
  if (
    runCommand(
      `execute @e[type=binocraft:floating_text,x=${x},y=${y},z=${z},r=2,tag=objective:${objective},c=1] ~~~ kill @s`
    )
  ) {
    return true;
  } else {
    return false;
  }
}

export function createlb(objective, x, y, z) {
  try {
    runCommands([
      `scoreboard objectives add x dummy`,
      `scoreboard objectives add y dummy`,
      `scoreboard objectives add z dummy`,
      `summon binocraft:floating_text ${x} ${y} ${z}`,
      `execute @e[type=binocraft:floating_text,x=${x},y=${y},z=${z},r=2,c=1] ~~~ tag @s add objective:${objective}`,
      `execute @e[type=binocraft:floating_text,x=${x},y=${y},z=${z},r=2,c=1] ~~~ scoreboard players set @s x ${x}`,
      `execute @e[type=binocraft:floating_text,x=${x},y=${y},z=${z},r=2,c=1] ~~~ scoreboard players set @s y ${y}`,
      `execute @e[type=binocraft:floating_text,x=${x},y=${y},z=${z},r=2,c=1] ~~~ scoreboard players set @s z ${z}`,
    ]);
  } catch (error) {
    Commands.run(
      `say ${error} - ${error.stack}`,
      World.getDimension("overworld")
    );
  }
}

export function updateLeaderboard(objective, x, y, z) {
  try {
    x = parseInt(x);
    y = parseInt(y);
    z = parseInt(z);

    var objectiveLeaderboard = [];
    let entity = World.getDimension("overworld").getEntitiesAtBlockLocation(
      new BlockLocation(x, y, z)
    )[0];

    for (const player of World.getPlayers()) {
      // grabs score for player
      var playersScore = getScore(objective, player.nameTag);
      if (playersScore == undefined) playersScore = 0;

      // adds name to score to be used to call for player
      objectiveLeaderboard.push({ name: player.nameTag, score: playersScore });
    }

    var sortedPlayers = objectiveLeaderboard.sort((a, b) => b.score - a.score);

    let scores = ``;
    var counter = 0;

    for (const player of sortedPlayers) {
      counter++;
      var valueFormated = numFormatter(player.score);
      scores += `§b#${counter}§r §g${player.name}§r §e${valueFormated}§r\n`;
    }

    var oldNameTag = entity.nameTag.replace(
      `§l§b${
        objective.charAt(0).toUpperCase() + objective.slice(1)
      } §gLeaderboard\n§l§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§r\n`
    );

    entity.nameTag = `§l§b${
      objective.charAt(0).toUpperCase() + objective.slice(1)
    } §gLeaderboard\n§l§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§9-§f-§r\n${scores}`;
  } catch (error) {
    console.warn(
      `say ${error} - ${error.stack}`,
      World.getDimension("overworld")
    );
  }
}
