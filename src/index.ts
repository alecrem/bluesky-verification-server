import { Hono } from "hono";
import { env } from "hono/adapter";

const app = new Hono();

app.get("/.well-known/atproto-did", (c) => {
  const { BSKY_DID } = env<{ BSKY_DID: string }>(c);
  return c.text(BSKY_DID);
});

app.get("/", (c) => {
  const { REDIRECT_URL } = env<{ REDIRECT_URL: string }>(c);
  return c.redirect(REDIRECT_URL);
});

export default app;
