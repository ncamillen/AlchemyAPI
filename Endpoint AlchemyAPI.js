// Function to transfer USDT to your Alchemy wallet using Alchemy's API
func transferUSDTToAlchemy(amount: Double, toAddress: String) {
    // Alchemy API endpoint for sending transactions
    guard let alchemyURL = URL(string: "https://eth-mainnet.g.alchemy.com/v2/gtjAlklo2AQvfVTGswRezRYZiQZYPRyw") else {
        print("Invalid Alchemy API URL")
        return
    }
    
    // Prepare the transaction data
    let transactionData: [String: Any] = [
        "jsonrpc": "2.0",
        "method": "eth_sendTransaction",
        "params": [
            [
                "to": toAddress,
                "value": amount * 1e18, // USDT amount in wei
                "gas": "0x76c0", // Gas limit for the transaction
                "gasPrice": "0x9184e72a000", // Gas price in wei
                "nonce": "0x7", // Nonce of the transaction
                "data": "" // Additional data if needed
            ]
        ],
        "id": 1
    ]
    
    do {
        // Convert transaction data to JSON
        let jsonData = try JSONSerialization.data(withJSONObject: transactionData)
        
        // Prepare the request
        var request = URLRequest(url: alchemyURL)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = jsonData
        
        // Send the request
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("Error: \(error?.localizedDescription ?? "Unknown error")")
                return
            }
            
            // Parse the response
            if let responseJSON = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                print("Response: \(responseJSON)")
                // Handle response here
            } else {
                print("Error parsing response")
            }
        }
        task.resume()
    } catch {
        print("Error converting transaction data to JSON: \(error.localizedDescription)")
    }
}

// Usage example
let amount = 10.0 // Amount of USDT to transfer
let toAddress = "0x626503d746eDcb05f4B5787653301121563015" // Your Alchemy wallet address

transferUSDTToAlchemy(amount: amount, toAddress: toAddress)
