const spinButton = document.getElementById('spinButton');
const betInput = document.getElementById('betAmount');
const totalMoneyDisplay = document.getElementById('totalMoney');


const slotMachineIcons = [
    "🍒","🍒","🍒","🍒","🍒","🍒","🍒","🍒","🍒","🍒", // Cherries
    "🔔","🔔","🔔","🔔","🔔","🔔","🔔","🔔","🔔","🔔", // Bell
    "🎰","🎰","🎰","🎰","🎰","🎰","🎰","🎰","🎰","🎰", // Slot Machine
    "💰","💰","💰","💰","💰","💰","💰","💰","💰","💰", // Money Bag
    "💎","💎","💎","💎","💎","💎","💎","💎","💎","💎", // Gem Stone
    "🍀","🍀","🍀","🍀","🍀","🍀","🍀", // Four Leaf Clover (Luck)
    "💵","💵","💵","💵","💵","💵","💵", // Dollar Banknote
    "💳","💳","💳","💳","💳","💳","💳", // Credit Card
    "🃏","🃏","🃏","🃏","🃏", // Playing Card
    "⭐","⭐","⭐","⭐","⭐", // Star
    "7️⃣","7️⃣","7️⃣", // Number 7
];
let totalMoney = 1000; // Initial total money
updateTotalMoneyDisplay();

spinButton.addEventListener('click', spin);

function spin() {
    const betAmount = parseInt(betInput.value);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }
    if (betAmount > totalMoney) {
        alert("You don't have enough money to place this bet.");
        return;
    }
    // Update total money by deducting the bet amount
    totalMoney -= betAmount;
    updateTotalMoneyDisplay();

    // Define spinning duration and interval time
    const spinningDuration = 2000; // in milliseconds
    const intervalTime = 100; // in milliseconds

    // Calculate number of spins
    const totalSpins = spinningDuration / intervalTime;

    // Disable the spin button during spinning
    spinButton.disabled = true;

    // Spin the slots
    let spinCount = 0;
    const spinningInterval = setInterval(() => {
        // Randomize the icons in each slot
        for (let i = 1; i <= 9; i++) {
            const slot = document.getElementById(`slot${i}`);
            const randomIndex = Math.floor(Math.random() * slotMachineIcons.length);
            slot.textContent = slotMachineIcons[randomIndex];
        }
        spinCount++;
        if (spinCount >= totalSpins) {
            clearInterval(spinningInterval);

            // Enable the spin button after spinning stops
            spinButton.disabled = false;

            // Calculate the result
            const results = [];
            for (let i = 1; i <= 9; i++) {
                const slot = document.getElementById(`slot${i}`);
                results.push(slot.textContent);
            }
            // Update total money based on the outcome
            const payout = calculatePayout(results);
            totalMoney += betAmount * payout;
            updateTotalMoneyDisplay();
            // Display the final results
            console.log(results); // You can replace this with your logic to determine winnings
        }
    }, intervalTime);
}
function calculatePayout(results, betAmount) {
    // Check if the icons in the middle row are the same
    const middleRow = [results[3], results[4], results[5]];
    const middleRowIcons = new Set(middleRow);
    if (middleRowIcons.size === 1) {
        const icon = middleRow[0];
        if (icon === "🍒" || icon === "🔔" || icon === "🎰" || icon === "💰") {
            return 4 * betAmount;
        } else if (icon === "💎" || icon === "🍀" || icon === "💵" || icon === "💳") {
            return 5 * betAmount;
        } else if (icon === "🃏" || icon === "⭐") {
            return 8 * betAmount;
        } else if (icon === "7️⃣") {
            return 200 * betAmount;
        }
    }
    return 0;
}
function updateTotalMoneyDisplay() {
    totalMoneyDisplay.textContent = totalMoney;
}