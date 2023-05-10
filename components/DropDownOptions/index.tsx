'use client';
import React, { useState } from 'react';
import { Check, ChevronDown, Circle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useQuizStore from '@/app/store';

type CategoryType = {
  id: number;
  name: string;
};

const type = ['boolean', 'multiple'];
const level = ['easy', 'medium', 'hard'];

const DropDownOption = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const config = useQuizStore((state: any) => state.config);
  const addCategory = useQuizStore((state: any) => state.addCategory);
  const addLevel = useQuizStore((state: any) => state.addLevel);
  const addType = useQuizStore((state: any) => state.addType);

  const fetchCategory = async () => {
    const { trivia_categories } = await (
      await fetch('https://opentdb.com/api_category.php')
    ).json();
    setCategory([...trivia_categories]);
  };

  React.useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className="flex items-center w-full py-5 justify-evenly">
      <div className="w-1/3 py-4 mx-4 px-7">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-between w-full px-10 py-3 rounded-lg shadow-lg outline-none hover:bg-blue-600 hover:text-white ">
            {config.category.name ? config.category.name : 'CATEGORY'} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {category.map((item, index) => (
              <DropdownMenuItem key={item.id} onClick={() => addCategory(item.id, item.name)}>
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-1/3 py-4 mx-4 px-7">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-between w-full px-10 py-3 rounded-lg shadow-lg outline-none hover:bg-blue-600 hover:text-white">
            {config.level ? config.level.toUpperCase() : 'LEVEL'} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {level.map((item, index) => (
              <DropdownMenuItem key={index} onClick={() => addLevel(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-1/3 py-4 mx-4 px-7">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-between w-full px-10 py-3 rounded-lg shadow-lg outline-none hover:bg-blue-600 hover:text-white">
            {config.type ? config.type.toUpperCase() : 'TYPE'} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {type.map((item, index) => (
              <DropdownMenuItem key={index} onClick={() => addType(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default DropDownOption;
