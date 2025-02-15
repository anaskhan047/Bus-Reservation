const seats = document.querySelectorAll(".female-seat, .male-seat");
let selectedSeats = [];

const updateSelection = () => {
  const selectedSeatList = document.getElementById("selected-seat");
  const seatCounter = document.getElementById("counter");
  const totalPrice = document.getElementById("total");

  selectedSeatList.innerHTML = "";
  selectedSeats.forEach((seat) => {
    const li = document.createElement("li");
    li.textContent = `Seat ${seat}`;
    selectedSeatList.appendChild(li);
  });

  seatCounter.textContent = selectedSeats.length;
  totalPrice.textContent = selectedSeats.length * 25;

  const selectedSeat = document.querySelector("#selected-seat");
  if (selectedSeats.length > 0) {
    selectedSeat.classList.add("has-seats");
  } else {
    selectedSeat.classList.remove("has-seats");
  }
};

// Seat click event listener
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    const seatNumber = seat.getAttribute("data-seat");

    if (seat.classList.contains("booked")) {
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      seat.style.backgroundImage = "";
      seat.style.textShadow = "";
      selectedSeats = selectedSeats.filter((s) => s !== seatNumber);
    } else {
      seat.style.backgroundImage =
        "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)";
      seat.style.textShadow = "2px 2px 5px #000";
      selectedSeats.push(seatNumber);
    }

    updateSelection();
  });
});

// Handle the "Submit Book" button click
const submitButton = document.querySelector(".checkout-button");
submitButton.addEventListener("click", () => {
  selectedSeats.forEach((seatNumber) => {
    const seat = Array.from(seats).find(
      (s) => s.getAttribute("data-seat") === seatNumber
    );
    if (seat) {
      seat.classList.add("booked");
      seat.style.backgroundColor = "red";
      seat.style.backgroundImage = "";
    }
  });

  selectedSeats = [];
  updateSelection();
});

// Reset button functionality
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  selectedSeats = [];
  seats.forEach((seat) => {
    seat.style.background = "";
    seat.style.backgroundColor = "";
    seat.classList.remove("booked");
  });
  updateSelection();
});
