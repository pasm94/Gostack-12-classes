import AppError from '../../../shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 20, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 0, 20, 13),
      provider_id: '2342342',
      user_id: '131231',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('2342342');
  });

  it('should not be able to create more than one appointment in the same time', async () => {
    const appointmentDate = new Date(2099, 0, 20, 13);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '2342342',
      user_id: '131231',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '2342342',
        user_id: '131231',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 20, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 0, 20, 11),
        provider_id: '2342342',
        user_id: '131231',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments with same user as provider ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 20, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 0, 20, 13),
        provider_id: '123test',
        user_id: '123test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments before 8:00am and after 17:00pm ', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2099, 0, 20, 7),
        provider_id: 'prov-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2099, 0, 20, 18),
        provider_id: 'prov-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
