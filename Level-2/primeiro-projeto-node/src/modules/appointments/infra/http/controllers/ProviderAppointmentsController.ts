import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '../../../services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppointment = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointment.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(appointments);
  }
}
