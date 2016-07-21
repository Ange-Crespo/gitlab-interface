<?php



dibi::connect([
     'driver'    => 'mysql' ,
     'host'      => 'localhost' ,
     'username' => 'pydiouser' ,
     'password' => '123' ,
     'database' => 'pydiodb' ,
     'charset'   => 'utf8' ,
]);


dibi::query('SELECT * FROM Tokens_gitlab WHERE login_user = "admin" ', $admin);

var_dump($admin);


?>
