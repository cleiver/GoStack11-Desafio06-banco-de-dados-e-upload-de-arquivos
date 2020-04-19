import { getRepository, getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

export default class CreateTransactionService {
  public async create({ title, value, type, category }: TransactionDTO): Promise<Transaction> {

    // TODO: Refactor
    if (!title) {
      throw new AppError('Title is required.', 403);
    }
    if (!value) {
      throw new AppError('Value is required.', 403);
    }
    if (!type) {
      throw new AppError('Type is required.', 403);
    } else if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Type must be "income" or "outcome".', 403);
    }
    if (!category) {
      throw new AppError('Category is required.', 403);
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    // Check if it has enought money to spend
    if (type === 'outcome') {
      const amount = await transactionsRepository.getBalance();

      if (amount.total < value) {
        throw new AppError('You do not have enought funds for this operation', 400);
      }
    }

    // Normalize the category
    const categoryId = await this.getCategoryId(category);

    // Create and save the transaction
    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: categoryId
    })

    await transactionsRepository.save(transaction)

    return transaction
  }

  private async getCategoryId(category: string): Promise<string> {
    const categoriesRepository = getRepository(Category);
    const existingCategory = await categoriesRepository.findOne({ title: category });

    if (!existingCategory) {
      const newCategory = categoriesRepository.create({ title: category });
      await categoriesRepository.save(newCategory);

      return newCategory.id;
    }

    return existingCategory.id;
  }
}
