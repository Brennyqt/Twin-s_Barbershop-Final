document.addEventListener('DOMContentLoaded', () => {
  const dropdownParents = document.querySelectorAll('.dropdown-parent');

  dropdownParents.forEach(parent => {
    const icon = parent.querySelector('a'); // clickable user icon
    icon.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      // close other dropdowns
      dropdownParents.forEach(otherParent => {
        if (otherParent !== parent) otherParent.classList.remove('active');
      });

      parent.classList.toggle('active');
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener('click', () => {
    dropdownParents.forEach(parent => parent.classList.remove('active'));
  });
});
