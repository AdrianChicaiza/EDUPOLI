import { VscLoading   as Spinner } from 'react-icons/vsc';
import style from './css/Loading.module.css'

export default function Loading() {
    
  return (
    <div className={`${style.spinner}`}>
      <Spinner className={style.spinning} size={50}/>
      <a className={style.text}>Cargando...</a>
    </div>
  )
}
