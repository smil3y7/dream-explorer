import { NextRequest, NextResponse } from "next/server";

// Korak 2: GitHub preusmeri sem s ?code=..., mi to zamenjamo za access_token
// in ga sporočimo nazaj Decap CMS oknu prek postMessage (standarden pattern,
// ki ga pričakuje github backend v Decap/Netlify CMS).
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return htmlResponse(errorScript("Manjka code ali OAuth okoljski spremenljivki."));
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error || !tokenData.access_token) {
    return htmlResponse(
      errorScript(tokenData.error_description || "Prijava ni uspela.")
    );
  }

  const content = {
    token: tokenData.access_token,
    provider: "github",
  };

  return htmlResponse(successScript(content));
}

function successScript(content: { token: string; provider: string }) {
  return `
    <script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify(content).replace(/'/g, "\\'")}',
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  `;
}

function errorScript(message: string) {
  return `<p>Napaka pri prijavi: ${message}</p>`;
}

function htmlResponse(body: string) {
  return new NextResponse(`<!doctype html><html><body>${body}</body></html>`, {
    headers: { "Content-Type": "text/html" },
  });
}
