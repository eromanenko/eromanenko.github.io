function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function render(element) {
    let code = shuffle([1, 2, 3, 4]);
    code.length = 3;
    element.textContent = code.join('.');
}

function initApp() {
    const element = document.querySelector('#code');
    render(element);
    
    element.addEventListener('click', _ => {
        if (confirm('Новый код?')) {
            render(element);
        }
    })
}