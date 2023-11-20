class Toasts{
    constructor(param) {
        this.param = param;

        (this.param === undefined || this.param.classMod === undefined || this.param.classMod.length <= 0)? this.classMod = "toasts-event" : this.classMod = this.param.classMod;
        (this.param === undefined || this.param.disabledBtn === undefined || this.param.disabledBtn.length <= 0)? this.disabledBtn = false : this.disabledBtn = this.param.disabledBtn;

        (this.param === undefined || this.param.icon === undefined || this.param.icon.length <= 0)? this.icon = false : this.icon = this.param.icon;
        (this.param === undefined || this.param.iconColor === undefined || this.param.iconColor.length <= 0)? this.iconColor = "#fff" : this.iconColor = this.param.iconColor;
        (this.param === undefined || this.param.iconSize === undefined || this.param.iconSize.length <= 0)? this.iconSize = "14px" : this.iconSize = this.param.iconSize;

        (this.param === undefined || this.param.posX === undefined || this.param.posX.length <= 0)? this.posX = "right" : this.posX = this.param.posX;
        (this.param === undefined || this.param.posY === undefined || this.param.posY.length <= 0)? this.posY = "bottom" : this.posY = this.param.posY;
        (this.param === undefined || this.param.posDistance === undefined || this.param.posDistance.length <= 0)? this.posDistance = "15px" : this.posDistance = this.param.posDistance;
        (this.param === undefined || this.param.center === undefined || this.param.center.length <= 0)? this.center = false : this.center = this.param.center;

        (this.param === undefined || this.param.delay === undefined || this.param.delay.length <= 0)? this.delay = 5 : this.delay = this.param.delay;
        (this.param === undefined || this.param.duration === undefined || this.param.duration.length <= 0)? this.duration = 5000 : this.duration = this.param.duration + '000';
        (this.param === undefined || this.param.location === undefined || this.param.location.length <= 0)? this.location = false : this.location = this.param.location;
        (this.param === undefined || this.param.redirectionDelay === undefined || this.param.redirectionDelay.length <= 0)? this.redirectionDelay = 600 : this.redirectionDelay = this.param.redirectionDelay;

        (this.param === undefined || this.param.progress === undefined || this.param.progress.length <= 0)? this.progress = false : this.progress = this.param.progress;
        (this.param === undefined || this.param.progressColor === undefined || this.param.progressColor.length <= 0)? this.progressColor = "#198754" : this.progressColor = this.param.progressColor;
        (this.duration == 5000)? this.durationProgress = 5 : this.durationProgress = this.param.duration;
        
        (this.param === undefined || this.param.textTitle === undefined || this.param.textTitle.length <= 0)? this.textTitle = "Lorem Ipson" : this.textTitle = this.param.textTitle;
        (this.param === undefined || this.param.textBody === undefined || this.param.textBody.length <= 0)? this.textBody = "" : this.textBody = this.param.textBody;
        (this.param === undefined || this.param.textFooter === undefined || this.param.textFooter.length <= 0)? this.textFooter = "" : this.textFooter = this.param.textFooter;
        (this.param === undefined || this.param.btnClosed === undefined || this.param.btnClosed.length <= 0)? this.btnClosed = true : this.btnClosed = this.param.btnClosed;

        (this.param === undefined || this.param.fontSizeTitle === undefined || this.param.fontSizeTitle.length <= 0)? this.fontSizeTitle = "14px" : this.fontSizeTitle = this.param.fontSizeTitle;
        (this.param === undefined || this.param.fontSizeBody === undefined || this.param.fontSizeBody.length <= 0)? this.fontSizeBody = "14px" : this.fontSizeBody = this.param.fontSizeBody;
        (this.param === undefined || this.param.fontSizeFooter === undefined || this.param.fontSizeFooter.length <= 0)? this.fontSizeFooter = "14px" : this.fontSizeFooter = this.param.fontSizeFooter;
        
        (this.param === undefined || this.param.bgColorTitle === undefined || this.param.bgColorTitle.length <= 0)? this.bgColorTitle = "rgb(33, 37, 41)" : this.bgColorTitle = this.param.bgColorTitle;
        (this.param === undefined || this.param.bgColorBody === undefined || this.param.bgColorBody.length <= 0)? this.bgColorBody = "rgb(33, 37, 41)" : this.bgColorBody = this.param.bgColorBody;
        (this.param === undefined || this.param.bgColorFooter === undefined || this.param.bgColorFooter.length <= 0)? this.bgColorFooter = "rgb(33, 37, 41)" : this.bgColorFooter = this.param.bgColorFooter;

        (this.param === undefined || this.param.colorTitle === undefined || this.param.colorTitle.length <= 0)? this.colorTitle = "#fff" : this.colorTitle = this.param.colorTitle;
        (this.param === undefined || this.param.colorBody === undefined || this.param.colorBody.length <= 0)? this.colorBody = "#fff" : this.colorBody = this.param.colorBody;
        (this.param === undefined || this.param.colorFooter === undefined || this.param.colorFooter.length <= 0)? this.colorFooter = "#fff" : this.colorFooter = this.param.colorFooter;
        
        if($('link[href*="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"]').length == 0) {
            $(`body`).prepend('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');
        };

        this.height = $(`.${this.classMod}`).height() / 2;
        this.width = $(`.${this.classMod}`).width() / 2;

        this.#__verifyElement();
    }

    #__verifyElement() {
        if($(`.toastsMod`).length == 0) {
            this.#__init();
            this.#__elementCreator(); 
        }
    }

    #__init() {
        setTimeout(() => {
            this.#__eventClosed(this.classMod, this.location, this.posX, this.delay, this.duration, this.disabledBtn);
            this.#__style(this.classMod, this.btnClosed, this.icon);
        }, 300);
    }

    #__elementCreator() {
        $("body").prepend(`<div class='toastsMod ${this.classMod}'></div>`);

        $(`.${this.classMod}`).append(`<div class='toasts_title'>${this.textTitle}</div>`);
        (this.textBody != "")? $(`.${this.classMod}`).append(`<div class='toasts_body'>${this.textBody}</div>`) : $(this.classMod + " .toasts_body").remove();
        (this.textFooter != "")? $(`.${this.classMod}`).append(`<div class='toasts_footer'>${this.textFooter}</div>`) : $(this.classMod + " .toasts_footer").remove();
        (this.btnprogress == true)? $(`.${this.classMod}`).append(`<div class='toasts_progress' style='animation: progress ${this.durationProgress}s 0.3s linear;'></div>`) : $(`.${this.classMod} .toasts_title .toasts_progress`).remove();
        (this.btnClosed == true)? $(`.${this.classMod} .toasts_title`).append('<button class="toasts_closed"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>') : $(`.${this.classMod} .toasts_title .toasts_closed`).remove();
        (this.icon != false)? $(`.${this.classMod} .toasts_title`).prepend(`${this.icon}`) : this.icon = false;
    }

    #__eventClosed(classMod, location, posX, delay, duration, disabledBtn, redirectionDelay) {
        if(disabledBtn !== false) {
            $(disabledBtn).attr("disabled", "disabled");
        };

        $(`.${classMod} .toasts_closed`).click(function() {
            if(location != false) {
                window.location = location;
            };
            if(disabledBtn !== false) {
                $(disabledBtn).removeAttr("disabled");
            };
            if(posX == "right") {
                $(`.${classMod}`).css({
                    "margin-right": "20%",
                    "opacity": 0
                });
            }else if(posX == "left") {
                $(`.${classMod}`).css({
                    "margin-left": "20%",
                    "opacity": 0
                });
            }

            setTimeout(() => {
                $(`.${classMod}`).remove();
            }, (delay + 1) + "00");
        });

        setTimeout(() => { // DURAÇÃO DA MENSAGEM
            if(posX == "right") {
                $(`.${classMod}`).css({
                    "margin-right": "20%",
                    "opacity": 0
                });
            }else if(posX == "left") {
                $(`.${classMod}`).css({
                    "margin-left": "20%",
                    "opacity": 0
                });
            }
            
            if(location != false) {
                setTimeout(() => {
                        window.location = location;
                }, redirectionDelay);
            };

            setTimeout(() => {
                if(disabledBtn !== false) {
                    $(disabledBtn).removeAttr("disabled");
                };

                $(`.${classMod}`).remove();
            }, (delay + 1) + "00");
        }, duration);
    }

    #__style(classMod, btnClosed, icon) {
        if(btnClosed == false) {
            $(`.${this.classMod} .toasts_title`).css({
                "justify-content": "left",
                "gap": "15px"
            });
        };

        if(icon != false) {
            $(`.${this.classMod} .toasts_title i`).css({
                "color": `${this.iconColor}`,
                "font-size": `${this.iconSize}`
            });
        };

        if(this.center == true) {        
            $(`.${classMod}`).css({
                "left": "50%",
                "top": "50%",
                "margin": `-${this.height}px 0 0 -${this.width}px`,
                "transition": `.${this.delayStart}s`
            });
        };

        if(this.posX == "right" && this.center == false) {
            $(`.${classMod}`).css({
                "right": `${this.posDistance}`,
                "transition": `.${this.delay}s`
            });
        }else if(this.posX == "left" && this.center == false) {
            $(`.${classMod}`).css({
                "left": `${this.posDistance}`,
                "transition": `.${this.delay}s`
            });
        };

        if(this.posY == "bottom" && this.center == false) {
            $(`.${classMod}`).css({
                "bottom": `${this.posDistance}`,
                "transition": `.${this.delay}s`
            });
        }else if(this.posY == "top" && this.center == false) {
            $(`.${classMod}`).css({
                "top": `${this.posDistance}`,
                "transition": `.${this.delay}s`
            });
        };

        if($(`.${this.classMod} .toasts_title`).length) {
            $(`.${this.classMod} .toasts_title`).css({
                "background-color": `${this.bgColorTitle}`,
                "color": `${this.colorTitle}`,
                "font-size": `${this.fontSizeTitle}`
            });
        }
        if($(`.${this.classMod} .toasts_body`).length) {
            $(`.${this.classMod} .toasts_body`).css({
                "background-color": `${this.bgColorBody}`,
                "border-top": "1px solid #fff",
                "color": `${this.colorBody}`,
                "font-size": `${this.fontSizeBody}`
            });
        }
        if($(`.${this.classMod} .toasts_footer`).length) {
            $(`.${this.classMod} .toasts_footer`).css({
                "background-color": `${this.bgColorFooter}`,
                "border-top": "1px solid #fff",
                "color": `${this.colorFooter}`,
                "font-size": `${this.fontSizeFooter}`
            });
        };
        if($(`.${this.classMod} .toasts_progress`).length) {
            $(`.${this.classMod} .toasts_progress`).css({
                "background-color": `${this.progressColor}`
            });
        };
        

        $(`.${classMod}`).toggleClass("tast_view");
    }
}