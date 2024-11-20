document.addEventListener('DOMContentLoaded', function () {
    const timelineContainer = document.getElementById('timeline-container');
    const searchBar = document.getElementById('search-bar');
    const languageButtons = document.querySelectorAll('.language-switch button');

    const events = [
        { title: "विद्यार्थ्यांचे प्रगती अहवाल तयार करणे", date: "2024-01-31" },
        { title: "शालेय स्पर्धांचे आयोजन", date: "2024-02-20" },
        { title: "वर्ष अखेर परिक्षा", date: "2024-03-15" },
        { title: "सुट्टीचे नियोजन", date: "2024-04-30" },
        { title: "नवीन प्रवेश प्रक्रिया", date: "2024-06-15" },
        { title: "स्वातंत्र्यदिन साजरा", date: "2024-08-15" }
    ];

    function renderTimeline(events) {
        timelineContainer.innerHTML = '';
        events.forEach(event => {
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item');
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <h3>${event.title}</h3>
                    <p>तारीख: ${new Date(event.date).toLocaleDateString('mr-IN')}</p>
                </div>`;
            timelineContainer.appendChild(timelineItem);
        });
    }

    renderTimeline(events);

    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredEvents = events.filter(event =>
            event.title.toLowerCase().includes(searchTerm)
        );
        renderTimeline(filteredEvents);
    });

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.id === 'lang-mr' ? 'mr' : 'en';
            document.documentElement.lang = selectedLang;
            alert(`Language switched to: ${selectedLang === 'mr' ? 'मराठी' : 'English'}`);
        });
    });
});
