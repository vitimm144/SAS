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

$r3->get('/campanhas/1', function() {

          if (isset($_SESSION['logado']) && $_SESSION['logado'] == true) {
            header("Content-Type: application/json");
            return '{
              "grupo":"Principal",
              "id":1,
              "nome":"Sargento Boening",
              "status":"parada",
              "destinatarios": [
                {
                  "nome": "Paulo César",
                  "telefone": "(24)8114-0922",
                  "data_efetivado": "2013-04-09T11:06:03-0300",
                  "status": "efetivado"
                },
                {
                  "nome": "Jorge Almeida",
                  "telefone": "(24)8714-1256",
                  "status": "tentando"
                },
                {
                  "nome": "Ana Paula Coutinho",
                  "telefone": "(24)2234-1242",
                  "data_efetivado": "",
                  "status": "esgotado"
                }
              ]
            }';
          } else {
            header('HTTP/1.1 401 Unauthorized');
            //return 401;
          }
        });
$r3->get('/campanhas/5', function() {

          if (isset($_SESSION['logado']) && $_SESSION['logado'] == true) {
            header("Content-Type: application/json");
            return '{
              "grupo":"Principal",
              "id":1,
              "nome":"Sargento Boening",
              "status":"curso",
              "destinatarios": [
                {
                  "nome": "Paulo César",
                  "telefone": "(24)8114-0922",
                  "data_efetivado": "2013-04-09T11:06:03-0300",
                  "status": "efetivado"
                },
                {
                  "nome": "Jorge Almeida",
                  "telefone": "(24)8714-1256",
                  "status": "tentando"
                },
                {
                  "nome": "Ana Paula Coutinho",
                  "telefone": "(24)2234-1242",
                  "data_efetivado": "",
                  "status": "esgotado"
                }
              ]
            }';
          } else {
            header('HTTP/1.1 401 Unauthorized');
            //return 401;
          }
        });
$r3->get('/campanhas/1/iniciar', function() {
          return header('HTTP/1.1 200 ok');
        });
$r3->get('/campanhas/5/interromper', function() {
          return header('HTTP/1.1 200 ok');
        });
$r3->get('/campanhas/1/interromper', function() {
          return header('HTTP/1.1 200 ok');
        });

$r3->post('/campanhas/*/destinos', function($id) {
          return file_get_contents('php://input');
        });


print $r3->run();