let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

// Adding the entire table to the body tag
document.getElementById('table').appendChild(table);

// Creación y adición de datos a la primera fila de la tabla
let row_1 = document.createElement('tr');
let heading_1 = document.createElement('th');
heading_1.innerHTML = "Time";
let heading_2 = document.createElement('th');
heading_2.innerHTML = "lunes";
let heading_3 = document.createElement('th');
heading_3.innerHTML = "martes";
let heading_4 = document.createElement('th');
heading_4.innerHTML = "miercoles";
let heading_5 = document.createElement('th');
heading_5.innerHTML = "jueves";
let heading_6 = document.createElement('th');
heading_6.innerHTML = "viernes";

row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
row_1.appendChild(heading_6);
thead.appendChild(row_1);


// Creación y adición de datos a la segunda fila de la tabla
let row_2 = document.createElement('tr');
let row_2_data_1 = document.createElement('td');
row_2_data_1.innerHTML = "08:15 - 09:35";

let row_2_data_2 = document.createElement('td');
row_2_data_2.innerHTML = " Admin INF520";
let row_2_data_3 = document.createElement('td');
row_2_data_3.innerHTML = " ";
let row_2_data_4 = document.createElement('td');
row_2_data_4.innerHTML = " ";
let row_2_data_5 = document.createElement('td');
row_2_data_5.innerHTML = " ";
let row_2_data_6 = document.createElement('td');
row_2_data_6.innerHTML = "ADMIN INF520";

row_2.appendChild(row_2_data_1);
row_2.appendChild(row_2_data_2);
row_2.appendChild(row_2_data_3);
row_2.appendChild(row_2_data_4);
row_2.appendChild(row_2_data_5);
row_2.appendChild(row_2_data_6);
tbody.appendChild(row_2);


// Creación y adición de datos a la tercera fila de la tabla
let row_3 = document.createElement('tr');
let row_3_data_1 = document.createElement('td');
row_3_data_1.innerHTML = "09:50 - 11:10";
let row_3_data_2 = document.createElement('td');
row_3_data_2.innerHTML = "Admin INF520";
row_3_data_2.style.backgroundColor = "red";
let row_3_data_3 = document.createElement('td');
row_3_data_3.innerHTML = " ";
let row_3_data_4 = document.createElement('td');
row_3_data_4.innerHTML = "Sistope EAO561";
let row_3_data_5 = document.createElement('td');
row_3_data_5.innerHTML = "Sistope ED705";
let row_3_data_6 = document.createElement('td');
row_3_data_6.innerHTML = " ";

row_3.appendChild(row_3_data_1);
row_3.appendChild(row_3_data_2);
row_3.appendChild(row_3_data_3);
row_3.appendChild(row_3_data_4);
row_3.appendChild(row_3_data_5);
row_3.appendChild(row_3_data_6);
tbody.appendChild(row_3);

// Creación y adición de datos a la cuarta fila de la tabla
let row_4 = document.createElement('tr');
let row_4_data_1 = document.createElement('td');
row_4_data_1.innerHTML = "11:25 - 12:45";
let row_4_data_2 = document.createElement('td');
row_4_data_2.innerHTML = "Sistope INF526";
let row_4_data_3 = document.createElement('td');
row_4_data_3.innerHTML = " ";
let row_4_data_4 = document.createElement('td');
row_4_data_4.innerHTML = " ";
let row_4_data_5 = document.createElement('td');
row_4_data_5.innerHTML = " ";
let row_4_data_6 = document.createElement('td');
row_4_data_6.innerHTML = " ";

row_4.appendChild(row_4_data_1);
row_4.appendChild(row_4_data_2);
row_4.appendChild(row_4_data_3);
row_4.appendChild(row_4_data_4);
row_4.appendChild(row_4_data_5);
row_4.appendChild(row_4_data_6);
tbody.appendChild(row_4);

// Creación y adición de datos a la quinta fila de la tabla
let row_5 = document.createElement('tr');
let row_5_data_1 = document.createElement('td');
row_5_data_1.innerHTML = "13:45 - 15:05";
let row_5_data_2 = document.createElement('td');
row_5_data_2.innerHTML = "Redes INF202";
let row_5_data_3 = document.createElement('td');
row_5_data_3.innerHTML = " ";
let row_5_data_4 = document.createElement('td');
row_5_data_4.innerHTML = "Tingeso ED802";
let row_5_data_5 = document.createElement('td');
row_5_data_5.innerHTML = "Redes EAO518";
let row_5_data_6 = document.createElement('td');
row_5_data_6.innerHTML = " ";

row_5.appendChild(row_5_data_1);
row_5.appendChild(row_5_data_2);
row_5.appendChild(row_5_data_3);
row_5.appendChild(row_5_data_4);
row_5.appendChild(row_5_data_5);
row_5.appendChild(row_5_data_6);
tbody.appendChild(row_5);

// Creación y adición de datos a la sexta fila de la tabla
let row_6 = document.createElement('tr');
let row_6_data_1 = document.createElement('td');
row_6_data_1.innerHTML = "15:20 - 16:40";
let row_6_data_2 = document.createElement('td');
row_6_data_2.innerHTML = "TDB ED705";
let row_6_data_3 = document.createElement('td');
row_6_data_3.innerHTML = "Tingeso ED705";
let row_6_data_4 = document.createElement('td');
row_6_data_4.innerHTML = "Tingeso ED802";
let row_6_data_5 = document.createElement('td');
row_6_data_5.innerHTML = " ";
let row_6_data_6 = document.createElement('td');
row_6_data_6.innerHTML = "Redes EAO518";

row_6.appendChild(row_6_data_1);
row_6.appendChild(row_6_data_2);
row_6.appendChild(row_6_data_3);
row_6.appendChild(row_6_data_4);
row_6.appendChild(row_6_data_5);
row_6.appendChild(row_6_data_6);
tbody.appendChild(row_6);

// Creación y adición de datos a la septima fila de la tabla
let row_7 = document.createElement('tr');
let row_7_data_1 = document.createElement('td');
row_7_data_1.innerHTML = "16:55 - 18:15";
let row_7_data_2 = document.createElement('td');
row_7_data_2.innerHTML = "TDB ED705";
let row_7_data_3 = document.createElement('td');
row_7_data_3.innerHTML = "TDB ED705";
let row_7_data_4 = document.createElement('td');
row_7_data_4.innerHTML = " ";
let row_7_data_5 = document.createElement('td');
row_7_data_5.innerHTML = "Sistope ED705";
let row_7_data_6 = document.createElement('td');
row_7_data_6.innerHTML = " ";

row_7.appendChild(row_7_data_1);
row_7.appendChild(row_7_data_2);
row_7.appendChild(row_7_data_3);
row_7.appendChild(row_7_data_4);
row_7.appendChild(row_7_data_5);
row_7.appendChild(row_7_data_6);
tbody.appendChild(row_7);

// Creación y adición de datos a la octava fila de la tabla
let row_8 = document.createElement('tr');
let row_8_data_1 = document.createElement('td');
row_8_data_1.innerHTML = "18:45 - 20:05";
let row_8_data_2 = document.createElement('td');
row_8_data_2.innerHTML = " ";
let row_8_data_3 = document.createElement('td');
row_8_data_3.innerHTML = " ";
let row_8_data_4 = document.createElement('td');
row_8_data_4.innerHTML = "Redes DIINF 14";
let row_8_data_5 = document.createElement('td');
row_8_data_5.innerHTML = " ";
let row_8_data_6 = document.createElement('td');
row_8_data_6.innerHTML = " ";

row_8.appendChild(row_8_data_1);
row_8.appendChild(row_8_data_2);
row_8.appendChild(row_8_data_3);
row_8.appendChild(row_8_data_4);
row_8.appendChild(row_8_data_5);
row_8.appendChild(row_8_data_6);
tbody.appendChild(row_8);


