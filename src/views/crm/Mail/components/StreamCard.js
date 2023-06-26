import React from 'react';

import { HiOutlineLockClosed } from 'react-icons/hi'
import { ScrollBar, Avatar, Button,Card} from 'components/ui'
import { useState,useEffect } from 'react';

import useThemeClass from 'utils/hooks/useThemeClass'

const StreamCard = ({ index, variable }) => {
    const { textTheme, borderTheme } = useThemeClass();
//    const [row, setRow] = useState('');

//   useEffect(() => {
//     console.log("Row changed===="+row);
//     setRow(index % 2 === 0 ? 'even' : 'odd');
//   }, [index]);

  return (
  
       <Card className="mb-4">
            <div className="md:flex items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    {!true ? (
                        <span className="text-3xl">
                            <HiOutlineLockClosed />
                        </span>
                    ) : (
                        <span
                            className={`font-semibold text-xl rounded-full border-2 min-w-[30px] h-[30px] flex items-center justify-center ${borderTheme} ${textTheme}`}
                        >
                            {index}
                        </span>
                    )}
                    <div>
                        <h5>{index}</h5>
                        <p>{variable}</p>
                    </div>
                </div>
                <Button
                    disabled={!true}
                    variant="solid"
                    className="mt-4 md:mt-0"
                    size="sm"
                //    onClick={handleClick}
                >
                    {"start"}
                </Button>
            </div>
        </Card>
 
  );
};

export default StreamCard;
