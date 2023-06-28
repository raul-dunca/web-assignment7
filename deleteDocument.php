<html>


<body>
  
  
  <?php

            $con = new mysqli("localhost", "root", "", "db_documents");
            #

            if (!$con){
                die('Could not connect: ' . mysqli_error());
            }
            
            //$id = $_POST['id'];

            $id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

            if(!$id)
              {
                return http_response_code(400);
              }

            $sql = "DELETE FROM documents WHERE id=$id";


            if(mysqli_query($con, $sql))
            {
              http_response_code(204);
            }
            else
            {
              return http_response_code(422);
            }
        //    $result = mysqli_query($con, $sql);
                
        //     if (!mysqli_query($con, $sql)) {
				// 	printf("%d Row deleted.\n", mysqli_affected_rows($con));
				// }
        //         mysqli_close($con);
            
        ?>
  </body>
</html>