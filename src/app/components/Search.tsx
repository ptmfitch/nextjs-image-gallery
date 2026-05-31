'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const SEARCH_MAGNIFIER_SIZE_PX = 20;
const SEARCH_MAGNIFIER_INSET_PX = 12;
const SEARCH_INPUT_LEFT_PADDING_PX = 40;

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
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={SEARCH_MAGNIFIER_SIZE_PX}
          height={SEARCH_MAGNIFIER_SIZE_PX}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500"
          style={{ left: SEARCH_MAGNIFIER_INSET_PX }}
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="bg-white p-2 w-[260px] sm:w-80 text-xl rounded-xl text-black focus:outline-green-600"
          style={{ paddingLeft: SEARCH_INPUT_LEFT_PADDING_PX }}
        />
      </div>
    </form>
  );
}
