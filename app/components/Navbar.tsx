'use client'

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="font-bold text-lg">Meu Projeto</h1>
      <div className="flex gap-4">
        <Link href="/" className="hover:text-blue-200">Início</Link>
        <Link href="/user" className="hover:text-blue-200">Usuários</Link>
      </div>
    </nav>
  );
}
