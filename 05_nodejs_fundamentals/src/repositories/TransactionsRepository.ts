import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsWithBalance {
    const { transactions } = this;
    if (!transactions) {
      throw Error('No transactions exists');
    }
    const balance = this.getBalance();
    const transactionsWithBalance: TransactionsWithBalance = {
      transactions,
      balance,
    };
    return transactionsWithBalance;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    if (transactions.length === 0) {
      const income = 0;
      const outcome = 0;
      const total = income - outcome;
      const balance = {
        income,
        outcome,
        total,
      };
      return balance;
    }
    const transactionsIncomes = this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      }
      return 0;
    });
    const income = transactionsIncomes.reduce(
      (previous, next) => previous + next,
    );

    const transactionsOutcomes = this.transactions.map(transaction => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }
      return 0;
    });
    const outcome = transactionsOutcomes.reduce(
      (previous, next) => previous + next,
    );

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
