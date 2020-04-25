<?php

    include "logic.php";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="style.css">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- FontAwesome -->
    <script src="https://kit.fontawesome.com/147089592b.js" crossorigin="anonymous"></script>

    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <title>Covid 19 Case Tracker</title>
</head>
<body>
    
    <div class="container-fluid bg-light p-5 text-center my-3">
        <h1>Covid-19 Tracker</h1>
        <h5 class="text-muted">Keep track of all the Covid-19 Cases around the world</h5>
    </div>

    <div class="container">
        <div class="row text-center my-5">
            <div class="col-4 text-warning">
                <h5>Confirmed</h5>
                <?php echo $total_confirmed ?>
            </div>
            <div class="col-4 text-success">
                <h5>Recovered</h5>
                <?php echo $total_recovered ?>
            </div>
            <div class="col-4 text-danger">
                <h5>Deceased</h5>
                <?php echo $total_deceased ?>
            </div>
        </div>
    </div>

    <div class="container">
        <input class="form-control" type="text" name="search" id="search" placeholder="Search Country...">
        <ul class="lists-group" id="result"></ul>
    </div>

    <div class="container-fluid">
        <div class="table-responsive">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Countries</th>
                    <th scope="col">Confirmed</th>
                    <th scope="col">Recovered</th>
                    <th scope="col">Deceased</th>
                </tr>
            </thead>

            <tbody>
            <?php
            foreach($data as $key => $value) {
                $increase = $value[$days_count]['confirmed'] - $value[$days_count_prev]['confirmed'];
            ?>

                <tr>
                    <th><?php echo $key?></th>
                    <td>
                    <?php echo $value[$days_count]['confirmed']?>
                    <?php if($increase != 0) {?>
                        <small class="text-danger pl-3"> <i class="fas fa-long-arrow-alt-up"></i><?php echo $increase?></small>
                    <?php }?>
                    
                    </td>
                    <td><?php echo $value[$days_count]['recovered']?></td>
                    <td><?php echo $value[$days_count]['deaths']?></td>
                    
                </tr>

            <?php }?>
            </tbody>
        </table>
        </div>
    </div>



<script>
    $(document).ready(function(){
        $(#search).key_up(function() {
            $(#result).html();
            var searchField = $(#search).val();
            var expression = new RegExp(searchField, "i");
            $.getJSON('https://pomber.github.io/covid19/timeseries.json', function(data){
                $each(data, function(key, value){
                    
                });
            });
        });
    });
</script>

<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<footer class="footer mt-auto py-3">
  <div class="container text-center">
    <span class="text-muted">Copyright &copy; 2020, <a href="https://mojahed-coder.github.io/portfolio-mojahed.com/">Mojahed Habib</a></span>
  </div>
</footer>

</body>
</html>