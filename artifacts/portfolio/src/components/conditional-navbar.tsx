import { useLocation } from 'wouter';
import Navbar from '@/components/layout/navbar';

export default function ConditionalNavbar() {
  const [pathname] = useLocation();
  
  const validRoutes = ['/', '/profile', '/projects', '/resume'];
  
  const isValidRoute = 
    validRoutes.includes(pathname) || 
    pathname.startsWith('/projects/');
  
  if (!isValidRoute) {
    return null;
  }
  
  return <Navbar />;
}
