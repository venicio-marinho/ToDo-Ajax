<?php
    namespace Source;

    use PDO;
    use PDOException;

    class Main {
        private $db_drive="mysql";
        private $db_host="192.185.131.59";
        private $db_user="brabo277_user_amaterazu";
        private $db_name="brabo277_amaterazu";
        private $db_password="nl3L)FYF]Dnm";

        private $db;
        private $db_error;

        private $response;

        function __construct() {
            try {
                $this->db=new PDO("". $this->db_drive .":host=". $this->db_host .";dbname=". $this->db_name ."", "". $this->db_user ."", "". $this->db_password ."");
                $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }catch(PDOException $e) {
                echo 'ERROR: ' . $e->getMessage();
            };
        }

        function getTask() {
            $query=$this->db->query("SELECT `id`, `nome`, `status` FROM `ToDo`");
            $html=null;

            while($row = $query->fetch(PDO::FETCH_OBJ)) {
                $classCheck=($row->status == "Concluido")? "task-ok" : "";
                $iconCheck=($row->status == "Concluido")? "<i class='bi bi-check-lg'></i>" : "";

                $html.="
                        <div class='item $classCheck'>
                            <p data-id='". $row->id ."' class='btn-complete'>". $row->nome ." $iconCheck</p>

                            <button data-id='". $row->id ."' class='btn-delete'><i class='bi bi-trash-fill'></i></button>
                        </div>
                        ";
            }

            if($html != null) {
                $this->response['status'] = 1;
                $this->response['task'] = $html;
            }else{
                $html="
                            <div class='item no-task'>
                                <p>Sem tarefas cadastradas</p>
                            </div>
                        ";

                $this->response['status'] = 0;
                $this->response['error'] = 'Sem tarefas cadastradas';
                $this->response['task'] = $html;
            }

            return $this->response;
        }

        function __insert($data=null) {
            $query=$this->db->prepare("INSERT INTO `ToDo` (`nome`, `status`) VALUES (:nome, :statusTask)");
            $query->bindValue(":nome", $data);
            $query->bindValue(":statusTask", 'Pendente');
            $return = $query->execute();

            if($return) {
                $this->response['status'] = 1;
                $this->response['nova_tabela'] = $this->getTask();
            }else{
                $this->response['status'] = 0;
                $this->db_error=$query->errorInfo();
                $this->response['error'] = 'Erro ao realizar operação ' . $this->db_error;
            }

            return $this->response;
        }

        function __update($data=null) {
            $query=$this->db->query("SELECT `id`, `nome`, `status` FROM `ToDo` WHERE `id` = '$data'");
            $result = $query->fetch(PDO::FETCH_OBJ);

            if($result->status == "Pendente") {
                $query=$this->db->prepare("UPDATE `ToDo` SET `status`='Concluido' WHERE `id` = :id");
            }else{
                $query=$this->db->prepare("UPDATE `ToDo` SET `status`='Pendente' WHERE `id` = :id");
            };

            $query->bindValue(":id", $data);
            $return = $query->execute();

            if($return) {
                $this->response['status'] = 1;
                $this->response['nova_tabela'] = $this->getTask();
            }else{
                $this->response['status'] = 0;
                $this->db_error=$query->errorInfo();
                $this->response['error'] = 'Erro ao realizar operação ' . $this->db_error;
            }

            return $this->response;
        }

        function __delete($data=null) {
            $query=$this->db->prepare("DELETE FROM `ToDo` WHERE `id` = :id");
            $query->bindValue(":id", $data);
            $return = $query->execute();

            if($return) {
                $this->response['status'] = 1;
                $this->response['nova_tabela'] = $this->getTask();
            }else{
                $this->response['status'] = 0;
                $this->db_error=$query->errorInfo();
                $this->response['error'] = 'Erro ao realizar operação ' . $this->db_error;
            }

            return $this->response;
        }
    }