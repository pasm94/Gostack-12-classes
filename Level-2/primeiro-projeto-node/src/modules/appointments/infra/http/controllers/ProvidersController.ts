import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '../../../services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });

    const providersWithoutPassword = providers?.filter(
      provider => delete provider.password,
    );

    return response.json(providersWithoutPassword);
  }
}
