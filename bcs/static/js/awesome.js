var txt = "innerText" in HTMLElement.prototype ? "innerText" : "textContent";
var solution;
var arg = {
    resultFunction: function(result) {
        var aChild = document.createElement('li');
        aChild[txt] = result.format + ': ' + result.code;
        document.querySelector('body').appendChild(aChild);
        console.log(aChild.textContent || aChild.innerText);
        solution = aChild;
    }
};
var decoder = new WebCodeCamJS("canvas").init(arg);
function decodeLocalImage(){
    decoder.decodeLocalImage();
}

var url="http://127.0.0.1:5000";



$(document).ready(function() {
    $("#cmd").click(function(){
        var bcode = (solution.textContent || solution.innerText);
        var barcode_data = {
           'Type': 'CODE39',
           'Barcode': bcode
        };
        $.ajax({
            type: "POST",
            cache: false,
            data:JSON.stringify(barcode_data),
            contentType: 'application/json;charset=UTF-8',
            url: url,
            dataType: "json",
            success: function(data) { 
                console.log(data);                    
            },
            error: function(jqXHR) {
                console.log("error: " + jqXHR.status);
                console.log(jqXHR);

    },
    })
        
    }); 
});


