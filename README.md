# Bluesky Verification Server

### What this is

A simple Hono app to verify your domain or subdomain as your Bluesky handle, via a `.well-known` route (a non-DNS option to verify your handle).

### What this is not

A website.

### Who this is for

This repo doesn't help you have a website on the same domain or subdomain you would be using as your Bluesky handle, so I guess this is mostly for people who would like to use a handle in the following pattern:

```ts
`@${name}.${domain}`;
```

Example: `karawapo.alecrem.com`

## What it does

It responds to two HTTPS routes:

- `/.well-known/atproto-did`: returns your Bluesky DID for them to verify your handle
- `/`: redirects any visitors to an URL of your choice

## How to set it up

### What you need

- You will need a [Cloudflare](https://www.cloudflare.com/) account or another way to deploy this app
  - You might also want to be using Cloudflare to set up your domain's DNS
- The repository assumes you will use [pnpm](https://pnpm.io/installation)
- You don't need a GitHub account
  - Feel free to download a zip file of this code instead of forking and cloning the repository
- You need to find the DID string Bluesky expects your domain or subdomain to return
  1. Log into Bluesky and visit [the account settings](https://bsky.app/settings/account)
  2. Click on "Handle"
  3. Click on "I have my own domain"
  4. Fill "Enter the domain you want to use"
  5. Select the "No DNS Panel" tab
  6. Copy your DID string on "That contains the following:" (starts with `did:plc:`)

### Make it yours

You will want to change the contents of some files:

- `wrangler.toml`
  - Give the Cloudflare Worker a name of your choice: `name = "karawapo-alecrem-com"`
  - Paste your desired Bluesky handle here: `pattern = "karawapo.alecrem.com"`
  - `BSKY_DID`: the DID string you got from Bluesky
  - `REDIRECT_URL`: the URL you want to direct requests to `/` to
- `package.json`: feel free to change the package's `name`

### Install dependencies and run local server

```shell
pnpm install
pnpm run dev
```

- Check that an HTTPS request to [http://localhost:8787](http://localhost:8787) redirects to the URL you chose
- Check that an HTTPS request to [http://localhost:8787/.well-known/atproto-did](http://localhost:8787/.well-known/atproto-did) shows your DID string (and not mine)

### Deploy to Cloudflare as a Worker

```shell
pnpm run deploy
```

- You will need to log into your Cloudflare account)
- You can change your code and deploy as often as you need to

### Set up a custom domain for your worker

1. Open your worker's Settings tab on your Cloudflare Dashboard
1. On "Domains and Routes", click on "+ Add"
1. Click on "Custom Domain"
1. Paste your desired Bluesky handle (this should match the `pattern` on your `wrangler.toml` file)
1. Click "Add Domain" and follow any instructions to finalize the setup
1. Check that an HTTPS request to `https://your.handle` redirects to the URL you chose
1. Check that an HTTPS request to `https://your.handle/.well-known/atproto-did` shows your DID string (and not mine)

### Set your handle up on Bluesky

1. Log into Bluesky and visit [the account settings](https://bsky.app/settings/account)
2. Click on "Handle"
3. Click on "I have my own domain"
4. Fill "Enter the domain you want to use"
5. Select the "No DNS Panel" tab
6. Click on "Verify Text File"
