const items = document.querySelectorAll('.github-popup-content');
items.forEach (item => {
    const subItems = item.querySelectorAll('p');
    subItems.forEach(subItem => {
        console.log(subItem.dataset.link);
    });
});
