import { createRoot } from 'react-dom/client'
import './index.css';
import "@radix-ui/themes/styles.css";
import './output.css';
import { StrictMode } from 'react';
import HomePage from './MyComponents/HomePage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <HomePage/>
  </StrictMode>
)
