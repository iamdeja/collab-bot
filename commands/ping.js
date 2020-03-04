module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  run: async (client, message) => {
    const msg = await message.channel.send(`🏓 Pinging....`);
    const latency = await client.ping;
    await msg.edit(
      `🏓 Pong!\nLatency is ${msg.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(latency)}ms`
    );
  }
};
