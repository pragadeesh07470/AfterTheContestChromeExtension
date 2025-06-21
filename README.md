# 🧠 AfterTheContest – Chrome Extension for Competitive Programming

**AfterTheContest** is a Chrome extension that enhances the post-contest experience for competitive programmers on [Codeforces](https://codeforces.com/). It allows users to submit and view solutions for problems and is designed with future support for AI-generated hints.

---

## 🚀 Features

- **User Authentication** – Secure login and registration with token-based authentication.
- **Solution Submission** – Submit titles and written solutions for any Codeforces problem.
- **Solution Viewing** – Retrieve and display existing solutions for a problem.
- **Codeforces Integration** – Automatically detects problem titles and URLs on Codeforces pages.
- **Logout Functionality** – Safely log out and remove stored tokens from Chrome storage.

---

## 📁 File Structure

| File              | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `manifest.json`   | Extension manifest file declaring permissions, scripts, and metadata.       |
| `register.html`   | UI for new user registration.                                               |
| `login.html`      | UI for user login.                                                          |
| `options.html`    | Main options page with login, register, and logout actions.                 |
| `contentForm.html`| Form for submitting a solution to a Codeforces problem.                     |
| `solutions.html`  | Popup for showing solutions (**planned feature**).                          |
| `register.js`     | JavaScript for handling registration (**not implemented yet**).             |
| `login.js`        | Sends login data and stores auth token in `chrome.storage.sync`.            |
| `logout.js`       | Removes the stored token to log the user out.                               |
| `contentForm.js`  | Handles solution submission with token and problem ID.                      |
| `contentScript.js`| Injected script that scrapes problem titles and URLs from Codeforces.       |
| `ApiCalls.js`     | Fetches existing solutions for a given problem ID.                          |

---

## 🛠 How It Works

### 1. Extension Behavior
- `manifest.json` sets up permissions, declares `contentScript.js`, and handles content injection on specific Codeforces URLs.
- `contentScript.js` listens for messages like `fetchProblemName` and `fetchProblemId`, and responds with the problem's metadata.
- `contentForm.html` provides a form for submitting the solution, with behavior managed by `contentForm.js`.

### 2. Authentication
- Login (`login.html`) and Registration (`register.html`) pages send credentials to the backend.
- Upon success, the backend returns a JWT token that is stored in `chrome.storage.sync`.
- Logout (`options.html` + `logout.js`) removes the token from storage.

### 3. Solution Submission
- On a problem page, the problem's URL is stored in `chrome.storage.local` (set via content script or background event).
- When users visit `contentForm.html`, the token and problem URL are read.
- A POST request is made to `/content/post` with the solution data.

### 4. Solution Viewing
- Solutions can be fetched by calling `getContents(problemId)` from `ApiCalls.js`, which performs a GET request to `/content/get?id={problemId}`.
- You can extend this logic to display solutions inside `solutions.html`.

---

## ⚙️ Setup Instructions

### 1. Backend Server (Required)
A backend server must be running at:

http://localhost:8080/


It must expose the following REST endpoints:

| Endpoint           | Method | Description                                  |
|--------------------|--------|----------------------------------------------|
| `/register`        | POST   | Register a new user with username, email, password |
| `/login`           | POST   | Login with username and password; returns JWT token |
| `/content/post`    | POST   | Submit a solution with `title`, `text`, and `forContentId` |
| `/content/get`     | GET    | Fetch solutions for a given `id` (problem URL) |

> The backend should:
> - Use JWT for authentication.
> - Validate and authorize requests based on the token.
> - Sanitize and validate all input to avoid security issues.

---

### 2. Running the Extension

#### Step-by-step:

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in top-right).
4. Click **Load unpacked** and select the folder containing this project.
5. The extension should now be visible in the Chrome toolbar.

---

## 🧪 Usage

1. Visit [https://codeforces.com/problemset/problem/1/A](https://codeforces.com/problemset/problem/1/A) or any other Codeforces problem.
2. Click the extension icon and use the interface to:
   - Log in via `options.html`.
   - Submit a solution via `contentForm.html`.
3. The solution gets stored and linked to the problem's unique URL.
4. Later, users can view these solutions (UI under construction in `solutions.html`).

---

## 📬 Developer Notes

- **Storage Strategy**:
  - `chrome.storage.sync` is used for the JWT token (syncs across devices).
  - `chrome.storage.local` is used for the current problem URL context.

- **Content Security Policy**:
  - Be cautious of remote content loading and script injection.
  - Always validate inputs and avoid hardcoding secrets.

- **Error Handling**:
  - Errors are displayed in the UI (`msg` spans) or logged in the console.
  - Consider improving UX with toast messages or modals in the future.

---

## 🌱 Future Enhancements

- [ ] **AI-Generated Hints** using LLM APIs.
- [ ] **User Profiles** to view personal submissions.
- [ ] **Search/Filter Interface** for solutions.
- [ ] **Improved UX/UI** across forms and views.
- [ ] **Full Implementation of `solutions.html`** for solution display and upvotes.

---
