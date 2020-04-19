import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';

import configUpload from '../config/upload'

import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface UploadDataDTO {
  filename: string;
}

interface csvContent {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

export default class ImportTransactionsService {
  async execute({ filename }: UploadDataDTO): Promise<Transaction[]> {
    const csvFilePath = path.join(configUpload.directory, filename);
    const csvTransactions = await csv().fromFile(csvFilePath);

    const TransactionService = new CreateTransactionService();

    const transactions = csvTransactions.reduce(
      async (accumulator, transaction: csvContent) => {
        await accumulator;
        return TransactionService.create({
          title: transaction.title,
          type: transaction.type,
          value: transaction.value,
          category: transaction.category,
        });
      },
      Promise.resolve(),
    );

    await fs.promises.unlink(csvFilePath);

    return transactions;
  }

}
