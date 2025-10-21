reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    const service = document.getElementById('service').value;

    if (!dateInput || !timeInput || !service) {
        alert("Please complete all fields.");
        return;
    }

    const selectedDate = new Date(dateInput);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // bawal na mag book kapag lumipas na ang araw
    if (selectedDate < today) {
        alert("You cannot select a past date.");
        return;
    }

    const [hours, minutes] = timeInput.split(":").map(Number);

    // dapat mag book 8 am to 8 pm lang
    if (hours < 8 || hours > 20 || (hours === 20 && minutes > 0)) {
        alert("We're open from 8:00 AM to 8:00 PM only.");
        return;
    }

    const now = new Date();

    // prevent booking today if time ay tapos na
    if (selectedDate.toDateString() === now.toDateString()) {
        const selectedTime = hours + minutes / 60;
        const currentTime = now.getHours() + now.getMinutes() / 60;

        if (selectedTime <= currentTime) {
            alert("You cannot book a time that has already passed today.");
            return;
        }
    }

    // Save reservation details to localStorage
    localStorage.setItem('service', service);
    localStorage.setItem('date', dateInput);
    localStorage.setItem('time', timeInput);

    alert("Reservation successful!");
    window.location.href = "payment.html";
});
