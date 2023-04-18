<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// for json send
//$data = json_decode(file_get_contents('php://input'), true);




$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$drill = $_POST['drill'];
$useLoop = $_POST['useLoop'];
$useUserInteraction = $_POST['useUserInteraction'];
$frames = json_decode($_POST['frames']);


$filename = '';
$upload = 'no';


// // FILE UPLOAD
// if (isset($_FILES['drill'])) {
//   $filename = $_FILES['drill']['name'];
//   $pathAndName = sprintf(__DIR__ .'/%s.%s',  sha1_file($_FILES['drill']['name']),  'png');
//   if (move_uploaded_file($_FILES['files']['tmp_name'], $pathAndName)){
//     $upload = $pathAndName;
//   }else{
//     $upload = 'error: '.$pathAndName;
//   };
// }


$arr = array(
  'id' => $id,
  'description' => $description,
  'useUserInteraction' => $useUserInteraction,
  'useLoop' => $useLoop,
  'name' => $name,
  'drill' => $drill, //$filename,
  'frames' => $frames
);

$response = array(
  'error'=> NULL,
  'data'=> $arr,
  'upload'=> $upload,
  'request' => NULL
);

$file = "./sequences/".$id.".json";
file_put_contents($file, json_encode( $arr ));

header('HTTP/1.1 201 OK');
print_r(json_encode( $response ));















?>
