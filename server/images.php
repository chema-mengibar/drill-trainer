<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('COntent-Type: application/json');

$dirName = 'images'; 
$cardFilesNames = array_diff(scandir($dirName), array('.', '..')); 

$response = array(
  'error'=> NULL,
  'data'=> $cardFilesNames,
  'request' => NULL
);


header('HTTP/1.1 201 OK');
print_r(json_encode( $response ));
  
?>
