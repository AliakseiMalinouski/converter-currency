
import styles from './page.module.css'
import { Converter } from '@/components/Converter';
import { Progress } from '@/components/Progress';

export default function Home() {
  return (
    <div className='Home'>
      <div className='Container'>
        <Converter/>
      </div>
    </div>
  )
}
