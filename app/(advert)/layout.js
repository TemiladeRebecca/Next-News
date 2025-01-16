import '../globals.css';

export const metadata = {
  title: 'Next News',
  description: 'Instant News, Just One Click Away.',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      
      <body>
        {children}
        </body>
    </html>
  )
}
