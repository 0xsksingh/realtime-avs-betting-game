# Realtime AVS Betting Game

Welcome to the Realtime AVS Betting Game.

This project brings the excitement of betting on a roulette-style game to the blockchain. Players can wager on various outcomes and see results in real-time, all powered by random numbers generated using a customized Actively Validated Service (AVS).

## Actively Validated Services (AVS)

### What is AVS?

Actively Validated Services (AVS) is an innovative technology within the EigenLayer framework that allows the creation of distributed validation systems for various purposes, such as random number generation, data availability layers, and oracle networks. AVS leverages the security and decentralization of the EigenLayer validator network to ensure the integrity and fairness of the services provided.

### Customizing AVS for Random Number Generation

In this project, we customized an AVS to interact with the Movement network to generate random numbers. This custom AVS queries the last digit of a block hash from the Movement network, ensuring a fair and unbiased source of randomness for the betting game.

## Creating the Custom AVS

### Understanding AVS and Setup

We started by understanding the basics of AVS from EigenLayer’s documentation. An AVS requires an off-chain layer for executing operations and validators (operators) who sign off on these operations. Key components include:

- **StrategyManager**: Where stakers deposit assets to stake.
- **DelegationManager**: Lets stakers choose which operators to delegate to.
- **AVSDirectory**: Directory of all registered AVSs.
- **ServiceManager**: Entry point for each AVS, implementing the interface expected by the EigenLayer protocol.

### Implementing the Incredible Squaring AVS

Initially, we implemented a simple AVS example, the Incredible Squaring AVS, which squares a number and stores the result on-chain. This AVS follows these steps:

1. **Task Generation**: A number is sent to the AVS contract to be squared.
2. **Event Emission**: The AVS contract emits a `NewTaskCreated` event.
3. **Operator Processing**: Operators listen for this event, square the number, and sign the result.
4. **Signature Aggregation**: An aggregator combines these signatures and sends them back to the AVS contract.
5. **Verification**: The AVS contract verifies the aggregated signatures and accepts the squared number if valid.

### Modifying AVS for Random Number Generation

We then modified this AVS to interact with the Movement network. Instead of squaring a number, our custom AVS queries the last digit of a block hash from the Movement network, which serves as the random number.

#### Key Changes:

- **Task Generation**: The number to be squared is replaced with a block height.
- **Operator Processing**: Instead of squaring the number, operators fetch the last digit of the block hash for the given block height.
- **AVS Contract**: Updated to handle and verify the new task responses.

The core of the modification involves querying the Movement network's M1 RPC endpoint to fetch the block hash and extract the last digit. This ensures a fair source of randomness that is publicly verifiable.

### Implementation Steps

1. **Set Up Environment**: Install necessary tools and dependencies, such as Foundry, Docker, and the AVS contracts.
2. **Run Initial AVS**: Deploy and register the Incredible Squaring AVS to understand its workings.
3. **Modify Operator Logic**: Change the logic in `operator.go` to fetch the last digit of the block hash instead of squaring a number.
4. **Update Contract**: Modify the Solidity contract to handle the new random number generation logic.
5. **Deploy and Test**: Deploy the modified AVS and test it with the Movement network to ensure it works correctly.

## How to Play

1. **Place Your Bet**: Choose from different betting options, including:
   - Betting on a single number (0-36)
   - Betting on even or odd numbers
   - Betting on black or red colors
   - Betting on the first or second halves of the table
   - Betting on the first, second, or third thirds of the table

2. **Submit Your Wager**: Each bet requires a minimum of 0.001 ETH to play. You can place your bet by calling the corresponding function with your chosen parameters.

3. **Spin the Wheel**: After placing your bet, call the `spinBettingWheel()` function to spin the wheel and determine the outcome.

4. **Collect Your Winnings**: If your bet is successful, you'll receive payouts based on the odds of your chosen outcome. Payouts range from 2:1 to 35:1, depending on the type of bet.

## Betting Options

- **Single Number**: Bet on a specific number from 0 to 36.
- **Even/Odd**: Bet on whether the winning number will be even or odd.
- **Black/Red**: Bet on whether the winning number will be black or red.
- **First/Second Half**: Bet on whether the winning number will be in the first or second half of the table.
- **First/Second/Third Third**: Bet on whether the winning number will be in the first, second, or third third of the table.

## Smart Contract Details

- **Minimum Bet**: 0.001 ETH or in explorer 100 000 000 000 000
- **House Balance**: The contract ensures that the house (contract) and sponsor wallet remain solvent. If the house balance is too low, it can be refilled by sending ETH directly to the contract address.
- **Random Number Generation**: The contract utilizes random numbers generated using AVS for secure and unbiased random number generation.
- **Interchain Security Module**: Provides additional security measures for interchain communication.

## Getting Started

To start playing, interact with the contract functions using a compatible Ethereum wallet or decentralized application (dApp) interface.

Enjoy the excitement of real-time betting on the blockchain with random numbers generated using a tailored AVS.