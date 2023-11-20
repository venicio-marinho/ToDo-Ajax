class Loading{
    constructor(param) {
        this.param = param;

        (this.param === undefined || this.param.type === undefined || this.param.type.length <= 0)? this.type = 1 : this.type = this.param.type;
        (this.param === undefined || this.param.element === undefined || this.param.element.length <= 0)? this.element = false : this.element = this.param.element;
        (this.param === undefined || this.param.classMod === undefined || this.param.classMod.length <= 0)? this.classMod = "" : this.classMod = this.param.classMod;
        (this.param === undefined || this.param.bgContainer === undefined || this.param.bgContainer.length <= 0 || this.param.bgContainer != true)? this.bgContainer = "rgba(0, 0, 0, .8)" : this.param.bgContainer;
        (this.param === undefined || this.param.bgColor === undefined || this.param.bgColor.length <= 0 || this.param.bgColor != true)? this.bgColor = "#0099ff" : this.param.bgColor;
        (this.param === undefined || this.param.color === undefined || this.param.color.length <= 0 || this.param.color != true)? this.color = "#b7b7b7" : this.param.color;
        
        (this.param === undefined || this.param.remove === undefined || this.param.remove.length <= 0 || this.param.remove != true)? this.remove = false : this.remove = this.param.remove;

        (this.param === undefined || this.param.help === undefined || this.param.help.length <= 0 || this.param.help != true)? this.help = false : this.#__help();

        this.#__init();
        this.#__style();
    }

    #__init() {
        (this.remove === true)? this.#__remove() : this.#__elementCreator();
    }

    #__remove() {
        $("#loading").hide('slow');
        $("#loading").remove();
    }

    #__elementCreator() {
        $("body").prepend(`<div id='loading' class='${this.classMod}'></div>`);
            
        switch(this.type) {
            case 1:
                this.typeLoad = "circle-border";
                $("#loading").append(`<span class='${this.typeLoad}'></span>`);
            break;

            case 2:
                this.typeLoad = "cube-border";
                $("#loading").append(`<span class='${this.typeLoad}'></span>`);
            break;

            case 'bar':

            break;
        }
    }

    #__style() {
        let arrLoadAllBorder = ['circle-border', 'cube-border'];
        let arrLoadAllBackground = ['bar-animation', 'spinner'];

        arrLoadAllBorder.forEach((element, index) => {
            $(`.${element}`).css({
                "border-color": `${this.bgColor}`
            });
        });
        
        arrLoadAllBackground.forEach((element, index) => {
            $(`.${element}`).css({
                "background-color": `${this.bgColor}`
            });
        });
    }

    #__help() {
        //$("body").prepend(`<div id='help-load'></div>`);
    }
}