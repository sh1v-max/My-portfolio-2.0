# VS Code Themed Portfolio 👨‍💻

A personal portfolio website inspired by the Visual Studio Code editor, designed to showcase my skills, projects, and articles. 

**Live Demo:** [singhshiv.netlify.app](https://singhshiv.netlify.app/)

## 🚀 Features

- **VS Code Inspired UI:** Familiar layout including an Explorer, Sidebar, Tabs, and Bottom Bar.
- **Multiple Themes:** Choose from popular editor themes like GitHub Dark, Dracula, Nord, Night Owl, and Ayu Dark.
- **GitHub Integration:** Dynamic GitHub stats, contribution graph, and featured repositories.
- **Fully Responsive:** Optimized for a seamless experience on both desktop and mobile devices.
- **Interactive Components:** Smooth animations and intuitive page transitions.

## 💻 Tech Stack

- **Framework:** [React.js](https://reactjs.org/) (v18)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/) (v6)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Key Libraries:** 
  - `tw-colors` for dynamic theme management
  - `react-github-calendar` for the GitHub contribution graph
  - `react-hook-form` & `@emailjs/browser` for the contact form
  - `swiper` for interactive project carousels

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sh1v-max/My-portfolio-2.0.git
   cd My-portfolio-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
src/
├── assets/         # Images, icons, and static files
├── components/     # Reusable UI components (Explorer, NavBar, SideBar, etc.)
├── context/        # React Context for global state (e.g., ThemeContext)
├── features/       # Feature-based modules (Pages & their specific components)
│   ├── about/      # About Me section
│   ├── articles/   # Blog articles section
│   ├── contact/    # Contact form
│   ├── github/     # GitHub stats and repos integration
│   ├── home/       # Landing page
│   ├── projects/   # Projects showcase
│   └── settings/   # Theme and app settings
├── services/       # API calls and external services
├── App.jsx         # Main application component & Routing setup
└── main.jsx        # React entry point
```

## 🎨 Themes Available

You can easily switch between the following themes:
- GitHub (Default)
- Dracula
- Ayu Dark
- Ayu Mirage
- Nord
- Night Owl

## 👨‍💼 About Me

I'm **Shiv Shankar Singh**, a passionate Front-End React Developer based in Varanasi, India. I specialize in building responsive, accessible, and performant web applications using modern web technologies.

## 📬 Contact

- **Email:** [singhshiv0427@gmail.com](mailto:singhshiv0427@gmail.com)
- **LinkedIn:** [shiv-shankar-singh-](https://www.linkedin.com/in/shiv-shankar-singh-/)
- **GitHub:** [sh1v-max](https://github.com/sh1v-max/)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).