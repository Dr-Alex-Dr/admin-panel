// data = [
//     {
//         user_id: '968615914',
//         type: 0,
//         body: 'В целом ресторан отличный. Периодически захожу в н...'
//     },
//     {
//     user_id: '968615914',
//     type: 1,
//     body: 'В целом ресторан отличный. Периодически захожу в н...'
// },
// {
//     user_id: '968615914',
//     type: 2,
//     body: 'Уважаемый гость, благодарим Вас за отзыв о нашем ресторане современной русской кухни. Мы рады, что в целом Вам понравилось у нас, и Вы оценили качество нашей кухни. Однако, мы сожалеем, что обслуживание не оправдало Ваших ожиданий. Мы обязательно обратим внимание на Ваш комментарий и передадим его нашему персоналу. Мы ценим каждого нашего гостя и стараемся обеспечить высокий уровень сервиса. Мы надеемся, что Вы снова посетите наш ресторан и оцените наши улучшения. С уважением, администрация ресторана.'
// }
// ]



// renderMessages(data)


function renderMessages(data) {
    const container = document.querySelector('.messages_wrapper');
    container.innerHTML = '';
    data.forEach(item => {
        container.innerHTML += `
        <div class="messages_item" style="margin-left: ${item.type == 2 ? '15px' : '0'}">
            <div class="messages_type__wrapper">
                <p class="messages_type__answer">${item.type == 0 || item.type == 1 ? 'Пользователь' : 'Бот'}</p>
                <p class="messages_type__user"><span>user_id </span>${item.user_id}</p>
            </div>
            <p class="messages_item__message">${item.body}</p>
        </div>
        `
    });
}


let inputData;
let selectData = 'all';

let inputDataElement = document.querySelector('.messages_input');
let selectDataElement = document.querySelector('.messages_select');

inputDataElement.addEventListener('input', () => {
    inputData = inputDataElement.value;
    sendRequest({inputData, selectData})
})

selectDataElement.addEventListener('change', () => {
    selectData = selectDataElement.value;
    sendRequest({inputData, selectData})
})

var url = new URL(window.location.href);
var paramValue = url.searchParams.get('user_id') || '';


if (paramValue.length !== 0) {
    inputData = paramValue == undefined ? 'nouser' : paramValue;
    inputDataElement.value = paramValue;
    selectDataElement.value = 'all';   
    sendRequest({inputData, selectData})
} else {
    sendRequest({inputData, selectData})
}

// отправляем запрос с данными на сервер
function sendRequest(data = {data: true}) {
    console.log(data);
    fetch(`http://localhost:3000/api/messages`, {
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

