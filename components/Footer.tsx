import { Instagram, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-center items-center space-x-4">
        <a href="https://www.instagram.com/epidoey" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <Instagram size={24} />
        </a>
        <a href="https://www.linkedin.com/in/evid-wijaya" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <Linkedin size={24} />
        </a>
        <a href="mailto:enwcorp@gmail.com" className="hover:text-gray-300">
          <Mail size={24} />
        </a>
      </div>
    </footer>
  )
}

