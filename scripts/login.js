const btCadastro = document.querySelector('.btn-cadastro')
const btLogin = document.querySelector('.btn-login')
const formCadastro = document.querySelector('.container-form.cadastro')
const formLogin = document.querySelector('.container-form.login')

btCadastro.addEventListener('click' , () => {
    if(!formCadastro.classList.contains('formAtivo')){
        formCadastro.style.display = 'flex'
        document.querySelector('.formAtivo').classList.remove('formAtivo')
        formCadastro.classList.add('formAtivo')
        setTimeout(() => {
           formLogin.style.display = 'none'
        }, 300);
    }
})


btLogin.addEventListener('click' , () => {
    if(!formLogin.classList.contains('formAtivo')){
        formLogin.style.display = 'flex'
        document.querySelector('.formAtivo').classList.remove('formAtivo')
        formLogin.classList.add('formAtivo')
        setTimeout(() => {
            formCadastro.style.display = 'none'
         }, 300);
    }
})

