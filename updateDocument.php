<html>


<body>
  
  
<?php

          $con = new mysqli("localhost", "root", "", "db_documents");
          #

          if (!$con){
              die('Could not connect: ' . mysqli_error());
          }
          $postdata = file_get_contents("php://input");
          var_dump($postdata);
          if(isset($postdata) && !empty($postdata))
        {
          $request = json_decode($postdata);
          if ((int)$request->data->id < 1 || trim($request->data->author) == '' || (int)$request->data->nr_of_pages < 0 || trim($request->data->title) == '' || trim($request->data->type) == '' || trim($request->data->format) == '') 
            return http_response_code(400);
          
          //var_dump($_POST);
          // $id = $_POST['id'];
          // $author = $_POST["author"];
          // $title = $_POST["title"];
          // $nr_of_pages = $_POST["nr_of_pages"];
          // $type = $_POST["type"];
          // $format = $_POST["format"];
          $id    = mysqli_real_escape_string($con, (int)$request->data->id);
          $author = mysqli_real_escape_string($con, trim($request->data->author));
          $title = mysqli_real_escape_string($con, trim($request->data->title));
          $nr_of_pages = mysqli_real_escape_string($con, (int)$request->data->nr_of_pages);
          $type = mysqli_real_escape_string($con, trim($request->data->type));
          $format = mysqli_real_escape_string($con, trim($request->data->format));



          $sql = "UPDATE documents SET author='$author', title='$title', nr_of_pages='$nr_of_pages', type='$type', format='$format' WHERE id='$id'";

          
          $result = mysqli_query($con, $sql);
        if(mysqli_query($con, $sql))
        {
            http_response_code(204);
        }
        else
        {
            return http_response_code(422);
        }  
      }

?>
  </body>
</html>