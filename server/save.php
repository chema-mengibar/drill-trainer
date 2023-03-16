<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$filename = $_FILES['drill']['name'];

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$name = $data['name'];
$description = $data['description'];
$drill = $data['drill'];
$frames = $data['frames'];

$arr = array(
  'id' => $id,
  'description' => $description,
  'name' => $name,
  'drill' => $drill,
  'frames' => $frames
);

$response = array(
  'error'=> NULL,
  'data'=> $arr,
  'file'=> $$filename,
  'request' => NULL
);

$file = "./sequences/".$id.".json";
file_put_contents($file, json_encode( $arr ));

header('HTTP/1.1 201 OK');
print_r(json_encode( $response ));















?>
