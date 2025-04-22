// components/Layout.tsx
import CartDrawer from './CartDrawer';
import { CustomProvider } from './CustomContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <CustomProvider>
      <main>{children}</main>
      <CartDrawer />
    </CustomProvider>
  );
};

export default Layout;