// api/verify-password.js
// Vercel / Netlify-style serverless function (Node.js)
// Deploy this file to a serverless environment that supports Node.js and set the ADMIN_PASSWORD
// environment variable in that environment's settings.

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  // Some serverless platforms (like Vercel) parse JSON automatically. If not, try to parse.
  if (!body) {
    try {
      body = JSON.parse(req.rawBody || '{}');
    } catch (e) {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
  }

  const password = body.password || '';
  if (!password) {
    return res.status(400).json({ ok: false, error: 'Missing password' });
  }

  const secret = process.env.ADMIN_PASSWORD || '';
  // Use a constant-time comparison in production if you expect timing attacks. For this use-case direct compare is acceptable.
  if (password === secret && secret.length > 0) {
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ ok: false });
}
