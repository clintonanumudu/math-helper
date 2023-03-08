var exercises = [
    "Polynomial division",
    "Finding the roots of a polynomial"
]

function dropdown(array) {
    $.each(array, function(index, value) {
        var item = $("<div/>");
        item.attr("class", "results");
        item.text(value);
        item.css("width", $("#search").width()+13);
        item.css("height", $("#search").height());
        $("#search").parent().append(item);
    });
};

$('#search').on('input', function() {
    var i = $("#search").val();
    var results = [];
    $(".results").remove();
    $.each(exercises, function(index, value) {
        if (i && value.toLowerCase().startsWith(i.toLowerCase())) {
            results.push(value);
            dropdown(results);
        }
    })
});