<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('COntent-Type: application/json');

$response = array(
  'error'=> NULL,
  'data'=> NULL,
  'request' => NULL
);


$seqId = $_GET['id'];

if( !ISSET($seqId) && empty($seqId)){
  header('HTTP/1.1 404');
  $response['error'] = 'no sequence-id'; 
  print json_encode( $response );
  exit;
}


$string = file_get_contents("./sequences/".$seqId.".json");
$json = json_decode($string, true);
$response['data'] = $json; 
header('HTTP/1.1 201 OK');
print_r(json_encode( $response ));
  
?>
