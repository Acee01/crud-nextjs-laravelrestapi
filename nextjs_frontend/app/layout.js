import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>SIS | Home</title>
      <body>
        {children}
      </body>
    </html>
  );
}
