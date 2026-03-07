🐶 Dogstudio Frontend Clone

A visually rich frontend clone of the Dogstudio website built using modern web technologies.
This project focuses on 3D interactions, smooth scroll animations, and immersive UI experiences.

The goal of this project was to explore 3D rendering and animation workflows in React using Three.js and GSAP while replicating the interactive design style of Dogstudio.

🌐 Live Demo

🔗 Demo: https://dog-studio-clone-eight.vercel.app/
🔗 Original Inspiration: https://dogstudio.co

✨ Features

🎨 Modern UI inspired by Dogstudio

🧊 3D Models rendered with React Three Fiber

🎞 Smooth Scroll Animations with GSAP

⚡ High-performance WebGL rendering

📱 Responsive layout

🖱 Scroll-driven scene transitions

🧩 Component-based React architecture

🛠 Tech Stack
Technology	Purpose
React	Frontend Framework
Three.js	3D Rendering
@react-three/fiber	React Renderer for Three.js
@react-three/drei	Useful helpers for R3F
GSAP	Animations
ScrollTrigger	Scroll-based animations
CSS	Styling
📂 Project Structure
dogstudio-clone
│
├── public
│   └── models
│
├── src
│   ├── components
│   │   ├── Dog.jsx
│   │   ├── Scene.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
│
└── package.json
🚀 Installation

Clone the repository:

git clone https://github.com/your-username/dogstudio-clone.git

Navigate into the project folder:

cd dogstudio-clone

Install dependencies:

npm install

Run the development server:

npm run dev
🎬 Animation Workflow

The project uses GSAP Timeline + ScrollTrigger to control 3D object movements.

Example:

gsap.timeline({
  scrollTrigger: {
    trigger: "#section-1",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
})
.to(model.position, {
  z: -3,
  x: 0.2
})

This allows the 3D model to animate based on scroll position.

📸 Preview

Add screenshots or GIFs here for better presentation.

Example:

/preview/landing.png
/preview/animation.gif
🎯 Learning Goals

This project helped me learn:

Integrating Three.js with React

Creating scroll-driven animations

Managing 3D scenes in web apps

Structuring interactive frontend projects

📌 Future Improvements

🔹 Add more scene transitions

🔹 Improve mobile responsiveness

🔹 Optimize 3D performance

🔹 Add more interactive animations

🙌 Acknowledgements

Inspired by the amazing design of Dogstudio.

This project is for educational purposes only.