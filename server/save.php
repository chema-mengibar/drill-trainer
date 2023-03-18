<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
//header('Content-Type: application/json');

// for json send
//$data = json_decode(file_get_contents('php://input'), true);




$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$frames = json_decode($_POST['frames']);


$filename = '';
$upload = '';

if (isset($_FILES['drill'])) {
  $filename = $_FILES['drill']['name'];
  //$path = './'.'images'.'/';
  $path = 'images'.'/';
  $pathAndName = $path.$filename;
  $fileTmp = $_FILES['files']['tmp_name'];
  if(is_writable($path)){
    move_uploaded_file($fileTmp, $pathAndName);
    $upload = $pathAndName;
  }else{
    $upload = 'error_write';
  }
 
}


$arr = array(
  'id' => $id,
  'description' => $description,
  'name' => $name,
  'drill' => $filename,
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
