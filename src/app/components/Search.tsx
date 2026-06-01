'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import SearchIcon from './SearchIcon';

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
      <div className="relative w-search-input sm:w-search-input-sm">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          aria-label="Search photos"
          className="w-full rounded-xl bg-white py-2 pr-2 pl-10 text-xl text-black focus:outline-green-600"
        />
      </div>
    </form>
  );
}
