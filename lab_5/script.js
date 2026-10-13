let conferences = [
    {
        name: "Сучасні веб-технології",
        university: "КНУ імені Тараса Шевченка",
        startDate: "15.10.2026",
        sections: ["Frontend розробка", "Backend та API", "UI/UX дизайн"]
    },
    {
        name: "Штучний інтелект та дані",
        university: "КПІ ім. Ігоря Сікорського",
        startDate: "12.10.2026",
        sections: ["Машинне навчання", "Аналіз великих даних", "Нейромережі"]
    },
    {
        name: "Кібербезпека майбутнього",
        university: "ЛНУ імені Івана Франка",
        startDate: "20.10.2026",
        sections: ["Захист інформації", "Криптографія", "Безпека мереж"]
    }
];

function checkConferences() {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let todayHTML = "<h3>Конференції, що проводяться сьогодні:</h3>";
    let otherHTML = "<h3>Майбутні конференції:</h3>";
    
    let hasToday = false;
    let hasOther = false;

    conferences.forEach(conf => {
        let parts = conf.startDate.split('.');
        let startD = new Date(parts[2], parts[1] - 1, parts[0]);
        startD.setHours(0, 0, 0, 0);

        let endD = new Date(startD);
        endD.setDate(startD.getDate() + 2);

        let isToday = (currentDate >= startD && currentDate <= endD);

        let sectionsListHTML = "<ul style='margin: 5px 0; padding-left: 20px;'>";
        conf.sections.forEach((sec, idx) => {
            let currentDayIndex = Math.round((currentDate.getTime() - startD.getTime()) / (1000 * 3600 * 24));
            let isSectionToday = isToday && (currentDayIndex === idx);
            
            let style = isSectionToday ? "color: green; font-weight: bold;" : "";
            let note = isSectionToday ? " (Секція проходить сьогодні!)" : "";
            
            sectionsListHTML += `<li style="${style}">День ${idx + 1}: ${sec}${note}</li>`;
        });
        sectionsListHTML += "</ul>";

        let confCard = `<div style="border: 1px solid #ccc; margin: 12px 0; padding: 15px; border-radius: 6px; background: ${isToday ? '#e8f5e9' : '#fafafa'};">`;
        confCard += `<strong>Назва:</strong> ${conf.name}<br>`;
        confCard += `<strong>Університет:</strong> ${conf.university}<br>`;
        confCard += `<strong>Дата початку:</strong> ${conf.startDate}<br>`;
        confCard += `<strong>Усі секції конференції:</strong> ${sectionsListHTML}`;

        if (isToday) {
            hasToday = true;
            let endDiffTime = endD.getTime() - currentDate.getTime();
            let endDiffDays = Math.round(endDiffTime / (1000 * 3600 * 24));
            confCard += `Днів до закінчення конференції: <strong>${endDiffDays}</strong><br>`;
            confCard += `</div>`;
            todayHTML += confCard;
        } else {
            hasOther = true;
            let timeDiff = startD.getTime() - currentDate.getTime();
            let daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
            confCard += `До початку конференції залишилось днів: <strong>${daysDiff}</strong><br>`;
            confCard += `</div>`;
            otherHTML += confCard;
        }
    });

    let finalHTML = "";
    if (hasToday) {
        finalHTML += todayHTML + "<hr style='margin: 20px 0; border: 1px dashed #b0bec5;'>";
    }
    if (hasOther) {
        finalHTML += otherHTML;
    }

    document.getElementById("confResult").innerHTML = finalHTML;
}


let booksData = [];

function handleAuthorKeypress(event) {
    if (event.key === "Enter") {
        let genreSelect = document.getElementById("genreSelect");
        let titleInput = document.getElementById("bookTitle");
        let authorInput = document.getElementById("bookAuthor");

        let genre = genreSelect.value;
        let title = titleInput.value.trim();
        let author = authorInput.value.trim();

        if (title === "" || author === "") {
            alert("Будь ласка, заповніть назву книги та автора!");
            return;
        }

        booksData.push({ genre: genre, title: title, author: author });

        titleInput.value = "";
        authorInput.value = "";
        titleInput.focus();

        renderBookLists();
    }
}

function renderBookLists() {
    let container = document.getElementById("booksResult");
    let genres = ["Фантастика", "Детектив", "Наукова література", "Роман", "Історія"];
    
    let html = "<h4>Списки книг по кожному з жанрів:</h4>";

    genres.forEach(g => {
        html += `<div style="margin-bottom: 8px;"><strong>Жанр: ${g}</strong>`;
        let booksInGenre = booksData.filter(b => b.genre === g);
        
        if (booksInGenre.length > 0) {
            html += "<ul>";
            booksInGenre.forEach(b => {
                html += `<li>Книга: "${b.title}" (Автор: ${b.author})</li>`;
            });
            html += "</ul>";
        } else {
            html += " <span style='color: #777; font-style: italic;'>(немає книг)</span>";
        }
        html += `</div>`;
    });

    container.innerHTML = html;
}


function convertTableToLists() {
    let table = document.getElementById("myTable");
    let rows = table.rows;
    
    let html = "<ul style='list-style-type: disc;'>";

    for (let i = 0; i < rows.length; i++) {
        html += `<li><strong>Рядок ${i + 1}</strong><ul style='list-style-type: circle;'>`;
        let cells = rows[i].cells;
        for (let j = 0; j < cells.length; j++) {
            html += `<li>${cells[j].innerText}</li>`;
        }
        html += "</ul></li>";
    }
    html += "</ul>";

    document.getElementById("tableResult").innerHTML = html;
}