API function to verify admin password

This repository includes a small serverless function at api/verify-password.js that validates an incoming password against the ADMIN_PASSWORD environment variable.

Deployment notes:
- This file is written as a Vercel/Netlify-compatible serverless function. Deploy the repository (or just the function) to a platform that supports Node.js serverless functions (Vercel, Netlify, Render, Cloudflare Workers with adaptation, AWS Lambda, etc.).
- Create an environment variable named ADMIN_PASSWORD in the target environment and set it to your admin password. Do NOT commit secrets to the repository.

Example (Vercel):
1. Install the Vercel CLI and run `vercel` or connect the repo in the Vercel dashboard.
2. In the Vercel project settings, add an Environment Variable: `ADMIN_PASSWORD` with your secret value.
3. Deploy. The frontend (voting.html) will POST to `/api/verify-password` on the same domain.

Security notes:
- Never store the password in client-side code or in the repo. Keep ADMIN_PASSWORD only in environment variables/secrets for the deployment platform.
- Consider adding rate-limiting and logging (without storing plaintext passwords) on the server-side function for production.
