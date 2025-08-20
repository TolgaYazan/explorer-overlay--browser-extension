# Explorer Overlay (Browser Extension)

Adds a mini health pill on Etherscan address pages using a content script.

## MVP
- Match `https://etherscan.io/address/*`
- Inject pill showing: borrow health (✔/⚠), borrow amount, rewards owed
- Reads from your backend or directly from RPC (read‑only)

## Dev
This folder has a Node scaffold for RPC helpers; the extension code (manifest/content script) will be added next.

- RPC helpers dev:
```bash
cp .env.example .env
RPC_URL=https://mainnet.infura.io/v3/...
COMET_ADDRESS=0xc3d688B66703497DAA19211EEdff47f25384cdc3
npm install
npm run dev
```

## Next steps
- Add `manifest.json`, content script, and overlay UI
- Bundle with Vite/ESBuild, load unpacked in Chrome 