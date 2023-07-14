const passport = require('passport');
const express = require("express");
const conn = require("../../db").promise();
const moment = require('moment');
const xlsx = require('xlsx');

function initUser (app) {

  app.get('/', express.static(__dirname + "/unauth"));

  app.use('/pages', passport.authenticationMiddleware(), express.static(__dirname + "/public"));

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/pages/users.html',
    failureRedirect: '/'
  }));

  app.post('/api/users', async (req, res) => {
    if( !req.body.data ) {
      for(let item of req.body) {
        await conn.execute("UPDATE `users` SET start_data = ?, end_data = ?, count_referal = ?, number_attempts = ? WHERE user_id = ?",[
          item.start_data.length == 0 ? null : item.start_data,
          item.end_data.length == 0 ? null : item.end_data,
          item.count_referal,
          item.number_attempts,
          item.user_id
        ]);
      }
    }
       
    const [users] = await conn.execute(`SELECT * FROM users`); 
    res.send(JSON.stringify(creatUsersArray(users)))
    
  });

  app.post('/api/messages', async (req, res) => {
    if ( !req.body.inputData ) {
      if (req.body.selectData == 'all') {
        const [messages] = await conn.execute("SELECT * FROM messages"); 
        res.send(JSON.stringify(messages));
      }
      if (req.body.selectData == 'user') {
        const [messages] = await conn.execute("SELECT * FROM messages WHERE (`type` = 0 OR `type` = 1)"); 
        res.send(JSON.stringify(messages));
      }
      if (req.body.selectData == 'bot') {   
        const [messages] = await conn.execute("SELECT * FROM messages WHERE `type` = 2"); 
        res.send(JSON.stringify(messages));
      } 
    } else {
      if (req.body.selectData == 'all') {
        const [messages] = await conn.execute("SELECT * FROM messages WHERE `user_id` = ?", [req.body.inputData]); 
        res.send(JSON.stringify(messages));
      }
      if (req.body.selectData == 'user') {
        const [messages] = await conn.execute("SELECT * FROM messages WHERE (`type` = 0 OR `type` = 1) AND `user_id` = ?", [req.body.inputData]); 
        res.send(JSON.stringify(messages));
      }
      if (req.body.selectData == 'bot') {   
        const [messages] = await conn.execute("SELECT * FROM messages WHERE `type` = 2 AND `user_id` = ?", [req.body.inputData]); 
        res.send(JSON.stringify(messages));
      } 
    }  
  });

  app.post('/api/answers', async (req, res) => {
     
     if ( !req.body.data ) {
      writeCellValue('A2', req.body['message_text-0']);
      writeCellValue('A3', req.body['message_text-1']);
      writeCellValue('A4', req.body['message_text-2']);
      writeCellValue('A5', req.body['message_text-3']);
      writeCellValue('A6', req.body['message_text-4']);
      writeCellValue('A7', req.body['message_text-5']);
      writeCellValue('A8', req.body['message_text-6']);
      writeCellValue('B2', req.body['message_text-7']);
      writeCellValue('C2', req.body['message_text-8']);
      writeCellValue('D2', req.body['message_text-9']);
     }

     let data = {
      'message_text-0': readCellValue('A2'),
      'message_text-1': readCellValue('A3'),
      'message_text-2': readCellValue('A4'),
      'message_text-3': readCellValue('A5'),
      'message_text-4': readCellValue('A6'),
      'message_text-5': readCellValue('A7'),
      'message_text-6': readCellValue('A8'),
      'message_text-7': readCellValue('B2'),               
      'message_text-8': readCellValue('C2'),
      'message_text-9': readCellValue('D2')
    }
    

    res.send(JSON.stringify(data));
     
  });

  app.post('/api/subscription', async (req, res) => {
     
    if ( !req.body.data ) {
      writeCellValue('E2', req.body['message_text-1']);
      writeCellValue('E3', req.body['message_text-2']);
      writeCellValue('E4', req.body['message_text-3']);
      writeCellValue('E5', req.body['message_text-4']);
      writeCellValue('E6', req.body['message_text-5']);
      writeCellValue('E7', req.body['message_text-6']);
      writeCellValue('E8', req.body['message_text-7']);
      writeCellValue('E9', req.body['message_text-8']);
      writeCellValue('E10', req.body['message_text-9']);
      writeCellValue('E11', req.body['message_text-10']);
      writeCellValue('E12', req.body['message_text-11']);
      writeCellValue('E13', req.body['message_text-12']);
      writeCellValue('E14', req.body['message_text-13']);
    }

    let data = {
     'message_text-1': readCellValue('E2'),
     'message_text-2': readCellValue('E3'),
     'message_text-3': readCellValue('E4'),
     'message_text-4': readCellValue('E5'),
     'message_text-5': readCellValue('E6'),
     'message_text-6': readCellValue('E7'),
     'message_text-7': readCellValue('E8'),               
     'message_text-8': readCellValue('E9'),
     'message_text-9': readCellValue('E10'),
     'message_text-10': readCellValue('E11'),
     'message_text-11': readCellValue('E12'),
     'message_text-12': readCellValue('E13'),
     'message_text-13': readCellValue('E14'),
   }
   
   
   res.send(JSON.stringify(data));
    
 });

  app.post('/api/gpt', async (req, res) => {   
    if ( !req.body.data ) {
      writeCellValue('F2', req.body['message_text']);
    }

    let data = {
      'message_text': readCellValue('F2'),  
    }
  
    res.send(JSON.stringify(data)); 
  });

  app.post('/api/settings', async (req, res) => {   
    if ( !req.body.data ) {
      writeCellValue('G2', req.body['token_bot']);
      writeCellValue('H2', req.body['token_gpt']);
      writeCellValue('I2', req.body['token_pay']);
    }

    let data = {
      'token_bot': readCellValue('G2'),  
      'token_gpt': readCellValue('H2'),  
      'token_pay': readCellValue('I2')
    }
  
    res.send(JSON.stringify(data)); 
  });
}

function renderWelcome (req, res) {
  res.render('user/welcome')
}

// Создаем массив объектов пользователей 
function creatUsersArray(data) {
  let users = [];
  
  for (let item of data) {
    let userInfo = {};

    // проверяем наличие подписки и добавляем subscription
    try {
      const currentData = moment(moment().format('YYYY-MM-DD')); // текущая дата
      const endData = moment(item.end_data); // дата окончания подписки
      const startData = moment(item.start_data); // дата начала подписки 
     
      // если текущая дата больше даты окончания, то false иначе true
      if(currentData.isBefore(endData)) {
        userInfo['subscription'] = 'Есть';

        // считаем срок подписки
        let diffInMonths = endData.diff(startData, 'months');
        userInfo['term'] = diffInMonths;

      } else {
        userInfo['subscription'] = 'Нет';
        userInfo['term'] = 0;
      }

      userInfo['user_id'] = item.user_id;
      userInfo['nickname'] = item.nickname;
      userInfo['start_data'] = startData.isValid() ? startData.format("YYYY-MM-DD") : '';
      userInfo['end_data'] = endData.isValid() ? endData.format("YYYY-MM-DD") : '';
      userInfo['count_referal'] = item.count_referal;
      userInfo['number_attempts'] = item.number_attempts;

      users.push(userInfo);
    } catch(err) {
      console.log(err, 'Проблемы с проверкой подписки');
    }
  }

  return users;
}

function writeCellValue(cell, value) {
  const workbook = xlsx.readFile('answers.xlsx');

  // Выбор нужного листа (по имени или индексу)
  const sheet = workbook.Sheets['messages'];
      
  // Устанавливаем значение в ячейку
  sheet[cell].v = value;

  // Сохраняем изменения в файл
  xlsx.writeFile(workbook, 'answers.xlsx');
}

function readCellValue(cell) {
  const workbook = xlsx.readFile('answers.xlsx');
 
  // Выбор нужного листа (по имени или индексу)
  const sheet = workbook.Sheets['messages'];
   
  // Считывание текста из ячейки cell
  const cellValue = sheet[cell];
  const cellText = cellValue ? cellValue.v.toString() : '';
  
  return cellText;
}

module.exports = initUser
