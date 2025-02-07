# SuperCTRL Contact Form Server

Backend server for handling contact form submissions on the SuperCTRL website.

## Setting Up Node.js

1. **Install Node.js**: Use [nvm](https://github.com/nvm-sh/nvm) to install the Node.js version specified in `.nvmrc`:
   ```sh
   nvm install
## Setup

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. For development with auto-reload:
```bash
npm run dev
```

## Environment Variables

5. Create a `.env` file in the server directory:

```env
PORT=3000
```

## API Endpoints

### POST /api/contact
Submit a new contact form message.

Request body:
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

### GET /api/messages
Get all contact form messages.

## File Storage

Messages are stored in JSON format in the `messages` directory. Each message is saved in a separate file with the format: `[timestamp]_[name].json`

## Dependencies

- express
- body-parser
- cors
- nodemon (dev)
