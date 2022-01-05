// (c) Yago Rubio 2021

function Pwdgen () {}
Pwdgen.prototype.getpwd = function ( chars ,
                                     capitals ,
                                     sym ,
                                     length ) {
    let nums = "01234567890123456789";
    let lowercase = "abcdefghjklmnpqrstuvwxyz";
    let uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // https://owasp.org/www-community/password-special-characters - empty
    // "@%+\\/'!$^?:.(){}[]~`-_."; //AD and Oracle Identity safe
    let charsets = [];
    let c = 0;
    let final = "";

    nums =this.shuffleString(nums);
    charsets.push(nums);

    if (chars) {
        lowercase =this.shuffleString(lowercase);
        charsets.push(lowercase);
    }
    if (capitals) {
        uppercase =this.shuffleString(uppercase);
        charsets.push(uppercase);
    }
    if (sym) {
        symbols =this.shuffleString(symbols);
        charsets.push(symbols);
    }

    charsets = this.shuffleArrays(charsets);

    while( c < length ){
        for(let i=0;i<charsets.length;i++){
            let rnd = Math.random() * charsets[i].length;
            final += charsets[i].charAt(rnd);
            if( ++c >= length ) break;
        }
    }
     return this.shuffleString(final);
};
Pwdgen.prototype.shuffleString = function( str ) {
    let a = Array.from(str)
    a.sort(() => Math.random() - 0.5);
    return a.join("");
}
Pwdgen.prototype.shuffleArrays = function( arr ) {
    let size =arr.length;
    let numbers = [];
    let charsets = [];
    for(let i=0;i<size;i++){
        numbers.push(i);
    }
    numbers.sort(() => Math.random() - 0.5);
    for(let z=0;z<size;z++){
        charsets[z] = arr[numbers[z]];
    }
    return charsets;
}
Pwdgen.prototype.create_ui = function () {
    let str=" <input class=\"ui-button\" type=\"text\" id=\"outputpwd\" disabled/><br />\n"
        +"    <input type=\"checkbox\" class=\".ui-checkboxradio\" id=\"lower\" name=\"lower\">y minusculas</input><br />\n"
        +"    <input type=\"checkbox\" class=\".ui-checkboxradio\" id=\"upper\" name=\"upper\">y mayusculas</input><br />\n"
        +"    <input type=\"checkbox\" class=\".ui-checkboxradio\" id=\"sym\" name=\"sym\">y simbolos</input><br />\n"
        +"    <label for=\"size\">Tamaño </label>\n"
        +"    <select id=\"size\" name=\"size\">\n"
        +"        <option value=\"5\">5</option>\n"
        +"        <option value=\"10\">10</option>\n"
        +"        <option value=\"15\">15</option>\n"
        +"        <option value=\"20\">20</option>\n"
        +"    </select><br />\n"
        +"    <button class=\"ui-button\" id=\"create_pwd_button\">Crear</button><br />";
    $("#pwddiv").append(str);
};
$(function() {
    let p = new Pwdgen();
    p.create_ui();
    $("#create_pwd_button").on("click", function () {
        let outputInput = $("#outputpwd");
        let numpos = $("#numpos");
        let lower = $("#lower").prop('checked');
        let upper = $("#upper").prop('checked');
        let sym = $("#sym").prop('checked');
        let size = $("#size option:selected").text();
        outputInput.val(p.getpwd(lower, upper, sym, size));
    });
});
