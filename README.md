# SiftNodes Public Discord Bot + SiftAI

**Made by NotRyxenYT** — public-use community bot with hosting tools, tickets, invite tracking, vouchers, giveaways, autorole, and a single-channel non-prefix AI chat.

## Important reality check about local AI

The bot does **not** require a third-party AI API key. It can use **Ollama running locally on your own VPS**. However, a model must still be downloaded and run; the bot code itself is not a trained large language model. Without Ollama, greetings and a few SiftNodes FAQs use the built-in fallback, but broad AI answers will be limited.

## Included files

- `bot.py` — Discord bot source.
- `requirements.txt` — Python packages.
- `server.js`, `package.json`, `index.html`, `styles.css`, `app.js` — optional static feature/info page (not a VPS control panel).
- `assets/siftnodes_logo.svg` / `.png` — logo.
- `assets/siftnodes_thumbnail.png` — promo thumbnail.
- `assets/siftnodes_promo_poster.png` — full promotional poster.

## 1. Discord setup

1. Create a bot in Discord Developer Portal.
2. Enable **Message Content Intent** and **Server Members Intent**.
3. Invite it with View Channels, Send Messages, Embed Links, Read Message History, Manage Channels, Manage Roles, Manage Server, and Use Application Commands as needed.
4. Ensure the bot role is above the autorole role it must assign.
5. In the Developer Portal, enable **Public Bot** if you want other servers to invite it; this setting cannot be changed by Python code.
6. The bot is not restricted to one guild; it can be invited to other servers. Admin commands still require the configured owner/admin check.

## 2. Configure channel IDs and token

Default values in `bot.py`:

- Vouch input channel: `1553695179666366565` (`VOUCH_CHANNEL_ID`)
- Real/fake vouch audit channel: `1557023316038914209` (`VOUCH_LOG_CHANNEL_ID`)
- SiftAI non-prefix chat channel: `1556778954319204424` (`AI_CHAT_CHANNEL_ID`)
- Owner ID: `1520903362667876523` (`SIFTNODES_OWNER_ID` environment variable)

If users post vouches in a different channel, set `VOUCH_CHANNEL_ID` to that channel's ID. The audit reports are sent to `1557023316038914209`. The bot must have permission to view and send messages in both channels.

Set your token either by replacing `PUT_YOUR_BOT_TOKEN_HERE` in `bot.py` or with an environment variable:

```bash
export DISCORD_BOT_TOKEN='YOUR_BOT_TOKEN'
```

Never share the token or upload it to a public repository.

## 3. Install and run the Python bot

Python 3.11+ and Docker Engine are required for VPS container features.

```bash
python3 -m pip install -r requirements.txt
python3 -m py_compile bot.py
python3 bot.py
```

For 24/7 background mode:

```bash
nohup python3 -u bot.py > bot.log 2>&1 &
```

## 4. Enable full local SiftAI (no third-party API key)

Install Ollama on the same VPS, then download and run a local model:

```bash
ollama pull qwen2.5:3b
```

Ollama normally runs as a service. If it is not already running, start it with `ollama serve` in a separate session. The bot calls `http://127.0.0.1:11434/api/chat` and uses `qwen2.5:3b` by default. This local model can generate normal chat responses and code, but generated code/assets still need to be reviewed before use.

SiftAI only responds to normal, non-prefix messages in channel `1556778954319204424`. For example, send `Hi` there. If asked who created it, it answers `NotRyxenYT`.

## 5. Commands

### Prefix commands (only these two)

- `-i` — your invite statistics.
- `-i @user` — another user's invite statistics.
- `-buy` — VPS purchase panel.

### Slash commands

- `/help`
- `/deploy`
- `/buy`
- `/slots buy`
- `/sharevps`
- `/start`, `/stop`, `/list`, `/regen_ssh`, `/rebuild`, `/renew`
- `/ticket setup`
- `/autorole`
- `/welcome setup`
- `/invite setup`
- `/giveaway create` — duration examples `30m`, `2h`, `1d`; reward; winners; optional channel.
- `/giveaway end` — ends a giveaway early using the giveaway message ID.
- `/siftai` — local AI status.
- `/botinfo` — public bot feature info.

Giveaways support an Enter button, duplicate-entry protection, persistent entries, and automatic ending when the duration expires. The bot needs Send Messages, Embed Links, and Read Message History in the giveaway channel.

## 6. Voucher log troubleshooting

When someone posts a valid vouch (`Legit Got 12GB Vps` or the relevant RAM amount) in the configured vouch input channel, the bot checks for an unvouched, stopped VPS claim owned by that user. Valid and invalid/malformed vouch reports are sent to the audit channel. If logs still do not appear, check `bot.log` for permission errors and verify the two channel IDs.

## 7. Optional Node.js feature page

The HTML page is only a static public information page. It is not a panel for managing Docker containers or changing Discord bot settings.

```bash
npm install
npm start
```

Then open `http://localhost:3000`.
