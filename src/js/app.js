import Ticket from "./Ticket"

const ticket = new Ticket(document.querySelector('.all-tickets-container'))

const addTicketButton = document.querySelector('.add-ticket-btn')
const form = document.querySelector('.add-ticket-form')
const addTicketCancelButton = document.querySelector('.add-form-cancel-button')

addTicketCancelButton.addEventListener('click', (event) => {
    event.target.closest('.modalBackground').classList.remove('show')
})

addTicketButton.addEventListener('click', () => {
    document.querySelector('.add-form-modal').classList.add('show')
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    fetch('http://localhost:7071', {
        method: 'POST',
        body: new FormData(form),
    }).then(response => response.json())
    .then(data => {
        console.log(data.id)
        ticket.renderTicket(data)
    })

    form.reset()
    form.closest('.modalBackground').classList.remove('show')
})