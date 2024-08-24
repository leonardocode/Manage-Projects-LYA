// Datos de ejemplo para las secciones
const projectTasks = [
    { id: 1, name: "Planificación", start: "2023-01-01", end: "2023-02-15", progress: 100, assignee: "Ana" },
    { id: 2, name: "Diseño", start: "2023-02-16", end: "2023-04-30", progress: 75, assignee: "Elena" },
    { id: 3, name: "Desarrollo Frontend", start: "2023-05-01", end: "2023-07-15", progress: 50, assignee: "Carlos" },
    { id: 4, name: "Desarrollo Backend", start: "2023-05-01", end: "2023-08-31", progress: 40, assignee: "David" },
    { id: 5, name: "Pruebas", start: "2023-09-01", end: "2023-10-31", progress: 25, assignee: "Fernando" },
    { id: 6, name: "Implementación", start: "2023-11-01", end: "2023-12-31", progress: 0, assignee: "Ana" }
];

const resources = [
    { name: "Ana", role: "Gerente de Proyecto", costPerHour: 50, availability: 100, avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "Carlos", role: "Desarrollador Frontend", costPerHour: 40, availability: 80, avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Elena", role: "Diseñador UX", costPerHour: 45, availability: 90, avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "David", role: "Desarrollador Backend", costPerHour: 45, availability: 90, avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Fernando", role: "Tester", costPerHour: 35, availability: 100, avatar: "https://randomuser.me/api/portraits/men/3.jpg" }
];

const financialData = {
    budget: 500000,
    spending: 375000,
    cashFlow: [
        { month: "Ene", income: 50000, expenses: 40000 },
        { month: "Feb", income: 60000, expenses: 45000 },
        { month: "Mar", income: 75000, expenses: 50000 },
        { month: "Abr", income: 80000, expenses: 60000 },
        { month: "May", income: 85000, expenses: 65000 }
    ]
};

// Navegación entre secciones
const links = document.querySelectorAll('#sidebar a');
const sections = document.querySelectorAll('main section');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');

        sections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(sectionId).classList.add('active');

        links.forEach(link => {
            link.classList.remove('active');
        });

        link.classList.add('active');
    });
});

// Configuración de gráficos con Chart.js
const ctx1 = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: projectTasks.map(task => task.name),
        datasets: [{
            data: projectTasks.map(task => task.progress),
            backgroundColor: ['#3498db', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6', '#34495e']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

const ctx2 = document.getElementById('financialSummaryChart').getContext('2d');
const financialSummaryChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Presupuesto', 'Gasto'],
        datasets: [{
            label: 'Finanzas',
            data: [financialData.budget, financialData.spending],
            backgroundColor: ['#2ecc71', '#e74c3c']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

const ctx3 = document.getElementById('budgetVsSpendingChart').getContext('2d');
const budgetVsSpendingChart = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: financialData.cashFlow.map(entry => entry.month),
        datasets: [
            {
                label: 'Ingresos',
                data: financialData.cashFlow.map(entry => entry.income),
                backgroundColor: '#2ecc71'
            },
            {
                label: 'Gastos',
                data: financialData.cashFlow.map(entry => entry.expenses),
                backgroundColor: '#e74c3c'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

const ctx4 = document.getElementById('cashFlowChart').getContext('2d');
const cashFlowChart = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: financialData.cashFlow.map(entry => entry.month),
        datasets: [{
            label: 'Flujo de Caja',
            data: financialData.cashFlow.map(entry => entry.income - entry.expenses),
            borderColor: '#3498db',
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

// Carga de datos en la tabla de recursos
const resourceTableBody = document.querySelector('#resourceTable tbody');
resources.forEach(resource => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${resource.avatar}" alt="${resource.name}" class="avatar"></td>
        <td>${resource.name}</td>
        <td>${resource.role}</td>
        <td>$${resource.costPerHour}/hora</td>
        <td>${resource.availability}%</td>`
    ;
    resourceTableBody.appendChild(row);
});

//Configuración del diagrama de Gantt
gantt.config.xml_date = "%Y-%m-%d";
gantt.config.date_format = "%Y-%m-%d";
gantt.config.columns = [
    { name: "text", label: "Tarea", tree: true, width: 200 },
    { name: "start_date", label: "Inicio", align: "center", width: 80 },
    { name: "end_date", label: "Fin", align: "center", width: 80 },
    { name: "add", label: "", width: 44 }
];
gantt.init("GanttChartDIV");
gantt.parse({ data: projectTasks.map(task => ({
    id: task.id,
    text: task.name,
    start_date: task.start,
    end_date: task.end,
    progress: task.progress / 100,
    assigned_to: task.assignee
})) });

// Interactividad básica para el tablero Kanban
const kanbanColumns = document.querySelectorAll('.kanban-column');

kanbanColumns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    column.addEventListener('drop', (e) => {
        const taskId = e.dataTransfer.getData('text/plain');
        const taskElement = document.getElementById(taskId);
        column.appendChild(taskElement);
    });
});

// Crear tareas Kanban con avatares
const kanbanData = [
    { id: 'task-1', name: "Tarea de Planificación", assignee: "Ana" },
    { id: 'task-2', name: "Tarea de Diseño", assignee: "Elena" },
    { id: 'task-3', name: "Tarea de Desarrollo Frontend", assignee: "Carlos" },
    { id: 'task-4', name: "Tarea de Desarrollo Backend", assignee: "David" },
    { id: 'task-5', name: "Tarea de Pruebas", assignee: "Fernando" },
    { id: 'task-6', name: "Tarea de Implementación", assignee: "Ana" }
];

const kanbanBoard = document.querySelector('.kanban-board');

kanbanData.forEach(task => {
    const avatar = resources.find(r => r.name === task.assignee).avatar;
    const column = document.getElementById('todo'); // Puedes ajustar según la columna
    const taskElement = document.createElement('div');
    taskElement.className = 'kanban-item';
    taskElement.draggable = true;
    taskElement.id = task.id;
    taskElement.innerHTML = 
        `<div class="kanban-item-avatar">
            <img src="${avatar}" alt="${task.assignee}" class="avatar">
        </div>
        <div class="kanban-item-content">
            ${task.name}
        </div>`
    ;
    column.appendChild(taskElement);

    taskElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

// Datos de ejemplo para los nuevos gráficos
const financialStatementsData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
        {
            label: 'Ingresos',
            data: [50000, 55000, 60000, 58000, 65000],
            backgroundColor: '#2ecc71'
        },
        {
            label: 'Gastos',
            data: [45000, 50000, 52000, 55000, 60000],
            backgroundColor: '#e74c3c'
        },
        {
            label: 'Beneficio Neto',
            data: [5000, 5000, 8000, 3000, 5000],
            backgroundColor: '#3498db'
        }
    ]
};

const budgetStatementsData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
        {
            label: 'Presupuesto',
            data: [100000, 120000, 110000, 130000],
            backgroundColor: '#2ecc71'
        },
        {
            label: 'Gasto Real',
            data: [95000, 115000, 100000, 125000],
            backgroundColor: '#e74c3c'
        }
    ]
};

// Configuración y creación de los nuevos gráficos
const ctx5 = document.getElementById('financialStatementsChart').getContext('2d');
const financialStatementsChart = new Chart(ctx5, {
    type: 'bar',
    data: financialStatementsData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Estados Financieros'
            }
        }
    }
});

const ctx6 = document.getElementById('budgetStatementsChart').getContext('2d');
const budgetStatementsChart = new Chart(ctx6, {
    type: 'bar',
    data: budgetStatementsData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Estados de Presupuestos'
            }
        }
    }
});


// Funcionalidad para el menú desplegable y modal de informes
const reportLinks = document.querySelectorAll('.dropdown-content a');
const modal = document.getElementById('reportModal');
const closeBtn = document.querySelector('.close');
const downloadExcelBtn = document.getElementById('downloadExcel');
const downloadPDFBtn = document.getElementById('downloadPDF');

let currentReport = '';

reportLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentReport = e.target.getAttribute('data-report');
        modal.style.display = 'block';
    });
});

closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

downloadExcelBtn.onclick = () => {
    downloadReport('excel');
};

downloadPDFBtn.onclick = () => {
    downloadReport('pdf');
};

function downloadReport(format) {
    let data;
    let filename;

    switch(currentReport) {
        case 'budgetVsSpending':
            data = [
                ['Categoría', 'Monto'],
                ['Presupuesto', financialData.budget],
                ['Gasto', financialData.spending]
            ];
            filename = 'Presupuesto_vs_Gasto';
            break;
        case 'cashFlow':
            data = [['Mes', 'Ingresos', 'Gastos', 'Flujo de Caja']];
            financialData.cashFlow.forEach(entry => {
                data.push([entry.month, entry.income, entry.expenses, entry.income - entry.expenses]);
            });
            filename = 'Flujo_de_Caja';
            break;
        case 'financialStatements':
            data = [['Mes', 'Ingresos', 'Gastos', 'Beneficio Neto']];
            financialStatementsData.labels.forEach((month, index) => {
                data.push([
                    month,
                    financialStatementsData.datasets[0].data[index],
                    financialStatementsData.datasets[1].data[index],
                    financialStatementsData.datasets[2].data[index]
                ]);
            });
            filename = 'Estados_Financieros';
            break;
        case 'budgetStatements':
            data = [['Trimestre', 'Presupuesto', 'Gasto Real']];
            budgetStatementsData.labels.forEach((quarter, index) => {
                data.push([
                    quarter,
                    budgetStatementsData.datasets[0].data[index],
                    budgetStatementsData.datasets[1].data[index]
                ]);
            });
            filename = 'Estados_de_Presupuestos';
            break;
        case 'resources':
            data = [['Nombre', 'Rol', 'Costo/Hora', 'Disponibilidad']];
            resources.forEach(resource => {
                data.push([resource.name, resource.role, resource.costPerHour, resource.availability]);
            });
            filename = 'Recursos';
            break;
    }

    if (format === 'excel') {
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${filename}.xlsx`);
    } else if (format === 'pdf') {
        const doc = new jspdf.jsPDF();
        doc.autoTable({
            head: [data[0]],
            body: data.slice(1)
        });
        doc.save(`${filename}.pdf`);
    }

    modal.style.display = 'none';
}