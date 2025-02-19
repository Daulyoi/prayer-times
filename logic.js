function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const tanggal = now.getDate();
  const bulan = now.toLocaleString('default', { month: 'long' });
  const tahun = now.getFullYear();
  document.getElementById("currentTime").innerText = `${hours}:${minutes}:${seconds} - ${tanggal} ${bulan} ${tahun}`;
}

setInterval(getTime, 1000);

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const msgContainer = document.getElementById("msgContainer");

  // Check if geolocation is available in the browser
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    msgContainer.innerHTML =
        "<p>Geolocation is not available in your browser.</p>";
}

  // Called if geolocation is successful
  function success(position) {
    const { latitude, longitude } = position.coords;

    // Create Adhan.Coordinates from the user’s location
    const coordinates = new adhan.Coordinates(latitude, longitude);

    // Choose a calculation method (you can choose another from Adhan.CalculationMethod)
    const params = adhan.CalculationMethod.MuslimWorldLeague();
    // Optionally, set the madhab (for Asr calculation). Default is usually Hanafi.
    // params.madhab = adhan.Madhab.Shafi;

    // Get the current date
    const date = new Date();

    // Compute prayer times using the Adhan API
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

    // Format times as locale-specific strings
    const formatTime = (time) =>
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const FajrContainer = document.getElementById("Fajr");
    const DhuhrContainer = document.getElementById("Dhuhr");
    const AsrContainer = document.getElementById("Asr");
    const MagribContainer = document.getElementById("Magrib");
    const IsyaContainer = document.getElementById("Isya");

    FajrContainer.innerText = `${formatTime(prayerTimes.fajr)}`
    DhuhrContainer.innerText = `${formatTime(prayerTimes.dhuhr)}`
    AsrContainer.innerText = `${formatTime(prayerTimes.asr)}`
    MagribContainer.innerText = `${formatTime(prayerTimes.maghrib)}`
    IsyaContainer.innerText = `${formatTime(prayerTimes.isha)}`
}

  // Called if there is an error obtaining geolocation
  function error(err) {
    const msgContainer = document.getElementById("msgContainer");
    console.error("Error obtaining location:", err);
    msgContainer.style.display = "block";
    msgContainer.innerHTML =
      "<p>Unable to retrieve your location. Please ensure location services are enabled and try again.</p>";
  }
});
