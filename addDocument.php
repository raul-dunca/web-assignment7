
 
  
  <?php

            $con = new mysqli("localhost", "root", "", "db_documents");
            #

            if (!$con){
                die('Could not connect: ' . mysqli_error());
            }
            
            $postdata = file_get_contents("php://input");
            if(isset($postdata) && !empty($postdata))
          {
            $request = json_decode($postdata);
            
            $author = mysqli_real_escape_string($con, trim($request->data->author));
            $title = mysqli_real_escape_string($con, trim($request->data->title));
            $nr_of_pages = mysqli_real_escape_string($con, (int)$request->data->nr_of_pages);
            $type = mysqli_real_escape_string($con, trim($request->data->type));
            $format = mysqli_real_escape_string($con, trim($request->data->format));
            // $author = $_POST["author"];
            // $title = $_POST["title"];
            // $nr_of_pages = $_POST["nr_of_pages"];
            // $type = $_POST["type"];
            // $format = $_POST["format"];

            $sql = "INSERT INTO documents (author, title, nr_of_pages, type, format ) VALUES ('$author', '$title', '$nr_of_pages','$type', '$format')";
                
            if (mysqli_query($con, $sql)) {
					//printf("%d Row inserted.\n", mysqli_affected_rows($con));


          http_response_code(201);
          $document = [
            'author' => $author,
            'title' => $title,
            'nr_of_pages' => $nr_of_pages,
            'type' => $type,
            'format' => $format,
            'id'    => mysqli_insert_id($con)
          ];
          echo json_encode(['data'=>$document]);
				}
        else
        {
          
          http_response_code(422);
        }
                //mysqli_close($con);
      }
            
        ?>
