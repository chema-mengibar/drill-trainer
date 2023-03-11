<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('COntent-Type: application/json');

$cardNames = array();

$dirName = 'sequences'; 
$cardFilesNames = array_diff(scandir($dirName), array('.', '..')); 

foreach ($cardFilesNames as $cardFilesName) {
  $string = file_get_contents("./sequences/".$cardFilesName);
  $json = json_decode($string, true);
  array_push($cardNames, $json);
}


$response = array(
  'error'=> NULL,
  'data'=> $cardNames,
  'request' => NULL
);


header('HTTP/1.1 201 OK');
print_r(json_encode( $response ));
  
?>
