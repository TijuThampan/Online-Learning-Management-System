Getting Started
Clone the project from the updated repository:


git clone https://github.com/TijuThampan/Online-Learning-Management-System.git
Navigate into the client directory:


cd Online-Learning-Management-System/client
Install dependencies:



npm install
Run the development server:


npm run dev
Tailwind CSS Integration
Step-by-Step Guide
Install Tailwind CSS and its dependencies:


npm install -D tailwindcss postcss autoprefixer
Initialize Tailwind CSS configuration:


npx tailwindcss init -p
This creates a tailwind.config.js and a postcss.config.js file in your project directory.

Configure Tailwind CSS in your project:

Update the tailwind.config.js to include the paths to all of your template files:


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require('daisyui')],
}
Include Tailwind in your CSS:

Open your main CSS file (usually src/index.css) and add the following Tailwind directives:


@tailwind base;
@tailwind components;
@tailwind utilities;
Install additional dependencies and plugins:

These may include routing, state management, charting libraries, UI components, and utilities:


npm install react-router-dom react-icons axios react-redux @reduxjs/toolkit react-chartjs-2 chart.js daisyui react-toastify @tailwindcss/line-clamp emailjs-com
Add DaisyUI plugin to Tailwind configuration (if not already added in step 3):

This step is optional if you've already configured it. If not, modify the tailwind.config.js as follows:


module.exports = {
  // existing config
  plugins: [require('daisyui')],
}
Documentation
For more details, refer to the official Tailwind CSS Documentation.