function isValidSteamTradeURL(url) {
  return url.includes("steamcommunity.com/tradeoffer");
}

function submitAppeal() {
  const tradeUrl = document.getElementById("tradeUrl").value.trim();
  if (!isValidSteamTradeURL(tradeUrl)) {
    alert("⚠️ Please enter a valid Steam trade offer URL.");
    return;
  }
  document.getElementById("modal").style.display = "flex";
}

function confirmUnderstanding() {
  document.getElementById("modal").style.display = "none";

  const description = document.getElementById("descriptionBox").value.trim();
  const tradeUrl = document.getElementById("tradeUrl").value.trim();

  fetch("https://steam-appeal-bot-1.onrender.com/api/submit-appeal", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    description: ..., // textarea value
    tradeUrl: ...     // trade URL input
  })
});

  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert(`✅ Appeal submitted successfully! ${data.itemsCount} tradable items were analyzed.`);
    } else {
      alert("⚠️ Something went wrong. Please try again.");
    }
  })
  .catch(err => {
    alert("❌ Server error. Please try again later.");
    console.error(err);
  });
}
