<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>データ登録</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>

    <header>
        <a href="select.php">データ</a>
    </header>
    
    <div>
    <h3>しりとり作成</h3>    
    </div>

    <form id="chat-form" autocomplete="off">
        <input type="text" id="chat-input" placeholder="Enterで送信" />
        <div id="chat-window">
          <pre id="chat-history"></pre>
          </form>
        </div>
    
    <form method="post" action="insert.php">
        <div>
                <h3>しりとり登録</h3>
                <label>Title<input type="text" name="title"></label><br>

                <label>お気に入り度<select size="1" name="tag">
                    <option>⭐️</option>
                    <option>⭐️⭐️</option>
                    <option>⭐️⭐️⭐️</option>
                </select></label><br>

                <button id=story>反映<label></button></label><br>
                <label><textArea name="story" rows="4" cols="40"></textArea></label><br>
                <input type="submit" value="保存">
        </div>
    </form>



<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="./js/chat.js"></script>

</body>
</html>