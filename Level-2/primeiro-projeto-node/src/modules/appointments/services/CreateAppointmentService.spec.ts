import AppError from '../../../shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '2342342',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('2342342');
  });

  it('should not be able to create more than one appointment in the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '2342342',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '2342342',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
