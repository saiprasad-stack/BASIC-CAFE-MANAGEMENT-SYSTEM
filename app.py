from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Menu items with lowercase keys for consistent matching
menu = {
    "coffee": 300,
    "espresso": 400,
    "burger": 500,
    "fries": 600,
    "milkshake": 700
}

@app.route('/')
def home():
    return render_template('index.html', menu=menu)

@app.route('/submit_order', methods=['POST'])
def submit_order():
    try:
        data = request.get_json()
        print("Received data:", data)

        order_items = data.get('items', [])
        total = 0
        invalid_items = []

        for item in order_items:
            item_lower = item.lower()
            if item_lower in menu:
                total += menu[item_lower]
            else:
                invalid_items.append(item)

        return jsonify({
            "total": total,
            "invalid_items": invalid_items
        })

    except Exception as e:
        print("Error in /submit_order:", e)
        return jsonify({"error": "Server error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
