'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import SearchMagnifierIcon from './SearchMagnifierIcon';

export default function Search() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = search.trim();
    if (query) router.push(`/results/${encodeURIComponent(query)}`);
    setSearch('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center md:justify-between"
    >
      <div className="relative w-[260px] sm:w-80">
        <SearchMagnifierIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          aria-label="Search photos"
          className="w-full bg-white py-2 pr-2 pl-10 text-xl rounded-xl text-black focus:outline-green-600"
        />
      </div>
    </form>
  );
}
