document.addEventListener("DOMContentLoaded", () => {
    const jobs = {
        averagePrice: 50,
        freelancer: [
            { name: 'Alice', price: 30, occupation: 'Writer' },
            { name: 'Bob', price: 50, occupation: 'Teacher' }
        ]
    };

    function calculateAverage(freelancers) {
        const total = freelancers.reduce((sum, freelancer) => sum + freelancer.price, 0);
        const average = total / freelancers.length;
        return Math.round(average);
    }

    function updateAveragePrice(average) {
        const averagePriceDiv = document.getElementById("averagePrice");
        averagePriceDiv.textContent = `Average Price: $${average}`;
    }

    function addFreelancerToTable(freelancer) {
        const tableBody = document.querySelector("#freelancerTable tbody");

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = freelancer.name;
        row.appendChild(nameCell);

        const occupationCell = document.createElement("td");
        occupationCell.textContent = freelancer.occupation;
        row.appendChild(occupationCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${freelancer.price}`;
        row.appendChild(priceCell);

        tableBody.appendChild(row);
    }

    function addFreelancer(newFreelancer) {
        jobs.freelancer.push(newFreelancer);
        addFreelancerToTable(newFreelancer);

        const newAverage = calculateAverage(jobs.freelancer);
        updateAveragePrice(newAverage);

        console.log("New freelancer added:", newFreelancer);
        console.log("Updated average starting price:", newAverage);
    }

    const randomNames = ['Lisa', 'Aaron', 'Riley', 'Sam'];
    const randomJobs = ['Barber', 'Chef', 'Construction', 'Painter'];

    function createRandomFreelancer() {
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        const randomJob = randomJobs[Math.floor(Math.random() * randomJobs.length)];
        const randomPrice = Math.round(Math.random() * 100);

        return {
            name: randomName,
            occupation: randomJob,
            price: randomPrice
        };
    }

    let renderCount = 0;

    // Add initial freelancers to the table
    jobs.freelancer.forEach(addFreelancerToTable);

    // Update initial average price
    updateAveragePrice(calculateAverage(jobs.freelancer));

    // Interval Logic
    let intervalID = setInterval(function () {
        if (renderCount >= 5) {
            clearInterval(intervalID);
            console.log("Stopped adding freelancers after 5 iterations.");
            return;
        }

        const newFreelancer = createRandomFreelancer();
        addFreelancer(newFreelancer);

        console.log("Current freelancers count:", jobs.freelancer.length);

        ++renderCount;
    }, 1000);
});
