interface HomeProps {
  poolCount: number;
  guessesCount: number;
  userCount: number;

}
import Image from 'next/image';
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import Logo from '../assets/logo.svg'
import Avatar from '../assets/users-avatar-example.png'
import Checkimg from '../assets/icon-check.svg'
import { api } from '../lib/axios';
export default function Home(props: HomeProps) {
  return (
    <div className='max-w-[1024px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <main>
        <Image src={Logo} alt="Logo" />

        <h1 className='mt-14 text-white text-5xl 
        font-bold 
        leading-tight'>Crie seu próprio belão da copa e compartilhe entre amigos!</h1>
      
        <div className='mt-10 flex items-center gap-2'>
        <Image src={Avatar} alt="avatar" />
        <strong className='text-gray-100 text-xl'>
          <span className='text-ignite-500'>+{props.userCount}</span> Pessoas já estão usando
        </strong>
        </div>
        <form className='mt-10 flex gap-2' >
          <input className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm' type="text" placeholder='Qual nome do seu bolão'/>
          <button className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700' type='submit' >Criar meu bolão</button>
        </form>
        <p className='mt-4 font-sm text-gray-300 leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas</p>

        <div className='mt-10 pt-10 border-t border-gray-600 divide-x flex justify-between  text-gray-100'>
        
          <div className='flex items-center gap-6'>
            <Image src={Checkimg} alt="ok" />
            <div className='flex flex-col'>
            <span className='font-bold text-2lx'>+{props.poolCount}</span>
              <span className=' '>Bolões criados</span></div>
          </div>
          <div className='w-px h-full bg-gray-600'/>
              {/* //full para 14 */}
          <div className='flex items-center gap-6'>
          <Image src={Checkimg} alt="ok" />
            <div className='flex flex-col'>
              <span className='font-bold text-2lx'>+{props.guessesCount}</span>
              <span className=' '>Palpites criados</span></div>
          </div>
          
        </div>
      </main>

      <Image src={appPreviewImg} alt="Dois celulares" />
    </div>
    )
}

export const getServerSideProps = async () => {

const [poolCountRes,guessesCountRes,userCountRes] = await Promise.all([
  api.get('pools/count'),
  api.get('guesses/count'),
  api.get('users/count'),

])
 return {
  props: {
    poolCount: poolCountRes.data.count,
    guessesCount: guessesCountRes.data.count,
    userCount: userCountRes.data.count,
  }
 }

}