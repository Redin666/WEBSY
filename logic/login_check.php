<?php
    session_start();

    $host = 'localhost';
    $dbname = 'Регистрация';
    $username = 'root';
    $password = '';

    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $username = $_POST['username'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM users WHERE username=:username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $row = $stmt->fetch();

        if ($row && password_verify($password, $row['password'])) {
            $_SESSION['username'] = $username;
            header("Location: http://localhost/");
        } else {
            echo "<p style='color: red; font-weight: bold;'>Неверное имя пользователя или пароль.</p>";
            if (isset($_SERVER['HTTP_REFERER'])) {
                $urlback = htmlspecialchars($_SERVER['HTTP_REFERER']);
                echo "<a href='$urlback' style='display: inline-block; margin-top: 10px; padding: 5px 10px; background-color: #333; color: white; text-decoration: none; border-radius: 5px;'>Вернуться назад</a>";
            }            
        }
    } catch(PDOException $e) {
        echo "Ошибка: " . $e->getMessage();
    }
?>
