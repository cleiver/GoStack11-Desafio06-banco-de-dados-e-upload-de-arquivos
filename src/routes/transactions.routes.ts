import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import uploadConfig from '../config/upload';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const repository = getCustomRepository(TransactionsRepository);

  const transactions = await repository.find();
  const balance = await repository.getBalance();

  // delete transactions.map(transaction => {
  //   delete transaction.created_at;
  //   delete transaction.updated_at;
  //   delete transaction.category_id;
  //   delete transaction.category.created_at;
  //   delete transaction.category.updated_at;

  //   return transaction;
  // });

  return response.json({ transactions, balance })
});

transactionsRouter.post('/', async (request, response) => {
  const { title, type, value, category } = request.body;

  const Transactionervice = new CreateTransactionService();

  const transaction = await Transactionervice.create({ title, type, value, category });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const deleteTransaction = new DeleteTransactionService();

  const id = request.params.id;
  await deleteTransaction.execute({ id });

  return response.send();

});

transactionsRouter.post('/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactions = new ImportTransactionsService();

    const transactions = await importTransactions.execute({ filename: request.file.filename });

    return response.json(transactions);
  });

export default transactionsRouter;
