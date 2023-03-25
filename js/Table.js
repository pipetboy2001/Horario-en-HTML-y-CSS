/**
 * Feel free to learn! ^_^
 * -- Felipe Fernandez, 2023
 */

const createTable = () => {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    //Enter your classes
    const classes = [
        { name: 'SISTEMAS OPERATIVOS', color: '#cdecef'},
        { name: 'PROYECTO DE INGENIERÍA DE SOFTWARE', color: '#ceeccd' },
        {name: 'TALLER DE INVESTIGACIÓN', color: '#e8c9c9'},
        { name: 'BÚSQUEDA Y RECUPERACIÓN DE INFORMACIÓN', color: '#80deea'}
    ];
    // Modify according to your schedule
    const days = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const rows = [
        ['08:15 - 09:35', '', '', '', 'PROYECTO DE INGENIERÍA DE SOFTWARE', ''],
        ['09:50 - 11:10', '', '', '', 'PROYECTO DE INGENIERÍA DE SOFTWARE', 'PROYECTO DE INGENIERÍA DE SOFTWARE'],
        ['11:25 - 12:45', '', 'TALLER DE INVESTIGACIÓN', 'TALLER DE INVESTIGACIÓN', '', ''],
        ['13:45 - 15:05', 'SISTEMAS OPERATIVOS', '', '', 'SISTEMAS OPERATIVOS', ''],
        ['15:20 - 16:40', '', '', '', 'TALLER DE INVESTIGACIÓN', ''],
        ['16:55 - 18:15', '', '', 'SISTEMAS OPERATIVOS', '', ''],
        ['18:45 - 20:05', '', '', 'BÚSQUEDA Y RECUPERACIÓN DE INFORMACIÓN', '', 'BÚSQUEDA Y RECUPERACIÓN DE INFORMACIÓN'],
        ['20:05 - 21:25', '', '', 'BÚSQUEDA Y RECUPERACIÓN DE INFORMACIÓN', '', '']
    ];

    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    document.getElementById('table').appendChild(table);

    // Create and add data to the table head
    const headRow = document.createElement('tr');
    days.forEach((day) => {
        const th = document.createElement('th');
        th.innerHTML = day;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);

    // Create and add data to the table body
    rows.forEach((rowData) => {
        const row = document.createElement('tr');
        rowData.forEach((data, index) => {
            const td = document.createElement('td');
            if (index === 0) {
                td.innerHTML = data;
            } else {
                td.innerHTML = data;
                for (let i = 0; i < classes.length; i++) {
                    if (data === classes[i].name) {
                        td.style.backgroundColor = classes[i].color;
                        break;
                    }
                }
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
        
    });
}
createTable();
