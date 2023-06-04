import './globals.css';
import '../i18next/config';
import {Header} from '../components/Header';

import { Montserrat } from 'next/font/google';

const mons = Montserrat({subsets: ['latin']});


export const metadata = {
  title: 'Home',
  description: 'Page Home Converter Currency',
}

export default function RootLayout({ children, params }) {
  return (
    <html lang="en" >
      <body className={mons.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
