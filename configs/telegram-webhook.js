try {
  var params = JSON.parse(value);

  if (!params.bot_token) {
    throw "Missing bot_token parameter";
  }
  if (!params.chat_id) {
    throw "Missing chat_id parameter";
  }

  var message = params.subject + "\n" + params.message;

  var data = {
    chat_id: params.chat_id,
    text: message,
    disable_web_page_preview: true,
  };

  var request = new HttpRequest();
  request.addHeader("Content-Type: application/json");

  var url = "https://api.telegram.org/bot" + params.bot_token + "/sendMessage";
  var response = request.post(url, JSON.stringify(data));

  Zabbix.log(4, "[Telegram] Response: " + response);

  var result = JSON.parse(response);
  if (!result.ok) {
    throw result.description || "Unknown error";
  }

  return "OK";
} catch (error) {
  Zabbix.log(3, "[Telegram] Error: " + error);
  throw "Sending failed: " + error;
}
