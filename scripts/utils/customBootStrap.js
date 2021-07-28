// function for the Bootstrap Tooltip

function bootstrapTooltip() {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );

  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      delay: 0,
      animation: true,
    });
  });
}

export { bootstrapTooltip };
