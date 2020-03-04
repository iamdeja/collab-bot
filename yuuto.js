// Requirement Files
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const { Client, Collection } = require("discord.js");
const { prefix } = require("./config.json");

dotenv.config();

// Collections and Sets
const yuuto = new Client();
yuuto.commands = new Collection();
yuuto.aliases = new Collection();
yuuto.cooldowns = new Collection();

// Load command files
const commandsFiles = readdirSync("./commands/").filter(file =>
  file.endsWith(".js")
);

// Load the commands
for (const file of commandsFiles) {
  const command = require(`./commands/${file}`);
  yuuto.commands.set(command.name, command);

  if (command.aliases && Array.isArray(command.aliases))
    command.aliases.forEach(alias => yuuto.aliases.set(alias, command.name));
}

// Initialise the bot's startup
yuuto.on("ready", () => {
  console.log(`Hi, ${yuuto.user.username} is now online!`);

  yuuto.user.setPresence({
    status: "online",
    game: {
      name: "volleyball",
      type: "PLAYING"
    }
  });
});

yuuto.on("message", async message => {
  if (message.channel.id === "684447764259668072") yuuto.destroy(); // test server purposes
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  // Get the command name. or return
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (!cmd) return;

  // Find command or alias
  let command = yuuto.commands.get(cmd);
  if (!command) command = yuuto.commands.get(yuuto.aliases.get(cmd));

  // Add the command to the cooldown
  if (!yuuto.cooldowns.has(command.name)) {
    yuuto.cooldowns.set(command.name, new Collection());
  }

  // Set the cooldown's timestamp
  const now = Date.now();
  const timestamps = yuuto.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  // Check if the user is on cooldown
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      await message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`{command.name}\` command.`
      );
      return;
    }
  }

  // Add the author to the cooldown timestamps,
  // then remove the command after cooldown expires.
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // Execute the command, and catch errors.
  try {
    command.run(yuuto, message, args);
  } catch (error) {
    console.error(error);
    await message.reply("there was an error trying to execute that command!");
  }
});

// login to Discord using the app token
yuuto.login(process.env.TOKEN);
