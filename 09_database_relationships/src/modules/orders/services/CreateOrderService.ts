import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProductRequest {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  productsReq: IProductRequest[];
}

@injectable()
class CreateProductService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, productsReq }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer doest not exist');
    }

    const productsIds = productsReq.map(product => {
      return { id: product.id };
    });

    const productsOfThisOrder = await this.productsRepository.findAllById(
      productsIds,
    );

    if (productsOfThisOrder.length < 1) {
      throw new AppError('These products do not exist');
    }

    const checkQuantities = productsOfThisOrder.find(productFromDB => {
      const unsuficientQttProduct = productsReq.find(
        productFromReq => productFromDB.quantity < productFromReq.quantity,
      );
      return unsuficientQttProduct;
    });

    if (checkQuantities) {
      throw new AppError('insufficient quantities on stock');
    }

    const products = productsOfThisOrder.map(product => {
      const productForQuantity = productsReq.find(
        productFromReq => productFromReq.id === product.id,
      );

      const correctQuantity = productForQuantity?.quantity;

      if (!correctQuantity) {
        throw new Error('Wrong quantity');
      }

      return {
        product_id: product.id,
        price: product.price,
        quantity: correctQuantity,
      };
    });

    const order = await this.ordersRepository.create({
      customer,
      products,
    });

    const productsToBeupdated = products.map(product => {
      return {
        id: product.product_id,
        quantity: product.quantity,
      };
    });

    await this.productsRepository.updateQuantity(productsToBeupdated);

    return order;
  }
}

export default CreateProductService;
