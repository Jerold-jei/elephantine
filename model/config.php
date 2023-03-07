<?php
$servername= "localhost";
$username= "abite7kr_elephantine_admin";
$password = "elephantine_admin";
$db_name = "abite7kr_elephantine_db";

$conn = mysqli_connect($servername, $username, $password, $db_name);

if (!$conn) {

    echo "Connection failed!";

}
?>