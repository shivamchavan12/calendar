document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.getElementById('calendar');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const monthSelector = document.getElementById('month-selector');
    const yearSelector = document.getElementById('year-selector');
    const jumpButton = document.getElementById('jump-button');

    // Events data with title, date, and description
    const events = [
        { title: "विद्यार्थ्यांचे प्रगती अहवाल तयार करणे", date: "2024-01-31", description: "प्रगती अहवाल तयार करणे संबंधित महत्त्वपूर्ण मुद्दे चर्चा करा." },
        { title: "शालेय स्पर्धांचे आयोजन", date: "2024-02-20", description: "शालेय स्पर्धांचे आयोजन करणे. विद्यार्थ्यांसाठी विविध स्पर्धा आयोजित करा." },
        { title: "वर्ष अखेर परिक्षा", date: "2024-03-15", description: "वर्ष अखेर परिक्षा. परीक्षेची तयारी सुरू करा." },
        { title: "सुट्टीचे नियोजन", date: "2024-04-30", description: "सुट्टीच्या नियोजनाबद्दल चर्चा करा आणि शालेय कार्यक्रमांचे आयोजन करा." },
        { title: "नवीन प्रवेश प्रक्रिया", date: "2024-06-15", description: "नवीन विद्यार्थ्यांसाठी प्रवेश प्रक्रिया सुरू करा." },
        { title: "स्वातंत्र्यदिन साजरा", date: "2024-08-15", description: "स्वातंत्र्यदिन साजरा करा, झंझावत व परेड आयोजित करा." }
    ];

    // Days of the week (in Marathi)
    const weekdays = ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

    // State to track the current month and year
    let currentDate = new Date();

    // Get modal elements
    const modal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('event-modal-title');
    const modalDescription = document.getElementById('event-modal-description');
    const modalDate = document.getElementById('event-modal-date');
    const closeModalButton = document.getElementById('close-modal');

    // Function to render the calendar
    function renderCalendar(date) {
        calendarElement.innerHTML = ''; // Clear the previous calendar

        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();

        // Get the first day and number of days in the current month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Display the current month and year
        document.getElementById('month-year').textContent = `${date.toLocaleString('mr-IN', { month: 'long' })} ${currentYear}`;

        // Update dropdowns to reflect the current month and year
        monthSelector.value = currentMonth;
        yearSelector.value = currentYear;

        // Render weekdays
        weekdays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day-header');
            dayElement.textContent = day;
            calendarElement.appendChild(dayElement);
        });

        // Add blank days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const blank = document.createElement('div');
            blank.classList.add('blank');
            calendarElement.appendChild(blank);
        }

        // Render each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            
            // Day number
            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);

            // Check if there are events on this day
            const currentDay = new Date(currentYear, currentMonth, day);
            events.forEach(event => {
                const eventDate = new Date(event.date);
                if (
                    eventDate.getDate() === currentDay.getDate() &&
                    eventDate.getMonth() === currentDay.getMonth() &&
                    eventDate.getFullYear() === currentDay.getFullYear()
                ) {
                    // Add the event title directly into the day (in the event box)
                    const eventElement = document.createElement('div');
                    eventElement.classList.add('event');
                    eventElement.textContent = event.title; // Display the event title
                    dayElement.appendChild(eventElement);

                    // Attach click event to open event details (both event box and title)
                    eventElement.addEventListener('click', () => openModal(event));
                }
            });

            // Append day element to the calendar
            calendarElement.appendChild(dayElement);
        }
    }

    // Function to open the modal
    function openModal(event) {
        modalTitle.textContent = event.title;
        modalDescription.textContent = event.description;
        modalDate.textContent = `Date: ${event.date}`;
        modal.style.display = 'block'; // Show the modal
    }

    // Event listener for closing the modal
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal when clicking the close button
    });

    // Event listener for clicking outside the modal to close it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none'; // Close modal when clicking outside
        }
    });

    // Event listeners for navigation buttons
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Event listener for jumping to a specific month and year
    jumpButton.addEventListener('click', () => {
        const selectedMonth = parseInt(monthSelector.value, 10);
        const selectedYear = parseInt(yearSelector.value, 10);
        currentDate.setMonth(selectedMonth);
        currentDate.setFullYear(selectedYear);
        renderCalendar(currentDate);
    });

    // Initialize the dropdowns
    function populateSelectors() {
        // Populate month dropdown
        const monthNames = [...Array(12).keys()].map(month =>
            new Date(0, month).toLocaleString('mr-IN', { month: 'long' })
        );
        monthNames.forEach((monthName, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = monthName;
            monthSelector.appendChild(option);
        });

        // Populate year dropdown (e.g., from 2020 to 2030)
        for (let year = 2020; year <= 2030; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelector.appendChild(option);
        }
    }

    // Initial setup
    populateSelectors();
    renderCalendar(currentDate);
});
