import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
export default class TransactionsRepository extends Repository<Transaction> {

  public async getBalance(): Promise<BalanceDTO> {
    const transactionsRepository = getRepository(Transaction)
    const transactions = await transactionsRepository.find()

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((previous, current) => {
        return previous + current.value
      }, 0)

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((previous, current) => {
        return previous + current.value
      }, 0)

    const total = income - outcome

    return { income, outcome, total }
  }
}
