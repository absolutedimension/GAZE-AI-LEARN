const dataWithSubRows = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        visits: 5,
        status: 'Active',
        progress: 50,
        subRows: [
            {
                id: 2,
                firstName: 'Jane',
                lastName: 'Smith',
                age: 25,
                visits: 7,
                status: 'Inactive',
                progress: 70,
            },
            {
                id: 3,
                firstName: 'Mike',
                lastName: 'Johnson',
                age: 35,
                visits: 3,
                status: 'Active',
                progress: 30,
            },
        ],
    },
    {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Williams',
        age: 28,
        visits: 10,
        status: 'Active',
        progress: 80,
    },
    {
        id: 5,
        firstName: 'Tom',
        lastName: 'Davis',
        age: 32,
        visits: 12,
        status: 'Inactive',
        progress: 90,
        subRows: [
            {
                id: 6,
                firstName: 'Emily',
                lastName: 'Anderson',
                age: 29,
                visits: 8,
                status: 'Active',
                progress: 60,
            },
        ],
    },
];

export { dataWithSubRows };
