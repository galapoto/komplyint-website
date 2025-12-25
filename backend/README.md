# KOMPLYINT Website Backend

Minimal backend API for the KOMPLYINT OY public website.

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Email (Google Workspace)

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and set your Google Workspace App Password:

```env
SMTP_USER=komplyint@komplyint.com
SMTP_PASSWORD=your-app-password-here
```

**To get an App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail"
5. Use the generated 16-character password in `.env`

### 3. Start the Server

```bash
npm run dev
```

Or:

```bash
node app/main.js
```

The server will start on **http://localhost:8600**

## Endpoints

### Health Check
- `GET /health` - Returns `{"status": "ok"}`

### Contact Form
- `POST /contact` - Sends contact form submissions via email
  - **Body (JSON):**
    ```json
    {
      "name": "Optional Name",
      "email": "user@example.com",
      "message": "Your message here"
    }
    ```
  - **Response:**
    - Success (200): `{"ok": true}`
    - Error (400/500): `{"ok": false}`
  - **Validation:**
    - Email is required and must be valid format
    - Message is required and cannot be empty
    - Name is optional

## Email Configuration

- **SMTP Server**: smtp.gmail.com (port 587, TLS)
- **From**: KOMPLYINT OY <komplyint@komplyint.com>
- **To**: komplyint@komplyint.com
- **Reply-To**: Visitor's email address

## Configuration

- **Port**: 8600 (configured in `app/main.js`)
- **CORS**: Allows requests from `http://localhost:3600` (frontend)
- **Environment Variables**: Required in `.env` file (see `.env.example`)

## Security

- No authentication required for public website
- No data persistence (messages are only sent via email)
- Input validation and sanitization
- No sensitive data logged
- Credentials stored in environment variables only

## Notes

- Emails are sent via Google Workspace SMTP
- Contact requests are logged with timestamps only (no message content)
- No database or external services required

