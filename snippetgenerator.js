$(function() {
    // Load names from names.txt
    $.get("names.txt", function(data) {
      // Split the contents into an array of names
      var names = data.split("\n");
  
      // Loop through the array of names and create a new snippet for each name
      for (var i = 0; i < names.length; i++) {
        var name = names[i].trim();
        if (name) {
          // Create a new snippet with the name as the label
          var snippet = $("<div>").addClass("snippet draggable").text(name);
          $("#snippet-container").append(snippet);
        }
      }
  
      // Make the snippets draggable
      $('.snippet.draggable').draggable({
        helper: 'clone'
      });
    });
    
    // Make the cells droppable
    $('.cell').droppable({
      drop: function(event, ui) {
        if ($(this).find('.snippet-content').length === 0) {
          var snippet = ui.draggable.clone();
          snippet.removeClass('draggable').addClass('dropped');
          $(this).html(snippet);
        }
      }
    });
    
    // Remove the snippet from the cell when the remove button is clicked
    $(document).on('click', '.cell .remove', function() {
      $(this).closest('.cell').empty();
    });
    
    // Empty the cell when it is double clicked
    $(document).on('dblclick', '.cell', function() {
      $(this).empty();
    });
  });
  