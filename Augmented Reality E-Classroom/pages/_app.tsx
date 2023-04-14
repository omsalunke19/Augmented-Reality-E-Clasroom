import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Nunito, Nunito_Sans, Roboto } from '@next/font/google'
import LeftSidebar from '@/components/Sidebars/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/Sidebars/RightSidebar/RightSidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"]
})

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ['200', '300', "400", "600", "700", "800"]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`bg-Lightest h-[100vh] grid grid-cols-12 ${nunito.variable} ${nunito_sans.variable}`}>
      <LeftSidebar />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RightSidebar />
    </main>
  )
}
