
import styles from './page.module.css'
import { ConverterContent } from '@/components/ConverterContent';
import { Progress } from '@/components/Progress';
import { AboutContent } from '@/components/AboutContent';

export default function Home() {
  return (
    <div className='Home'>
      <div className='Container'>
        <ConverterContent/>
        <AboutContent/>
      </div>
    </div>
  )
}
