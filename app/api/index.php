<?php

require 'vendor/autoload.php';

ini_set("display_errors", 1);

session_start();

use Respect\Rest\Router;

$r3 = new Router('/api');

//$autenticado = (bool) rand(0,1);


$r3->any('/login', function() {

          $data = json_decode(file_get_contents('php://input'), true);

          if (($data['login'] == 'vh' && $data['senha'] == '202cb962ac59075b964b07152d234b70') || ($data['login'] == 'silva' && $data['senha'] == 'caf1a3dfb505ffed0d024130f58c5cfa')) {
            $_SESSION['logado'] = true;
            
            header('HTTP/1.1 200');
            echo "200";
          } else {
            header('HTTP/1.1 401 Unauthorized');
            echo "401";
          }
          return; //json_encode($data.status);
        });

$r3->any('/logout', function() {

          $_SESSION['logado'] = false;
          session_destroy();
        });

$r3->get('/who', function() {

          if (isset($_SESSION['logado']) && $_SESSION['logado'] == true) {
            header("Content-Type: application/json");
            $who =  exec('who');
            return $who;
          } else {
            header('HTTP/1.1 401 Unauthorized');
          }
        });
        
$r3->get('/history', function() {
          if (isset($_SESSION['logado']) && $_SESSION['logado'] == true) {
            header("Content-Type: application/json");
            $history =  exec('sudo history');
            //$history =  exec('cat /var/log/kern.log');
            return json_encode($history);
          } else {
            header('HTTP/1.1 401 Unauthorized');
          }
        });


print $r3->run();
