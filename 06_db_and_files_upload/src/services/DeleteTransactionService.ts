import { getCustomRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const idIsUuid = isUuid(id);

    if (!idIsUuid) {
      throw new AppError('This is not a valid ID.');
    }

    const transaction = await transactionsRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new AppError('This ID does not exist');
    }
    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
