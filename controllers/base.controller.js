import bot from '../bot/telegramBot.js'


export const sendToTelegram = async (req, res) => {

  const chat_id = process.env.CHAT_ID
  const { name, email, phone, message } = req.body;

  const messageFromSite = `
  <b>Кому то Вы нужны:</b>
  ${name}
  ${email}
  ${phone}
  ${message}
  `;
  const messageOptions = { parse_mode: 'HTML' };

  await bot.sendMessage(chat_id, messageFromSite, messageOptions)
    .then(() => {
      res.status(200).json({
        message: "Thank you. I will get back to you as soon as possible.",
      });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Ahh, something went wrong. Please, check your credentials and try again.",
      });
    });
};



