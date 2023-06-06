
import styles from './page.module.css'
import { ConverterContent } from '@/components/ConverterContent';
import { Progress } from '@/components/Progress';

export default function Home() {
  return (
    <div className='Home'>
      <div className='Container'>
        <ConverterContent/>
      </div>
    </div>
  )
}
