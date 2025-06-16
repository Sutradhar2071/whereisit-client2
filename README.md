# WhereIsIt - Lost & Found Item Tracker

A user-friendly platform to help users post, track, and find lost or found items. This project is part of the Assignment 11 from Programming Hero Web Dev course.

### 🔗 Live Website
https://whereisit-61ba5.web.app/

---

## 🚀 Purpose
The purpose of this project is to allow users to:
- Post lost or found items
- Search and filter items by category, location, date
- Update item status (claimed/unclaimed)
- Securely manage personal items and profile

---

## 💡 Key Features
- Firebase Authentication (Email/Google Login)
- Private Route Protection with JWT
- Add/Update/Delete item functionalities
- View all items and item details
- Filter and sort lost/found items
- Date picker and formatted dates using `date-fns`
- Lottie animations for UI enhancement
- Responsive on all devices (Mobile, Tablet, Desktop)
- Light/Dark theme toggle

---

## 🛠️ Technologies & Libraries Used
- React
- React Router
- Tailwind CSS + DaisyUI
- Firebase Auth
- Axios
- JWT Token Handling
- Lottie React
- Date-fns
- React Date Picker
- SweetAlert2
- React Helmet

---

## 🔒 Firebase Key Security
All Firebase configuration keys are stored in `.env` file and used via:


VITE_FIREBASE_API_KEY=AIzaSyCbYgocDbO5CoL1wuZGwc8w88-4pi_QGEI
VITE_FIREBASE_AUTH_DOMAIN=whereisit-61ba5.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=whereisit-61ba5
VITE_FIREBASE_STORAGE_BUCKET=whereisit-61ba5.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=983033208844
VITE_FIREBASE_APP_ID=1:983033208844:web:ee2c1861c7851506ed4e29

...
