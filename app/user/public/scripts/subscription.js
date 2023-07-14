const url = 'http://localhost:3000';

// let data = {
//     "message_text-1": "Подписка RatingRanger\n\n• Неограниченное количевто запрсов\n• Прямое общение с техподержкой\n\nТарифный план",
//     "message_text-2": "Добавить новый Товар",
//     "message_text-3": "Добавить новый Товар",
//     "message_text-4": "Добавить новый Товар",
//     "message_text-5": "Добавить новый Товар",
//     "message_text-6": "Добавить новый Товар",
//     "message_text-7": "Добавить новый Товар",
//     "message_text-8": "Добавить новый Товар",
//     "message_text-9": "Добавить новый Товар",
//     "message_text-10": "Добавить новый Товар",
//     "message_text-11": "Добавить новый Товар",
//     "message_text-12": "Добавить новый Товар",
//     "message_text-13": "Добавить новый Товар"
// }

// renderMessages(data);
sendRequest();

// Автоматически регулируем высоту textarea в зависимости от контента
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

    console.log(data)
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
    fetch(`${url}/api/subscription`, {
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


