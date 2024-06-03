# Control panel

## Overview

This is a simple web application built with React for the frontend and Node.js with Express for the backend. It allows users to log in using Google OAuth2, view account details, and update account information.


## Tech Stack

- **Frontend**: React, TypeScript, Material-UI
- **Backend**: Node.js, Express, TypeScript
- **Authentication**: OAuth2

### Steps

1. Clone the repository:

```bash
git clone https://github.com/ivan-sk/control-panel.git
cd control-panel
```

2. Install dependencies for root, frontend and backend:

```bash
# root 
npm install

# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install

```

3. Set up environment variables:
Create a .env file in the backend directory with the following vars:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
SESSION_SECRET=
ORIGIN=
```


Create a .env file in the frontend directory with the following vars:

```env
REACT_APP_GOOGLE_CLIENT_ID
REACT_APP_GOOGLE_CALLBACK_URL
REACT_APP_BACKEND_URL
```

4. Run both backend & frontend with single command from project root directory:
```bash
npm run start
```
