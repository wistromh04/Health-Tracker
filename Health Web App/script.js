document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('health-form');
    const dataTable = document.getElementById('data-table').querySelector('tbody');
    const stats = document.getElementById('stats');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const steps = document.getElementById('steps').value;
        const sleep = document.getElementById('sleep').value;
        const water = document.getElementById('water').value;
        const date = new Date().toLocaleDateString();

        const healthData = {
            date,
            steps: parseInt(steps),
            sleep: parseFloat(sleep),
            water: parseFloat(water)
        };

        saveData(healthData);
        appendDataToTable(healthData);
        updateStats();
        form.reset();
    });

    function saveData(data) {
        const existingData = JSON.parse(localStorage.getItem('healthData')) || [];
        existingData.push(data);
        localStorage.setItem('healthData', JSON.stringify(existingData));
    }

    function loadData() {
        const data = JSON.parse(localStorage.getItem('healthData')) || [];
        data.forEach(item => appendDataToTable(item));
        updateStats();
    }

    function appendDataToTable(data) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.date}</td>
            <td>${data.steps}</td>
            <td>${data.sleep}</td>
            <td>${data.water}</td>
        `;
        dataTable.appendChild(row);
    }

    function updateStats() {
        const data = JSON.parse(localStorage.getItem('healthData')) || [];
        if (data.length === 0) {
            stats.textContent = 'No data available.';
            return;
        }

        const totalSteps = data.reduce((sum, item) => sum + item.steps, 0);
        const totalSleep = data.reduce((sum, item) => sum + item.sleep, 0);
        const totalWater = data.reduce((sum, item) => sum + item.water, 0);

        stats.innerHTML = `
            <p>Total Steps: ${totalSteps}</p>
            <p>Average Sleep: ${(totalSleep / data.length).toFixed(2)} hours</p>
            <p>Total Water: ${totalWater.toFixed(2)} liters</p>
        `;
    }

    loadData();
});
