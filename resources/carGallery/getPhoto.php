<?php

$strStart ="https://images.toyota-europe.com/ua/product-token/eaf24b0d-dbb9-44e1-b501-2ebab086f04a/vehicle/777faf80-20b4-448e-86ba-ae0347403072/accessories/";

if (isset($_REQUEST['color'])) {$color = $_REQUEST['color']; }
else {$color = '070';}
if (isset($_REQUEST['currentNum'])) {$currentNum = $_REQUEST['currentNum']; }
else {$currentNum = 3;}
if (isset($_REQUEST['wheelsType'])) {$wheelsType =$_REQUEST['wheelsType']; }
else {$wheelsType = 14473;}


echo $strStart . $wheelsType . "/width/1160/height/446/scale-mode/1/padding/10/background-colour/F0F0F0/image-quality/75/day-exterior-" . $currentNum . "_" . $color . '_FJ20.jpg';
