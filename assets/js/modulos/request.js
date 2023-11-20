let timeOut = 1000;
let timeAction = 500;

class ToDo {
    constructor(status) {
        // CRIANDO AS TASK
        if(status == 1) {
            this.init();
        }
    }

    init() {
        $.ajax({
            url: 'source/Controller.php',
            type: 'post',
            dataType: 'json',
            data: {
                "type": "getTask"
            },
            success: function(response) {
                new ToDo().redoTable(response, "");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })
    }

    addTask() {
        if($(".input-task").val() != "") {
            const task = $(".input-task").val();

            $.ajax({
                url: 'source/Controller.php',
                type: 'post',
                dataType: 'json',
                data: {
                    "type": "insert",
                    "dado": task
                },
                success: function(response) {
                    $(".input-task").val("");
                    new ToDo().redoTable(response, "Tarefa criada com sucesso!");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            })
        }else{
            new Toasts({
                textTitle: "Preencha o campo!",
                bgColorTitle: "rgb(33,37,41)",
                colorTitle: "rgb(210 210 210)",
                icon: '<i class="fa-solid fa-square"></i>',
                iconColor: "#dc3545",
                btnClosed: false,
                posY: "bottom"
            });
        };
    }

    updateTask(id) {
        $.ajax({
            url: 'source/Controller.php',
            type: 'post',
            dataType: 'json',
            data: {
                "type": "update",
                "dado": id
            },
            success: function(response) {
                new ToDo().redoTable(response, "Tarefa atualizada com sucesso!");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })
    }

    deleteTask(id) {
        $.ajax({
            url: 'source/Controller.php',
            type: 'post',
            dataType: 'json',
            data: {
                "type": "delete",
                "dado": id
            },
            success: function(response) {
                new ToDo().redoTable(response, "Tarefa excluida com sucesso!");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })
    }

    redoTable(el, msg) {
        new Loading();

        $(".list-task").empty();
        $(".list-task").html(el.task);

        $(".list-task").attr({"data-btn": "disabled"});

        setTimeout(() => {
            new Loading({
                remove: true
            });
        
            if(msg != "") {
                new Toasts({
                    textTitle: msg,
                    bgColorTitle: "rgb(33,37,41)",
                    colorTitle: "rgb(210 210 210)",
                    icon: '<i class="fa-solid fa-square"></i>',
                    iconColor: "#198754",
                    btnClosed: false,
                    posY: "bottom",
                    duration: 3,
                    delay: 2
                });
            }

            $(".list-task").attr({"data-btn": "on"});
        }, timeAction);
    }
}

$(function() {
    new ToDo(1);

    setTimeout(() => {
        $('.btn-task').click(function() {
            if($(".list-task").attr("data-btn") == "on") {
                new ToDo().addTask();
            }
        });

        $(document).on("click", ".btn-delete", function() {
            if($(".list-task").attr("data-btn") == "on") {
                new ToDo().deleteTask($(this).attr('data-id'));
            }
        });

        $(document).on("click", ".btn-complete", function() {
            if($(".list-task").attr("data-btn") == "on") {
                new ToDo().updateTask($(this).attr('data-id'));
            }
        });
    }, timeOut);
});