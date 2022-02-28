window.onload = () => {
    const cards = document.querySelectorAll('.flipper');

    const flipTwice = () => {
        setTimeout(() => {
            for(i=0; i < 18; i++) {
                cards[i].style.transitionDelay = `${i * 100}ms`;
                cards[i].classList.add('rotated');
            }
        }, 1000)
        
        setTimeout(() => {
            cards.forEach(card => card.classList.remove('rotated'));
        }, 5000)
    }

    timer = setInterval(() => {
        flipTwice();
    }, 8000)

    flipTwice();
}



