# 🌾 Cropzen — Smart Crop Trading Platform

**Cropzen** is a modern web platform designed to connect farmers and buyers in a transparent, easy, and efficient way.  
It helps farmers showcase their fresh produce, while buyers can explore available crops, negotiate quantities, and express purchase interests seamlessly.



---

## 🚀 Features

- 🌱 **Dynamic Crop Management:** Farmers can add, edit, and manage their listed crops with complete control over pricing and availability.  
- 👨‍🌾 **Interest System:** Buyers can express interest in specific crops, set their desired quantity, and send messages directly to farmers.  
- 📊 **Interactive Dashboard:** Farmers can view and manage received interests, update statuses (Accepted / Rejected), and track stock changes automatically.  
- 🔒 **Secure Authentication:** Email/password login and registration ensure data privacy and personalized experiences.  
- 🧭 **Smooth User Navigation:** Responsive, mobile-friendly interface with protected routes for logged-in users and a dedicated 404 page for invalid URLs.  
- 🪄 **Instant UI Updates:** Real-time feedback and status updates after every crop or interest action.  

---

## 💻 Tech Stack

**Frontend:** React.js, React Router, Tailwind CSS, Recharts  
**Backend:** Node.js, Express.js, MongoDB  
**Authentication:** Firebase Authentication  
**Hosting:** Firebase / Vercel  

---

## 📘 How It Works

1. Farmers create an account and list crops with name, category, location, price, and available quantity.  
2. Buyers browse all listed crops and send an *interest request* with a message and quantity.  
3. Farmers review all received interests in each crop’s detail page and can accept or reject them.  
4. Once accepted, the crop’s available quantity automatically decreases.  
5. Both parties can track interactions in “My Posts” and “My Interests” sections.

---

## 🧩 Developer Notes

- Built with a modular folder structure for scalability.  
- Uses reusable React components for crops, tables, and modals.  
- Backend API endpoints handle CRUD operations and real-time updates efficiently.  
- 404 Not Found page is isolated from the main layout to prevent navbar/footer display.  
- Clean, consistent UI design with professional Tailwind styling.  


---

© 2025 **Cropzen** — Empowering Farmers, Connecting Markets.