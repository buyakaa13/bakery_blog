import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.tsx'
import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';
import './output.css';
import { StrictMode } from 'react';
import Bookmark from './Bookmark/index.tsx';
import Filter from './Filter/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance="dark" className='full'>
      <Bookmark/>
      <Filter/>
      <App/>
    </Theme>
  </StrictMode>
)
