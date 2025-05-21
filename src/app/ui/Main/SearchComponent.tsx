'use client';

import { usePathname, useSearchParams , useRouter} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from '@mui/icons-material/Search';
import "@/app/ui/Assets/Css/Main/OutNav.css"

export default function Search() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`)
  },300);

  return (
        <div className='outer-search-container'>
            <button title='search' className="button-search">
                <SearchIcon className="icon-search"/>
                </button>
                <input 
                    placeholder ="Search......" 
                    className='input-search'
                    onChange={(e) => {
                        handleSearch(e.target.value);
                        }}
                        defaultValue={searchParams.get('query')?.toString()}
                />
            </div>
  );
}
