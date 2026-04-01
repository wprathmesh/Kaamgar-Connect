#Kamgaar Connect
👷 Kamgaar Connect
A Hyper-Local Marketplace for Daily-Wage Workers & Organizations.

Getty Images

🌟 The Vision
In cities like Bhopal, daily-wage workers (masons, electricians, plumbers) often struggle to find consistent work, while customers struggle to find reliable help nearby. Kamgaar Connect removes the middleman. It allows workers to "Broadcast" their live location and skills, enabling customers and large organizations within a 5km radius to hire them instantly via Call or WhatsApp.

🚀 Core Features
1. Three-Tier Dashboard System
Worker Mode: Simple UI for workers to "Go Live" with their skill, area, and expected wage. Includes a "Job Board" to find projects posted by companies.

Customer Mode: A map-less discovery view to find and call the nearest available help.

Organization Portal: A professional interface for companies to "Invite" workers to large-scale construction or maintenance projects.

2. Smart Hiring Logic
Geospatial Discovery: Filters workers using MongoDB 2dsphere indexing to ensure only those within 5km are visible, reducing travel time for the laborer.

One-Tap Connectivity: Integrated WhatsApp API for instant job invites and a direct Dialing feature.

Strict Validation: A custom 10-digit phone number clamp and verification logic to ensure data integrity.

3. Modern Tech Stack
Frontend: React.js + Vite (for lightning-fast performance).

Backend: Node.js & Express.js.

Database: MongoDB Atlas (Cloud) for global data persistence.

Styling: Custom CSS with Glassmorphism and high-contrast accessibility (Dark Navy on Slate).

🛠️ Technical Deep Dive
Geospatial Querying
The heart of the app is the 5km radius logic. Instead of a simple "find all," the backend uses a spherical geometry calculation:

JavaScript
// MongoDB Geospatial Query
{
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [lng, lat] },
      $maxDistance: 5000 // 5 Kilometers
    }
  }
}
Authentication Flow
Mobile + OTP: Designed for workers and customers for high accessibility.

Gmail OAuth (Mock): A fast, one-tap login for Organizations to quickly access the portal.

📂 Project Structure
Plaintext
kamgaar-connect/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── pages/      # Login.jsx, Home.jsx
│   │   └── App.jsx     # Role-based routing logic
├── backend/            # Node.js + Express server
│   ├── models/         # MongoDB Mongoose Schemas
│   └── server.js       # API Routes & Atlas Connection
└── README.md
⚙️ Installation
Clone the Repo:

Bash
git clone https://github.com/wprathmesh/kamgaar-connect.git
Setup Backend:

Bash
cd backend
npm install
# Add your MongoDB Atlas URI in server.js
node server.js
Setup Frontend:

Bash
cd frontend
npm install
npm run dev
🔮 Future Roadmap
Multi-language Support: Adding Hindi and Hinglish for better worker accessibility.

Worker Rating System: Allowing customers to leave 5-star reviews to build worker credibility.

Real-time Notifications: SMS alerts when an Organization "Invites" a worker to a job.

👨‍💻 Developed By
Prathamesh Building tech for social impact in Bhopal.

⚙️ Installation & Setup
Clone the repository:

Bash
git clone https://github.com/wprathmesh/kamgaar-connect.git
Setup Backend:

Bash
cd backend
npm install
# Update your MongoDB Atlas URI in server.js
node server.js
Setup Frontend:

Bash
cd frontend
npm install
npm run dev
