async function getInfo() {
    const stopNameElement = document.getElementById('stopName');
    const timetableElement = document.getElementById('buses');
    const stopInfoElement = document.getElementById('stopId');
    const stopId = stopInfoElement.value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    timetableElement.innerHTML = '';
    stopInfoElement.value = '';

    try {
        const responce = await fetch(url);
        const data = await responce.json();

        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(([busNumber, timeArrive]) => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busNumber} arrives in ${timeArrive} minutes`;
            timetableElement.appendChild(liElement);
        });

    } catch (error) {
        stopNameElement.textContent = 'Error';
    }
}