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
});

$('.droppable').droppable({
  accept: '.snippet',
  drop: function(event, ui) {
    $(this).html($(ui.draggable).html());
    $(ui.draggable).addClass('gray');
  }
});

$('.droppable').dblclick(function() {
  $(this).empty();
  $('.snippet.gray').removeClass('gray');
});
