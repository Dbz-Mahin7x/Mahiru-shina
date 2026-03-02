"use strict"; 

const axios = require("axios"); 

module.exports = {
  config: {
    name: "fork",
    aliases: ["repo"],
    version: "1.2.0",
    author: "𝓡𝓮𝓷𝓽𝓪𝓻𝓸 𝐴𝓲𝓳𝓸 🌸🫧",
    countDown: 5,
    role: 0,
    category: "info",
    shortDescription: { en: "Get the bot's repository link with live updates 🎀" },
    guide: { en: "{pn}" }
  }, 

  onStart: async function ({ api, event, message }) {
    const { threadID, messageID } = event; 

    const toBoldFont = (text) => {
      const map = {
        a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
        A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
        0: "𝟎", 1: "𝟏", 2: "𝟐", 3: "𝟑", 4: "𝟒", 5: "𝟓", 6: "𝟔", 7: "𝟕", 8: "𝟖", 9: "𝟗"
      };
      return text.split("").map(char => map[char] || char).join("");
    }; 

    const repoOwner = "Dbz-Mahin7x";
    const repoName = "Mahiru-shina";
    const repoLink = `https://github.com/${repoOwner}/${repoName}`;

    const divider = `✧ ೃ༄ ──── ୨ 🎀 ୧ ──── ✧ ೃ༄\n`;
    const footer = `\n✧ ೃ༄ ──── ୨ 🧸 ୧ ──── ✧ ೃ༄`; 

    try {
      // Fetch live data from GitHub API
      const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}`);
      const { stargazers_count, forks_count, updated_at } = response.data;

      // Format the date (e.g., Feb 23, 2026)
      const lastUpdate = new Date(updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }); 

      const msg = `${divider}` +
                  `✨ ${toBoldFont("𝐁𝐎𝐓 𝐑𝐄𝐏𝐎𝐒𝐈𝐓𝐎𝐑𝐘")} ✨\n\n` +
                  `📂 ${toBoldFont("Project")}: ${toBoldFont("Mahiru Shina")}\n` +
                  `🎀 ${toBoldFont("Owner")}: ${toBoldFont("Mahin")}\n` +
                  `⭐ ${toBoldFont("Stars")}: ${toBoldFont(stargazers_count.toString())}\n` +
                  `🍴 ${toBoldFont("Forks")}: ${toBoldFont(forks_count.toString())}\n` +
                  `📅 ${toBoldFont("Updated")}: ${toBoldFont(lastUpdate)}\n\n` +
                  `🔗 ${toBoldFont("Link")}:\n${repoLink}\n\n` +
                  `𝐡𝐞𝐡𝐞, 𝐝𝐨𝐧'𝐭 𝐟𝐨𝐫𝐠𝐞𝐭 𝐭𝐨 𝐥𝐞𝐚𝐯𝐞 𝐚 𝐬𝐭𝐚𝐫! 🌟` +
                  `${footer}`; 

      api.setMessageReaction("🍴", messageID, (err) => {}, true);
      return message.reply(msg); 

    } catch (err) {
      // Fallback message if API fails
      const fallbackMsg = `${divider}` +
                  `✨ ${toBoldFont("𝐁𝐎𝐓 𝐑𝐄𝐏𝐎𝐒𝐈𝐓𝐎𝐑𝐘")} ✨\n\n` +
                  `📂 ${toBoldFont("Project")}: ${toBoldFont("Mahiru Shina")}\n` +
                  `👤 ${toBoldFont("Owner")}: ${toBoldFont("Mahin")}\n\n` +
                  `🔗 ${toBoldFont("Link")}:\n${repoLink}\n` +
                  `${footer}`;

      return message.reply(fallbackMsg);
    }
  }
};
