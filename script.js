let orderItems = [];

function addItem() {
    const input = document.getElementById("itemInput");
    const item = input.value.trim();
    if (item) {
        orderItems.push(item);
        const li = document.createElement("li");
        li.textContent = item;
        document.getElementById("orderList").appendChild(li);
    }
    input.value = "";
}

function submitOrder() {
    fetch('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderItems })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById("total").textContent = data.total;
        }
    })
    .catch(error => {
        alert("Error processing order.");
        console.error(error);
    });
}
document.getElementById("submitBtn").addEventListener("click", function () {
    fetch("/submit_order", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderItems })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("total").innerText = `Total: Rs. ${data.total}`;
        if (data.invalid_items.length > 0) {
            alert("These items are not in the menu: " + data.invalid_items.join(", "));
        }
    });
});

