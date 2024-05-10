window.addEventListener('load', () => {
    const burger = document.querySelector("#burger")
    const menu = document.querySelector("#menu")
    const paw = document.querySelector("#paw")
    
    burger.addEventListener('click', () => {
        if(!burger.classList.contains('open')){
            paw.classList.add('grabing')
            setTimeout(() => {
                paw.classList.remove('grabing')
                burger.classList.toggle('open')
                menu.classList.toggle('open')
            }, 800)
        } else {
            burger.classList.toggle('open')
            menu.classList.toggle('open')
        }
    })
})