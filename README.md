# React Redux Code Editor 🖥️

A **web-based code editor** built with **React, Redux Toolkit, and Monaco Editor**, supporting multiple languages, file tabs, theme toggling, and an output console.  
Inspired by VS Code, this project demonstrates **modern frontend architecture** and state management.

---

## Demo

![Code Editor Screenshot](screenshot.png)  
*(Replace with actual screenshot after running the app)*

---

## Features

- **Multi-Language Support**: JavaScript, Python (expandable)  
- **Theme Toggle**: Switch between Dark & Light modes  
- **File Tabs**: Create and switch between multiple files  
- **Redux State Management**: Centralized editor, files, theme, and output state  
- **Output Console**: View program output or errors  
- **Responsive UI**: Works on desktop and tablet viewports  
- **Scalable Architecture**: Feature-based Redux slices and reusable components  

---

## Tech Stack

- **Frontend**: React 18  
- **State Management**: Redux Toolkit  
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)  
- **Styling**: Tailwind CSS  
- **Routing**: React Router DOM  
- **Build Tool**: Vite  

---

## Folder Structure

src/
├── app/ # Redux store setup
├── components/ # Reusable UI components
├── features/ # Redux slices (editor, files, theme, output)
├── pages/ # Page components
├── services/ # API or utility services
├── styles/ # Global styles
├── App.jsx
└── main.jsx
