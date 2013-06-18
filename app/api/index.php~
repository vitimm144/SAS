<?php

require 'vendor/autoload.php';

ini_set("display_errors", 1);

session_start();

use Respect\Rest\Router;

$r3 = new Router('/api');

//$autenticado = (bool) rand(0,1);


$r3->any('/login', function() {

          $data = json_decode(file_get_contents('php://input'), true);

          if (($data['login'] == 'vh' && $data['senha'] == 123) || ($data['login'] == 'silva' && $data['senha'] == 123)) {
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

$r3->get('/comando', function() {

          if (isset($_SESSION['logado']) && $_SESSION['logado'] == true) {
            header("Content-Type: application/json");
            $resposta =  shell_exec('ls');
            //echo $resposta
            return $resposta;
            //return json_encode($resposta);
          } else {
            header('HTTP/1.1 401 Unauthorized');
            //return 401;
          }
        });

$r3->post('/campanhas/*/destinos', function($id) {
          return file_get_contents('php://input');
        });


print $r3->run();
