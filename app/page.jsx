
import styles from './page.module.css'
import { Converter } from '@/components/Converter'

export default function Home() {
  return (
    <div className='Home'>
      <div className='Container'>
        <Converter/>
      </div>
    </div>
  )
}
