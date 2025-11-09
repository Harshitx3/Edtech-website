document.addEventListener('DOMContentLoaded', () => {
    const mentorGrid = document.querySelector('.mentor-grid');

    const mentors = [
        {
            photo: 'https://randomuser.me/api/portraits/men/32.jpg',
            name: 'John Doe',
            role: 'Lead Instructor',
            expertise: 'Full Stack Development',
        },
        {
            photo: 'https://randomuser.me/api/portraits/women/44.jpg',
            name: 'Jane Smith',
            role: 'Data Science Expert',
            expertise: 'Machine Learning & AI',
        },
        {
            photo: 'https://randomuser.me/api/portraits/men/56.jpg',
            name: 'Samuel Green',
            role: 'Algorithms Specialist',
            expertise: 'Data Structures & Algorithms',
        },
        {
            photo: 'https://randomuser.me/api/portraits/women/68.jpg',
            name: 'Emily White',
            role: 'Frontend Developer',
            expertise: 'React & Modern JavaScript',
        },
    ];

    function displayMentors() {
        mentorGrid.innerHTML = '';
        mentors.forEach(mentor => {
            const mentorCard = document.createElement('div');
            mentorCard.classList.add('mentor-card');
            mentorCard.innerHTML = `
                <img src="${mentor.photo}" alt="${mentor.name}" class="photo">
                <h3>${mentor.name}</h3>
                <p class="role">${mentor.role}</p>
                <p class="expertise">${mentor.expertise}</p>
                <a href="#" class="btn btn-primary">Connect</a>
            `;
            mentorGrid.appendChild(mentorCard);
        });
    }

    displayMentors();
});