export default class Ticket{
    constructor(elem){
        this.container = elem
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
    }


    renderTicket(data){
        const ticket = document.createElement('div')
        ticket.classList.add('ticket')
        ticket.innerHTML = `
        <div class="done-btn-container"></div>
        <div class="content"></div>
        <div class="edit-container">
            <div class="date"></div>
            <div class="edit">edit</div>
            <div class="delete">X</div>
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
        }
    }

    checkTicket(event){
        event.target.closest('.done-btn-container').classList.toggle('checked')
        const ticket = event.target.closest('.ticket')
        const URL = 'http://localhost:7071/' + ticket.dataset.id
        fetch(URL, {
            method: 'PATCH',
        }).then(response => response.text())
        .then(data => console.log(data))
    }
}