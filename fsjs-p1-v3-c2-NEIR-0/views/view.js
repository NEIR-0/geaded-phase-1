class View {
  // Tambahkan sendiri method yang kamu butuhkan
  static showError(err){
    console.log(`terjadi error`, err);
  }

  static showCommandList(){
    console.log(`
node app.js
node app.js help
node app.js theaterList
node app.js customerList
node app.js checkSeat
node app.js buyTicket 
node app.js ticketInfo
    `);
  }

  static help(){
    console.log(`
node app.js
node app.js help
node app.js theaterList
node app.js customerList
node app.js checkSeat <id_theater>
node app.js buyTicket <id_theater> <nama_penonton> <gender_penonton> <seat_number> <tipe ticket>
node app.js ticketInfo <id_penonton>
    `);
  }

  static listTheater(data){
    const tamplate = data.map((el) => {
      return {
        "Theater ID": el.id,
        "Theater Name": el.name,
        "Movie": el.movie,
      }
    })

    console.table(tamplate);
  }

  static listCustomer(data){
    // console.log(data[0].ticket.theaterName);
    const tamplate = data.map((el) => {
      return {
        "ID": el.id,
        "Name": el.name,
        "Gender": el.gender,
        "Theater Name": el.ticket.theaterName,
      }
    })

    console.table(tamplate);
  }

  static checkSeat(data){
    console.log(data);
  }

  static addCustomer(newData){
    if(typeof newData == "string"){
      console.log(newData);
    }
    else{
      let seatNumber = newData.ticket.seatNumber
      let theater = newData.ticket.theaterName
      let movie = newData.ticket.movie
      console.log(`Success buy ticket for seat ${seatNumber} for ${theater} to watch ${movie}`);
    }
  }

  static ShowTicketInfo(data){
    if(typeof data === "string"){
      console.log(data);
    }
    else{
      let setNumber = data.ticket.private
      console.log(`This ${data.ticket.type} ticket are booked for ${data.name} to watch ${data.ticket.movie} with seat number ${setNumber}`);
    }
  }
 
}

module.exports = View