import { World, Commands, BlockLocation } from "mojang-minecraft";
import {
  getScore,
  numFormatter,
  runCommand,
  EntityGetScore,
} from "./includes/functions.js";
import { updateLeaderboard, customCommand } from "./includes/commands.js";

World.events.tick.subscribe((tick) => {
  try {
    runCommand(`tag @r[type=binocraft:floating_text,tag=!ran] add running`);
    const command = runCommand(
      `tag @r[type=binocraft:floating_text,tag=running] list`
    );
    if (command) {
      var raw = command.statusMessage.split(" ");

      const tags = [];
      for (const string of raw) {
        if (!string.startsWith("objective:"))
          tags.push(
            string.replace("§a", "").replace("§r", "").replace(",", " ")
          );
      }
      let objective;
      for (const tag of tags) {
        if (tag.startsWith("objective:")) {
          objective = tag.replace("objective:", "");
        }
      }
      var x = EntityGetScore(
        "x",
        `@e[type=binocraft:floating_text,tag=objective:${objective},c=1]`
      );
      var y = EntityGetScore(
        "y",
        `@e[type=binocraft:floating_text,tag=objective:${objective},c=1]`
      );
      var z = EntityGetScore(
        "z",
        `@e[type=binocraft:floating_text,tag=objective:${objective},c=1]`
      );
      updateLeaderboard(objective, x, y, z);
      runCommand(`tag @e[tag=running] add ran`);
      runCommand(`tag @e[tag=running] remove running`);
    }
    //This will run true if there is no more leaderboards to look through
    if (runCommand("testfor @e[type=binocraft:floating_text,tag=!ran]").error) {
      runCommand("tag @e[type=binocraft:floating_text,tag=ran] remove ran");
    }
  } catch (error) {
    runCommand(`tag @e remove ran`);
    console.warn(
      `say ${error} - ${error.stack}`,
      World.getDimension("overworld")
    );
  }
});

const commandPrefix = "-";

World.events.beforeChat.subscribe((msg) => {
  if (msg.message.substr(0, commandPrefix.length) == commandPrefix) {
    msg.cancel = true;
    customCommand(
      `${msg.message.substr(commandPrefix.length, msg.message.length - 1)}`,
      msg
    );
  }
});
