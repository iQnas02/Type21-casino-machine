const spinButton = document.getElementById('spinButton');
const betInput = document.getElementById('betAmount');


const slotMachineIcons = [
    "🍒", // Cherries
    "🔔", // Bell
    "🎰", // Slot Machine
    "💰", // Money Bag
    "💎", // Gem Stone
    "🍀", // Four Leaf Clover (Luck)
    "💵", // Dollar Banknote
    "💳", // Credit Card
    "🃏", // Playing Card
    "⭐", // Star
    "7️⃣", // Number 7
];

spinButton.addEventListener('click', spin);

function spin() {
    const betAmount = parseInt(betInput.value);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

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

            // Display the final results
            console.log(results); // You can replace this with your logic to determine winnings
        }
    }, intervalTime);
}
