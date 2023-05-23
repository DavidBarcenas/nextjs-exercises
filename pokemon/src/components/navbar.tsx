import Image from 'next/image'

export function Navbar() {
  return (
    <nav>
      <ul className="text-lg font-semibold">
        <li className="cursor-pointer">
          <Image
            src="/pokeball.png"
            alt="Captured"
            width={50}
            height={50}
            className="inline-block"
          />
          <span>Captured</span>
        </li>
      </ul>
    </nav>
  )
}
