
//GPTの役割メモ（pitch cart）
//         { 'role' : 'system', 'content' : "【役割】 あなたはAI編集者です。私は起業家です。あなたは、親しみやすいキャラクターで、私をいつも励ましてください。【目標】 あなたは、私が投資家向けピッチのストーリーを書くサポートをしてください。対話を通じて、私がストーリーをまとめることが、目標です。【フロー】１）あなたはまず『こんにちは！　わたしはあなたのストーリー作りを手伝うAI編集者です。どんな事業を考えていますか？　ごく簡単でいいので教えてください』と私に話しかけてください。２）私の回答を受けて、なぜそう思ったのか、原体験を思い出させるような質問をさまざまな角度からたくさんしてください。３）私が抽象的な回答をしたときは、より具体的な描写になるよう導いてください。４）私がストーリーに満足したようであれば、一旦そこまでのやりとりをまとめてください。もし私が続きを求めたら、会話を続けてください。【ルール】・質問は一度にひとつずつにしてください。・抽象的な回答が続くようであれば、あなたは「たとえば」と具体的な例を示しつつ、質問をしてみてください。" },


let messageHistory = [];

  async function appendAssistantResponse(assistantMessage) {
    messageHistory.push(
        { 'role': 'system',
        'content': 'しりとりを続けてください。その際、語尾に「ほげ」をつけて回答してください。'
        },
        { 'role': 'assistant', 'content': assistantMessage },
        );
  }

  $('#chat-form').on('submit', async function (event) {
    event.preventDefault();
    const userMessage = $('#chat-input').val();
    $('#chat-history').append('<p class="you">' + userMessage + '</p>');

    messageHistory.push(
        { 'role': 'system',
    'content': 'しりとりを続けてください。その際、語尾に「ほげ」をつけて回答してください。'
    },
        { 'role': 'user', 'content': userMessage },
    );

    const formData = $(this).serialize();
    const url = 'https://api.openai.com/v1/chat/completions';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer APIキー',
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'stream': true,
        'messages': messageHistory,
      }),
    });

    if (!response.ok) {
      console.error('Error:', await response.text());
      return;
    }

    $("#chat-input").val("");
    $("#chat-input").focus();

    const reader = response.body.getReader();
    const textDecoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      buffer += textDecoder.decode(value, { stream: true });

      while (true) {
        const newlineIndex = buffer.indexOf('\n');
        if (newlineIndex === -1) {
          break;
        }

        const line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.startsWith('data:')) {

          if (line.includes('[DONE]')) {
            $('#chat-history').append('<hr>');
            return;
          }

          const jsonData = JSON.parse(line.slice(5));

          if (jsonData.choices && jsonData.choices[0].delta && jsonData.choices[0].delta.content) {
            const assistantMessage = jsonData.choices[0].delta.content;
            $('#chat-history').append('' + assistantMessage + '');
            await appendAssistantResponse(assistantMessage);
          }
        }
      }
    }
  });

  const chatWindow = document.getElementById('chat-window');
  function scrollChatWindow() {
    const chatWindowHeight = chatWindow.clientHeight;
    const chatWindowScrollHeight = chatWindow.scrollHeight;
    const chatWindowTextHeight = chatWindowScrollHeight - chatWindow.scrollTop;
    if (chatWindowTextHeight > chatWindowHeight) {
      chatWindow.scrollTop = chatWindowScrollHeight;
    }
  }
  chatWindow.addEventListener('DOMNodeInserted', scrollChatWindow);

//GPTからもらった回答
  function updateTextArea() {
      var chatInput = document.getElementById("chat-input");
      var storyTextarea = document.getElementById("story-textarea");
      storyTextarea.value = chatInput.value;
  }

  $('#story').click(function() {
    // console.log('クリックされました！');
  
  });



