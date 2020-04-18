<?php

if (!$_POST) exit('No direct script access allowed');

	$arr["msg"] = "Thank you for your letter, ";
	$arr["name"] = $_POST['name'];
	$arr["phone"] = $_POST['phone'];
	$arr["email"] = $_POST['email'];
	$arr["message"] = $_POST['message'];


$to = 'denisfeelonenko@gmail.com';
$subject = 'Письмо с сайта-портфолио';

$name = trim(strip_tags($_POST['name']));
$phone = trim(strip_tags($_POST['phone']));
$email = trim(strip_tags($_POST['email']));
$mes = trim(strip_tags($_POST['message']));

$message = 'Имя: ' . $name . "\r\n" . 'Номер телефона: ' . $phone . "\r\n" . 'Email: ' . $email . "\r\n" . 'Сообщение: ' . $mes; 
$headers = 'From: ' . $email . "\r\n";

$subject = preg_replace("/(\r\n)|(\r)|(\n)/", "", $subject);
$subject = preg_replace("/(\t)/", " ", $subject);
$subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

mail($to, $subject, $message, $headers);

echo json_encode($arr);

?>




