from web3 import Web3

def generate_message(contract_address, user_address, token_id):
    w3 = Web3()
    message_hash = w3.solidityKeccak(
        ['address', 'address', 'uint256'],
        [contract_address, user_address, token_id]
    )
    # Convert hash to Ethereum signed message hash (adding Ethereum's prefix)
    eth_signed_message_hash = w3.solidityKeccak(
        ['string', 'bytes32'],
        ["\x19Ethereum Signed Message:\n32", message_hash]
    )
    return eth_signed_message_hash.hex()

# Example usage:
contract_address = "0xYourContractAddress"
user_address = "0xUserAddress"
token_id = 123
message = generate_message(contract_address, user_address, token_id)
print("Message to sign:", message)
