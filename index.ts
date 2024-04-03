#!/usr/bin/env node
import inquirer from "inquirer";

// Declaration for balance and PIN number
let totalBalance: number = 10000;
const pinNumber: number = 6481;

/**
 * Start the ATM
 * @returns {Promise<void>} Promise that resolves when the function finishes
 */
async function startATM(): Promise<void> {
    const pinEntered: { pin: number } = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: "Enter your pin number",
        }
    ]);

    if (pinEntered.pin === pinNumber) {
        console.log("Correct pin code!!!");

        const option: { action: string } = await inquirer.prompt([
            {
                name: "action",
                message: "Select an action:",
                type: "list",
                choices: [
                    "Fast Cash",
                    "Cash Withdrawal",
                    "Balance Inquiry",
                    "Exit"
                ]
            }
        ]);

        switch (option.action) {
            case "Fast Cash":
                await fastCashWithdrawal();
                break;
            case "Cash Withdrawal":
                await cashWithdrawal();
                break;
            case "Balance Inquiry":
                balanceInquiry();
                break;
            case "Exit":
                console.log("Thank you for using our ATM. Goodbye!");
                process.exit(0);
        }
    } else {
        console.log("Incorrect pin code. Exiting...");
        process.exit(0);
    }
}

// Function for cash withdrawal
async function cashWithdrawal() {
    let amountPrompt = await inquirer.prompt([
        {
            name: "amount",
            message: "Enter the amount you want to withdraw:",
            type: "number"
        }
    ]);
    let withdrawalAmount = amountPrompt.amount;
    if (withdrawalAmount <= totalBalance) {
        totalBalance -= withdrawalAmount;
        console.log(`Withdrawn amount: ${withdrawalAmount}`);
        console.log(`Remaining balance: ${totalBalance}`);
    } else {
        console.log("Insufficient balance!");
    }
}

// Function for fast cash withdrawal
async function fastCashWithdrawal() {
    let amountPrompt = await inquirer.prompt([
        {
            name: "amount",
            message: "Select the amount you want to withdraw:",
            type: "list",
            choices: [
                "1000",
                "3000",
                "5000"
            ]
        }
    ]);
    let withdrawalAmount = parseInt(amountPrompt.amount);
    if (withdrawalAmount <= totalBalance) {
        totalBalance -= withdrawalAmount;
        console.log(`Withdrawn amount: ${withdrawalAmount}`);
        console.log(`Remaining balance: ${totalBalance}`);
    } else {
        console.log("Insufficient balance!");
    }
}

// Function for balance inquiry
function balanceInquiry() {
    console.log(`Your current balance is: ${totalBalance}`);
}

// Start the ATM
startATM();



