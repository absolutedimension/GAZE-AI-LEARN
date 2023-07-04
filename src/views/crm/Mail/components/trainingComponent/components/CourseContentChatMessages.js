
import React, { useMemo, useState ,useEffect} from 'react'
import { Table } from 'components/ui'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { dataWithSubRows } from './data'
import { HiOutlinePlusCircle, HiOutlineMinusCircle,HiOutlineLockOpen,HiOutlineLockClosed ,HiOutlineFolderAdd,HiOutlineFolderOpen} from 'react-icons/hi'

import ReactMarkdown from 'react-markdown';

import { useSelector, useDispatch } from 'react-redux'

import { updateRemovedRow } from 'store/tutor/tutor'

import step1Data from 'assets/livecodedata/stepsData/step1.json';
import CourseContentChatBox from '../../CourseContentChatBox'

const { Tr, Th, Td, THead, TBody } = Table

function CourseContentChatMessages({chatWindowRef,isObjectUpdated}) {

    const dispatch= useDispatch();


    useEffect(() => {
        const chatWindow = chatWindowRef;
        console.log("inside formatttttttt use bharaaaaaaa");



        if (chatWindowRef.current) {
            const observer = new MutationObserver((mutations) => {
              // Handle mutations
            });
      
            observer.observe(chatWindowRef.current, {
              // Specify mutation observer options
            });
      
            return () => {
              observer.disconnect(); // Disconnect the observer when the component unmounts
            };
          }

     
        // if (chatWindow) {
        //     console.log("inside formatttttttt use effect"+ chatWindow.scrollHeight);
        //   chatWindow.scrollTop = chatWindow.scrollHeight;
        //   const observer = new MutationObserver(() => {
        //     chatWindow.scrollTop = chatWindow.scrollHeight;
        //   });
        //   observer.observe(chatWindow, { childList: true });
        //   return () => observer.disconnect();
        // }

     //   dispatch(formatScreenTutor());// Establish WebSocket connection on component mount


      
   
         
       }, [isObjectUpdated]);
   









    const columns = useMemo(
        () => [
            {
                id: 'expander',
                header: ({ table }) => {
                    return (
                        <button
                            className="text-xl"
                            {...{
                                onClick:
                                    table.getToggleAllRowsExpandedHandler(),
                            }}
                        >
                            {table.getIsAllRowsExpanded() ? (
                                <HiOutlineFolderOpen style={{ color: 'green' }}  />
                            ) : (
                                <HiOutlineFolderAdd style={{ color: 'green' }}  />
                            )}
                        </button>
                    )
                },
                cell: ({ row, getValue }) => {
                    return (
                        <>
                            {row.getCanExpand() ? (
                                <button
                                    className="text-xl"
                                    {...{
                                        onClick: row.getToggleExpandedHandler(),
                                    }}
                                >
                                    {row.getIsExpanded() ? (
                                        <HiOutlineFolderOpen style={{ color: 'green' }} />
                                    ) : (
                                        <HiOutlineFolderAdd style={{ color: 'green' }} />
                                    )}
                                </button>
                            ) : null}
                            {getValue()}
                        </>
                    )
                },
            },
            {
                header: 'Task to follow',
                accessorKey: 'message',
                // cell: ({ getValue, row }) => {
                //     const markdownContent = getValue() ? <ReactMarkdown>{getValue()}</ReactMarkdown> : null;
                //     return (
                //       <>
                //         {row.isLast && markdownContent ? (
                //           <div>
                //             <ReactMarkdown>{getValue()}</ReactMarkdown>
                //           </div>
                //         ) : (
                //           <>{flexRender(markdownContent, getValue())}</>
                //         )}
                //       </>
                //     );
                //   },
                
                cell: ({ getValue }) => {
                    const markdownContent = getValue() ? <ReactMarkdown>{getValue()}</ReactMarkdown> : null;
                    return <>{flexRender(markdownContent, getValue())}</>;
                  },
                  
                
            },
            {
                id: 'remove',
                header: '',
                cell: ({ row }) => (
                  <button onClick={() => handleRemoveRow(row)}>Remove</button>
                ),
              },
            // {
            //     header: 'Last Name',
            //     accessorKey: 'isMe',
          //  },
            // {
            // //    header: 'Age',
            //     accessorKey: 'age',
            // },
            // {
            //     header: 'Visits',
            //     accessorKey: 'visits',
            // },
            // {
            // //    header: 'Status',
            //     accessorKey: 'status',
            // },
            // {
            //     header: 'Profile Progress',
            //     accessorKey: 'progress',
            // },
        ],
        []
    )


    const handleRemoveRow = (row) => {
        // Remove the row from the data array
       
       
     //   console.log("inside delete==="+JSON.stringify(updatedData))
        dispatch(updateRemovedRow(row))
    
        // Update the data state
        // ... (code to update the data state using useState or Redux)
    
        // Optional: Update the expanded state if necessary
        // ... (code to update the expanded state based on the updated data)
    
        // Note: This is just an example, you need to implement the actual data update logic in your application
      };

  //  const [data] = useState(() => dataWithSubRows)
  //  const data = useSelector((state) => state.tutor.messages);
    const data = step1Data.messages;

    console.log("data from fixed==="+JSON.stringify(data));

    // data.forEach((obj) => {
    //     obj.subRows = [...state.newHistory];
    //   });
      
   //   console.log(mainArray);
     
      
      
      
      
   // const[data]  = dataTemp?(dataTemp):([]);
    const [expanded, setExpanded] = useState(true)

    // useEffect(() => {
    //     if (data.length > 0) {
    //       setExpanded({ [data[data.length - 1].id]: true });
    //     }
    //   }, [data[data.length - 1]]);

    const handleExpandedChange = (newExpanded) => {
        setExpanded(newExpanded);
      };

    // useEffect(() => {
    //     if (data.length > 0) {
    //       setExpanded((prevExpanded) => ({ ...prevExpanded, [data[0].id]: true }));
    //     }
    //   }, [data]);

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: handleExpandedChange,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
      
    })

    return (
        <>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                 return (
                                        <Td key={cell.id}>
                                        {
                                            
                                        
                                        
                                        
                                       
                                        flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                            )} 
                                        </Td>
                                  
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </>
    )
}

export default CourseContentChatMessages

