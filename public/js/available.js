$.get("/api/all", function(data) {
  for (var i = 0; i < data.length; i++) {
    // Create a parent div to hold item data
    var wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "item-well-" + i);
      $("#well-section").append(wellSection);

      $("#item-well-" + i).append("<h2>" + (i + 1) + ". " + data[i].name + "</h2>");
      $("#item-well-" + i).append("<h3>Category: " + data[i].category + "</h4>");
      $("#item-well-" + i).append("<h3>Quantity: " + data[i].quantity + "</h4>");
      $("#item-well-" + i).append("<h3>Expiration (Days): " + data[i].expiration + "</h4>");
      $("#item-well-" + i).append("<button class='reserve btn btn-primary' data-id='" + data[i].id + "'>Reserve</button>");
    }

      function renderItem(data) {

        $(".reserve").click(function() {
          
          var info = {
            id: $(this).attr("data-id")
          };
    
          $.post("/api/reserved", info)
            .done(function(deldata) {
              console.log(deldata);
              console.log("Deleted Successfully!");
            });
          $(this).closest("div").remove();   
        });    
      }
      renderItem();
});