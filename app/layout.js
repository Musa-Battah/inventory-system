import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Inventory Management System',
  description: 'Track products, stock levels, and suppliers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}