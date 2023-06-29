<?php

//funsc.phpを読み込む 複数箇所で使う関数をまとめておくと楽
require_once("funcs.php");

//1.  DB接続します
try {
  //Password:MAMP='root',XAMPP=''
  $pdo = new PDO('mysql:dbname=gs_db;charset=utf8;host=localhost','root','');
} catch (PDOException $e) {
  exit('DBConnectError'.$e->getMessage());
}

//２．データ取得SQL作成
$stmt = $pdo->prepare("SELECT * FROM gs_bm_table");
$status = $stmt->execute();

//３．データ表示
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>データ</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>

    <header>
        <a href="index.php">データ登録</a>
    </header>

    <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Tag</th>
                    <th>Story</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($rows as $row): ?>
                <tr>
                    <td><?= h($row['title']) ?></td>
                    <td><?= h($row['tag']) ?></td>
                    <td><?= h($row['story']) ?></td>
                    <td><?= h($row['date']) ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
    </table>




    
</body>
</html>

