import Link from "next/link"; 
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid";


const Navbar = () => {

  return (
    <nav>
      <Link href="/home"> Airneis </Link>

      <ul>
        <li> <Link href="/home"> Home </Link> </li>
        <li> <Link href="/products"> Products </Link> </li>
        <li> <Link href="/categories"> Categories </Link> </li>
        <li> <Link href="/about"> About </Link> </li>
        <li> <Link href="/contact"> Contact us </Link> </li>
      </ul>

      <ul>
        <button> <MagnifyingGlassIcon className='navbar__icons' /> </button>
        <button> <ShoppingCartIcon className='navbar__icons' /> </button>
        <button> <UserIcon className='navbar__icons' />  </button>
      </ul>
    
    </nav>
  );
};

export default Navbar;