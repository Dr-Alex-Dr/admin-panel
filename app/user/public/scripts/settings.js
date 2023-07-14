const url = 'http://localhost:3000';

sendRequest();

function autoResize() {
    const textareas = document.querySelectorAll('.message_text');
    textareas.forEach((item) => {
        item.style.height = 'auto'; // Сбрасываем высоту на автоматическую
        item.style.height = item.scrollHeight + 'px'; // Устанавливаем высоту, основываясь на высоте содержимого
    })
  }

const textareas = document.querySelectorAll('.message_text');
textareas.forEach((item) => {
    item.style.height = 'auto'; // Сбрасываем высоту на автоматическую
    item.style.height = item.scrollHeight + 'px'; // Устанавливаем высоту, основываясь на высоте содержимого
})


// Собираем данные из textareas
function getDataInForms() {
    let data = {};

    let textareas = document.querySelectorAll('.message_text');

    textareas.forEach((item) => {
        data[item.name] = item.value;
    })

    sendRequest(data);
}

document.querySelector('.btn')
.addEventListener('click', () => {
    getDataInForms();
});

function renderMessages(body) {
    for (let key in body) {
        document.querySelector(`[name="${key}"]`).textContent = body[key];
    }
}

// Отправляем запрос с данными на сервер
function sendRequest(data = {data: true}) {
    fetch(`${url}/api/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
    
        body: JSON.stringify(data)
    })
    .then(res => {
        return res.json();
    })
    .then(body => {
        renderMessages(body);
    })
}
    