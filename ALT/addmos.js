$(function() {
    let selectedSnippet = null;
  
    $('.snippet').draggable({
      helper: 'clone',
      start: function(event, ui) {
        selectedSnippet = $(this);
      }
    });
  
    $('.cell').droppable({
      drop: function(event, ui) {
        if ($(this).find('.snippet-content').length === 0) {
          $(this).html(selectedSnippet.html());
          $(this).find('.snippet-content').addClass('dropped');
          selectedSnippet.addClass('dropped');
          selectedSnippet = null;
        }
      }
    });
  
    $(document).on('click', '.cell .remove', function() {
      const cell = $(this).closest('.cell');
      const snippetContent = cell.find('.snippet-content');
      if (snippetContent.length) {
        snippetContent.removeClass('dropped');
        cell.empty();
      }
    });
  
    $(document).on('dblclick', '.cell', function() {
      $(this).empty();
    });
  
    $('#add-snippet').click(function() {
      const value = $('#snippet-name').val();
      if (value) {
        const snippet = $('<div>').addClass('snippet draggable').text(value);
        $('#snippet-container').append(snippet);
        snippet.draggable({
          helper: 'clone',
          start: function(event, ui) {
            selectedSnippet = $(this);
          }
        });
      }
      $('#snippet-name').val('');
    });
  
    $('#snippet-name').keypress(function(event) {
      if (event.which === 13) {
        event.preventDefault();
        $('#add-snippet').click();
      }
    });
  });
  