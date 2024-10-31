# Personal Finance Management App

A full-stack mobile app for personal finance management developed to help students and young professionals track their expenses, manage budgets, and gain insights into their financial habits. Built with React Native for mobile access and Spring Boot for backend services, with bank data synchronization enabled via Plaid API.

## Features

- **Bank data synchronization**: Secure integration with the Plaid API to link users' bank accounts for real-time transaction tracking.
- **CSV uploads**: Users can upload transaction data manually if they prefer not to link their accounts.
- **Automated categorization**: Transactions are categorized using custom logic for easy identification of spending patterns.
- **Financial insights**: Visualized data insights help users understand their spending habits, highlighting areas of potential savings.
- **User-friendly design**: Mobile-first, minimalistic design tailored for ease of use and accessibility on both iOS and Android devices.

## Technologies Used

- **Frontend**: React Native
- **Backend**: Spring Boot (Java)
- **API integration**: Plaid API for secure bank account linking
- **Data management**: Custom logic for transaction categorization
- **Visualization**: Financial reports and visual insights

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<USERNAME>/<REPOSITORY_NAME>.git
   cd <REPOSITORY_NAME>
   ```

2. **Set Up Backend**:
   - Ensure you have Java and Spring Boot installed.
   - Configure the backend properties, including Plaid API keys.
   - Run the Spring Boot application.

3. **Set Up Frontend**:
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React Native app:
     ```bash
     npx expo start
     ```

## Usage

1. **Link bank accounts**: Users can securely link their bank accounts via Plaid or choose to upload transactions manually.
2. **Track spending**: View categorized transactions and explore visual insights to monitor and manage finances.
3. **Budget-friendly insights**: Review spending patterns, with visualizations tailored to highlight budgeting opportunities.

## Future Enhancements

- **Advanced analytics**: Personalized financial recommendations based on spending history.
- **Multi-account support**: Integration with additional financial accounts for a comprehensive view.
- **Push notifications**: Alerts for budget limits, bill reminders, and more.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Plaid API](https://plaid.com/) for bank integration and data synchronization.
