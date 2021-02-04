import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'testFile.jpg',
    });

    expect(user.avatar).toBe('testFile.jpg');
  });

  it('should not be able to update user avatar if user is not authenticated', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existent-user',
        avatarFilename: 'testFile.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete user avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    // armazena a funcao deleteFile em fakeStorageProvider e espiona se foi executada

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'testFile.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'testFile2.jpg',
    });

    expect(deleteFile).toBeCalledWith('testFile.jpg');
    expect(user.avatar).toBe('testFile2.jpg');
  });
});
