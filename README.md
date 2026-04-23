# Secure Information Exchange Simulation

This repository contains a web-based simulation of a secure information exchange protocol between two clients. The program demonstrates the practical application of cryptography by implementing a Diffie-Hellman Key Exchange to establish a shared secret, followed by a custom key transformation process to generate a 128-bit key utilized for AES-128 encryption.

---

## 1. Setup and Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (Node Package Manager)

### Local Environment Initialization

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

Install the required project dependencies:

```bash
npm install crypto-js
```

Initialize the development server:

```bash
npm run dev  # or npm start
```

---

## 2. Technical Stack

- **Frontend Framework:** React.js / Vue.js (Utilized for managing independent states between User A and User B)
- **Cryptographic Library:** CryptoJS (Employed for the AES-128 encryption and decryption processes)
- **Mathematical Operations:** Native JavaScript BigInt (Required to prevent precision loss during high-value modular exponentiation)
- **Styling:** Tailwind CSS (Used to architect the split-screen, three-column network simulation layout)

---

## 3. Cryptographic Implementation Details

### 3.1 Diffie-Hellman Key Exchange

The simulation utilizes the following fixed parameters for the mathematical exchange:

- **Prime ($p$):** 199
- **Generator ($g$):** 127

#### Core Calculations

- **Public Value:** Computed as $g^{\text{private}} \pmod p$
- **Shared Key:** Computed as $\text{Public}^{\text{private}} \pmod p$

### 3.2 Custom AES-128 Key Transformation

The resulting Shared Key is represented as ASCII characters and transformed into a 16-character (128-bit) symmetric key based on its string length:

- **Single-Character Key:** Alternated with the character 'C' (e.g., a shared key of 1 becomes `1C1C1C1C1C1C1C1C`)
- **Two-Character Key:** Alternated with the characters 'DD' (e.g., a shared key of 58 becomes `58DD58DD58DD58DD`)
- **Three-Character Key:** Separated and padded with the character 'F' (e.g., a shared key of 109 becomes `109F109F109F109F109F`)

### 3.3 Message Processing Protocol

- **Data Chunking:** Plaintext messages exceeding 128 bits are divided into discrete sub-messages of exactly 16 characters
- **Data Padding:** Any terminal sub-message containing fewer than 16 characters is padded with the @ symbol (8-bit data `01000000` / ASCII hex `40`) until it reaches the 128-bit requirement
- **Execution:** Each sub-message block is encrypted independently. The resulting ciphertexts are then concatenated to form a single transmission block. Decryption reverses this process by splitting, decrypting, and concatenating the plaintext

---

## 4. Verification and Testing

The implementation can be verified using the following standardized test case:

| Parameter | Value |
|-----------|-------|
| Input Message | "The Mandalorian Must Always Recite, This is The Way!" |
| User A Private Key | 57 |
| User B Private Key | 167 |
| Computed Shared Key | 109 |
| Transformed AES Key | `109F109F109F109F109F` |
| Padding Output | Sub-message 4 correctly pads to `"Way!@@@@@@@@@@@@"` |

---

## Documentation Structure

This README provides:

1. **Setup Instructions** - Quick start guide for installation and development
2. **Technical Overview** - Framework and library details used in the project
3. **Cryptographic Deep Dive** - Mathematical concepts and implementation specifics
4. **Test Cases** - Verification procedures to validate the implementation