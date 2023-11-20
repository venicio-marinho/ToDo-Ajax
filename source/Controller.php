<?php
    require __DIR__ . '/Main.php';

    use Source\Main;

    function responseData($data) {
        switch ($data['type']) {
            case 'getTask':
                $main = new Main();
                $response = $main->getTask();
            break;

            case 'insert':
                $main = new Main();
                $response = $main->__insert($data['dado']);
            break;

            case 'update':
                $main = new Main();
                $response = $main->__update($data['dado']);
            break;

            case 'delete':
                $main = new Main();
                $response = $main->__delete($data['dado']);
            break;
            
            default:
                $response="Operação invalida!";
            break;
        };

        return $response;
    }

    $embed=responseData($_POST);

    print_r(json_encode($embed));