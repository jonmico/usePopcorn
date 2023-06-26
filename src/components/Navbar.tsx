interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return <nav className='nav-bar'>{children}</nav>;
}
