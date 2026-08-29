import { NextRequest, NextResponse } from "next/server";

// Korak 1 iz navodil: začne GitHub OAuth flow za Decap CMS.
// Zahteva okoljski spremenljivki GITHUB_CLIENT_ID in GITHUB_CLIENT_SECRET,
// nastavljeni v Vercel projektu (Settings -> Environment Variables).
export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "Manjka GITHUB_CLIENT_ID okoljska spremenljivka." },
      { status: 500 }
    );
  }

  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/callback`;
  const state = crypto.randomUUID();

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  return NextResponse.redirect(authorizeUrl.toString());
}
