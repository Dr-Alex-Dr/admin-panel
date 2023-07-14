const url = 'http://localhost:3000';

// let data = {
//     "message_text-0": "/услуги",
//     "message_text-1": "Добавьте отзыв",
//     "message_text-2": "Идет генерация ответа",
//     "message_text-3": "Идет генерация ответа",
//     "message_text-4": "Добавьте отзыв о товаре",
//     "message_text-5": "Добавить новый Товар",
//     "message_text-6": "Добавьте описание товара/услуги",
//     "message_text-7": "⚡️Инструкция по работе с боте, которая поможет вам получить максимум пользы от его использования. \n\n1. Скопируйте и отправте описание товара/услуги из карточки. Чем точнее будет описание, тем более развернутый ответ на отзыв о данном товаре вы получите. \n2. Добавьте текст отзыва, на который необходимо получить ответ. \n\nПолучите развернутый ответ от нашего бота \n\n\n⚡️Инструкция по использованию реферальной программы\n\n1.  Поделитесь своей уникальной ссылкой реферала с друзьями и знакомыми. Для этого используйте свою уникальную ссылку из меню бота, нажав кнопку «Пригласить друга».\n2.  Если Ваш друг перейдёт по вашей уникальной ссылке, он получит увеличенный пробный период (бот ответит на 20 отзывов, вместо 10).\n3.  Если Ваш друг оформит подписку, вы получите скидку 10% на оплату подписки на следующий месяц. Чем больше друзей, тем больше скидка! \n4.  Скидки суммируются в течение месяца. Если за месяц по вашей ссылке подписку оформят более 5 человек, для вас подписка на следующий месяц, по завершению оплаченного периода, будет бесплатной.\n                ",
//     "message_text-8": "Реферальная ссылка\n\nhttps://t.me/RatingRanger_bot?start=968615914",
//     "message_text-9": "🚀Служба поддержки\n\ntelegram: https://t.me/anastasiya_service"
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
    autoResize();
}

// Отправляем запрос с данными на сервер
function sendRequest(data = {data: true}) {
    fetch(`${url}/api/answers`, {
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


