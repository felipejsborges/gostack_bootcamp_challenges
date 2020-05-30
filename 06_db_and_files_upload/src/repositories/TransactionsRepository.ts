import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async all(): Promise<TransactionsWithBalance> {
    const transactions = await this.find();
    const balance = await this.getBalance();
    const transactionsWithBalance = {
      transactions,
      balance,
    };
    return transactionsWithBalance;
  }

  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
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

    const transactionsIncomes = transactions.map(transaction => {
      if (transaction.type === 'income') {
        return Number(transaction.value);
      }
      return 0;
    });
    const income = transactionsIncomes.reduce(
      (previous, next) => previous + next,
    );

    const transactionsOutcomes = transactions.map(transaction => {
      if (transaction.type === 'outcome') {
        return Number(transaction.value);
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
}

export default TransactionsRepository;
