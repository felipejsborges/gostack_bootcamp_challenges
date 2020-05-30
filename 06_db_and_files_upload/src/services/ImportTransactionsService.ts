import { getCustomRepository, getRepository } from 'typeorm';
import csvParse from 'csv-parse';
import fs from 'fs';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
// import AppError from '../errors/AppError';

interface Lines {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(csvFilePath: string): Promise<Transaction[]> {
    // const csvData = await loadCSV(csvFilename);
    const categoriesRepository = getRepository(Category);

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      from_line: 2,
      // ltrim: true,
      // rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: Lines[] = [];

    const categoriesCSVTitles: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );
      // for each line, I use map and, for each cel (separated by comma) I set the name title, tehen type, then value...

      if (!title || !type || !value) return;

      categoriesCSVTitles.push(category);
      lines.push({ title, type, value, category });
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    const categoriesDb = await categoriesRepository.find();
    const categoriesDbTitles = categoriesDb.map(category => category.title);

    const categoriesCSVTitlesNeedToRegister = categoriesCSVTitles
      .filter(category => !categoriesDbTitles.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const categoriesCSVRegistered = categoriesRepository.create(
      categoriesCSVTitlesNeedToRegister.map(title => ({
        title,
      })),
    );

    await categoriesRepository.save(categoriesCSVRegistered);

    const allCategoriesRegistered = [
      ...categoriesCSVRegistered,
      ...categoriesDb,
    ];

    const transactions = transactionsRepository.create(
      lines.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: allCategoriesRegistered.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    await transactionsRepository.save(transactions);

    await fs.promises.unlink(csvFilePath);

    return transactions;
  }
}

export default ImportTransactionsService;
