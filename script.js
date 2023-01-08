let editor = document.getElementById("editor");
let cube = document.getElementById("cube");

class Compiler {
    constructor(values) {
        this.values = values;
        this.valid_styles_list = ["background", "height", "width", "border", "borderRadius", "rotate"];
        this.default_styles_list = {
            "background": 'burlywood',
            "height": '100px',
            "width": "100px",
            "border": "none",
            "borderRadius": "0px",
            "rotate": "0deg"
        }
        this.compile(this.values);
        this.style_avalibility_checker()
    }
    compile(values) {
        let split_row = this.values.split("\n");
        for (let row of split_row) {
            for (let valid_style of this.valid_styles_list) {
                if (row.includes(valid_style+"(")) {
                    let style = valid_style;
                    let value = row.replace(style, '').replace('(', '').replace(')', '');
                    cube.style[style] = value;
                } else {
                    console.log("Invalid style");
                }
            }
        }
    }
    style_avalibility_checker() {
        for (let valid_style of this.valid_styles_list) {
            console.log(valid_style);
            if (!(this.values.includes(valid_style))) {
                console.log("not"+ this.default_styles_list[valid_style]);
                cube.style[valid_style] = this.default_styles_list[valid_style];
            }
        }
    }
}

const save = (e) => {
    let editor_value = e.target.value;
    localStorage.setItem('cube-style', editor_value)
}

const load = (e) => {
    let editor_value = localStorage.getItem("cube-style");
    editor.value = editor_value;
}

editor.oninput = (e) => {
    save(e);
    let compiler = new Compiler(e.target.value);
};
window.onload = (e) => { 
    load(e);
    let compiler = new Compiler(editor.value);
};


