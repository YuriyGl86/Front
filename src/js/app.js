import Ticket from './Ticket';

const ticket = new Ticket(document.querySelector('.container'));
ticket.init();

// const form = document.querySelector('.add-ticket-form')

// form.addEventListener('submit', (event) => {
//     event.preventDefault()

//     fetch('http://localhost:7071', {
//         method: 'POST',
//         body: new FormData(form),
//     }).then(response => response.json())
//     .then(data => {
//         console.log(data.id)
//         ticket.renderTicket(data)
//     })

//     form.reset()
//     form.closest('.modalBackground').classList.remove('show')
// })
