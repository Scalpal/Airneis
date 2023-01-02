import { Quicksand } from '@next/font/google';
import Navbar from '@/components/Navbar';

const quicksand = Quicksand({
  weight: '300',
  subsets: ['latin']
});


const Layout = ({ children }) => {

  return (
    <div className={quicksand.className}>

      <Navbar />

      <main>
        {children}
      </main>

    </div>
  );
};

export default Layout;