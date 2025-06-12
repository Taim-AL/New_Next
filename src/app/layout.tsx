import { AuthProvider } from "./context/auth-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // اختر الأوزان التي تحتاجها
  variable: '--font-open-sans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
