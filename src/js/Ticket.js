export default class Ticket{
    constructor(elem){
        this.container = elem.querySelector('.all-tickets-container')
        this.addButton = elem.querySelector('.add-ticket-btn')
        this.onTicketClick = this.onTicketClick.bind(this)
        this.init()
    }

    init(){
        const URL = 'http://localhost:7071' + '?method=allTickets'
        fetch(URL, {
            method: 'GET',
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            for(let obj of data){
                this.renderTicket(obj)
            }
        })

        this.container.addEventListener('click', this.onTicketClick)
        this.addButton.addEventListener('click', () => {
            document.querySelector('.add-form-modal').classList.add('show')
        })

    }


    renderTicket(data){
        const ticket = document.createElement('div')
        ticket.classList.add('ticket')
        ticket.innerHTML = `
        <div class="main-ticket-content">
            <div class="done-btn-container"></div>
            <div class="content"></div>
            <div class="edit-container">
                <div class="date"></div>
                <div class="edit"></div>
                <div class="delete"></div>
            </div>
            </div>
            <div class="description-ticket">

            </div>
        `
        ticket.querySelector('.content').innerText = data.name
        ticket.querySelector('.date').innerText = Ticket.formatDate(new Date(data.created))
        ticket.dataset.id = data.id

        

        this.container.appendChild(ticket)
    }

    static formatDate(date) {
        let dayOfMonth = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();
      
        year = year.toString().slice(-2);
        month = month < 10 ? '0' + month : month;
        dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
        hour = hour < 10 ? '0' + hour : hour;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
        
      }

    removeTicket(event){
        const ticket = event.target.closest('.ticket')
        const URL = 'http://localhost:7071/'+ '?id=' + ticket.dataset.id
        fetch(URL, {
            method: 'DELETE',
        }).then(response=>{
            if(response.ok){
                ticket.remove()
            }
        })
    }

    onTicketClick(event){
        if(event.target.closest('.delete')){
            this.removeTicket(event)
        } else if(event.target.closest('.done-btn-container')){
            this.checkTicket(event)
        } else if(event.target.closest('.edit')){
            this.editTicket(event)
        } else {
            this.showDetailedTicket(event)
        }
    }

    checkTicket(event){
        event.target.closest('.done-btn-container').classList.toggle('checked')
        const ticket = event.target.closest('.ticket')
        const URL = 'http://localhost:7071/' + '?id=' + ticket.dataset.id
        fetch(URL, {
            method: 'PATCH',
        }).then(response => response.text())
        .then(data => console.log(data))
    }

    editTicket(event){
        const modal = document.querySelector('.edit-form-modal')
        const ticket = event.target.closest('.ticket')
        const nameModal = modal.querySelector('input')
        const descriptionModal = modal.querySelector('textarea')

        modal.classList.add('show')
        nameModal.value = ticket.querySelector('.content').innerText
        this.getFullInfoById(ticket.dataset.id)
        .then(data => {
            descriptionModal.value = data.description
        })

        


        // event.target.closest('.done-btn-container').classList.toggle('checked')
        // const ticket = event.target.closest('.ticket')
        // const URL = 'http://localhost:7071/' + '?id=' + ticket.dataset.id
        // fetch(URL, {
        //     method: 'PATCH',
        // }).then(response => response.text())
        // .then(data => console.log(data))
    }

    showDetailedTicket(event){
        
        const ticket = event.target.closest('.ticket')
        const descriptionTicket= ticket.querySelector('.description-ticket')
        descriptionTicket.classList.toggle('show')
        if(descriptionTicket.innerText === ''){
            this.getFullInfoById(ticket.dataset.id)
            .then(data => {                
                descriptionTicket.innerText = data.description
            })
        }        
    }

    getFullInfoById(id){
        const URL = 'http://localhost:7071/' + '?method=ticketById&id=' + id
        return fetch(URL, {method: 'GET'})
                .then(response => response.json())
            
    }
}