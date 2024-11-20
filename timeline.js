document.addEventListener('DOMContentLoaded', function () {
    const timelineContainer = document.getElementById('timeline-container');

    // Events data
    const events = [
        { title: "विद्यार्थ्यांचे प्रगती अहवाल तयार करणे", date: "2024-01-31" },
        { title: "शालेय स्पर्धांचे आयोजन", date: "2024-02-20" },
        { title: "वर्ष अखेर परिक्षा", date: "2024-03-15" },
        { title: "सुट्टीचे नियोजन", date: "2024-04-30" },
        { title: "नवीन प्रवेश प्रक्रिया", date: "2024-06-15" },
        { title: "स्वातंत्र्यदिन साजरा", date: "2024-08-15" }
    ];

    // Generate timeline items dynamically
    events.forEach(event => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');

        const timelineContent = document.createElement('div');
        timelineContent.classList.add('timeline-content');

        const eventTitle = document.createElement('h3');
        eventTitle.textContent = event.title;

        const eventDate = document.createElement('p');
        const formattedDate = new Date(event.date).toLocaleDateString('mr-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        eventDate.textContent = `तारीख: ${formattedDate}`;

        // Add an event listener to the timeline item for redirection
        timelineItem.addEventListener('click', function () {
            // Redirect to the calendar page with the specific date
            const eventDate = new Date(event.date);
            const redirectTo = `calendar.html?date=${eventDate.toISOString().split('T')[0]}`; // Pass the date in YYYY-MM-DD format
            window.location.href = redirectTo;  // Redirect to the calendar page
        });

        // Append title and date to content
        timelineContent.appendChild(eventTitle);
        timelineContent.appendChild(eventDate);

        // Append content to timeline item
        timelineItem.appendChild(timelineContent);

        // Append item to container
        timelineContainer.appendChild(timelineItem);
    });
});
