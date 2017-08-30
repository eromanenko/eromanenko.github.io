document.addEventListener('DOMContentLoaded', function() {
  $('.hidden').hide();
  $('.spoil-link').on('click', function() {
    $(this).next('.spoil-content').slideToggle('medium');
  });
});
