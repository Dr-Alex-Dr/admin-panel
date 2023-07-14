// data = [{
//     user_id: 940116998,
//     nickname: 'mixalna9',
//     subscription: 'Есть',
//     term: '1',
//     start_data: '2023-04-06',
//     end_data: '2023-04-06',
//     count_referal: 5,
//     number_attempts: 10
// }, {
//     user_id: 940116998,
//     nickname: 'mixalna9',
//     subscription: 'Есть',
//     term: '1',
//     start_data: '2023-04-06',
//     end_data: '2023-04-06',
//     count_referal: 5,
//     number_attempts: 10
// }]

// RenderValues(data);
// ^^^^^^^^^
// это убрать ^


const url = 'https://ratingranger.site/';

sendRequest();

// визуализируем данные
function RenderValues(values) {
    const table = document.querySelector('table');
    table.innerHTML = `
    <tr>
        <th>Id пользователя</th>
        <th>Никнейм</th>
        <th>Подписка</th>
        <th>Срок подписки (месяц)</th>
        <th>Дата начала подписки</th>
        <th>Дата окончания подписки </th>
        <th>Количество рефералов</th>
        <th>Количество попыток</th>
    </tr>`;
    for (let item of values) {
        table.innerHTML += `
        <tr class="row">
            <td><a class="user_id" href="http://localhost:3000/pages/messages.html?user_id=${item.user_id}">${item.user_id}</a></td>
            <td><a class="user_name" href="http://localhost:3000/pages/messages.html?user_id=${item.user_id}">${item.nickname}</a></td>
            <td><input name="subscription" class="table_cell" type="text" value="${item.subscription}" style="pointer-events: none;"></td>
            <td><input name="term" class="table_cell" type="text" value="${item.term}" style="pointer-events: none;"></td>
            <td><input name="start_data" class="table_cell" type="text" placeholder="YYYY-MM-DD" value="${item.start_data}"></td>
            <td><input name="end_data" class="table_cell" type="text" placeholder="YYYY-MM-DD" value="${item.end_data}"></td>
            <td><input name="count_referal" class="table_cell" type="text" placeholder="0" value="${item.count_referal}"></td>
            <td><input name="number_attempts" class="table_cell" type="text" placeholder="0" value="${item.number_attempts}"></td>
        </tr>
        `
    }
}

const button = document.querySelector('.btn');
button.addEventListener('click', () => {
    let arrayDataTable = getAllData();
    sendRequest(arrayDataTable);
})

// собираем все данные
function getAllData() {
    const arrayData = [];

    document.querySelectorAll('.row').forEach(element => {
        const data = {}

        element.querySelectorAll('.table_cell').forEach(item => {
            data[item.name] = item.value;
        });

        data['user_id'] = element.querySelector('.user_id').textContent;
        data['user_name'] = element.querySelector('.user_name').textContent;

        arrayData.push(data);
    });

    return arrayData;
}

// отправляем запрос с данными на сервер
function sendRequest(data = {data: true}) {
    fetch(`${url}/api/users`, {
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
        RenderValues(body);
    })
}