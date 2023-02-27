import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { plainToInstance } from 'class-transformer';

export class MysqlBaseService<Entity extends BaseEntity, Dto> {
  constructor(protected repo: Repository<Entity>) {}

  async save(data: Dto): Promise<any> {
    const dataNew = await this.repo.save(data as any);
    // return plainToInstance(Dto, dataNew, {
    //   excludeExtraneousValues: true,
    // });
    return dataNew;
  }

  async findAll(
    search?: string,
    page: number = 1,
    totalRow: number = 1,
  ): Promise<any[]> {
    try {
      let _response: Object = [];
      const take = totalRow || 2;
      const skip = (page - 1) * totalRow;
      const [result, total] = await this.repo.findAndCount({
        take: take,
        skip: skip,
      });

      _response = result;
      return {
        data: _response,
        count: total,
      } as any;
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const data = await this.repo.findOne({
        where: {
          id: id as any,
        },
      });
      // return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: number, user: Dto): Promise<any> {
    try {
      const userold = await this.findOne(id);
      if (!userold) return 'user not found';
      //   return plainToInstance(Dto, user, { excludeExtraneousValues: true });
      //   user.firstName && (userold.firstName = user.firstName);
      //   user.lastName && (userold.lastName = user.lastName);
      //   user.avatar && (userold.avatar = user.avatar);
      //   user.description && (userold.description = user.description);
      //   user.role && (userold.role = user.role);
      //   user.age && (userold.age = user.age);
      //   const userNew = await this.repo.save(userold);

      const updateStatus = await this.repo.update(id, user as any);
      return 'success';
    } catch (err) {
      console.log(err);
    }
  }

  async softDeleteOneById(id: number): Promise<any> {
    try {
      const userold = await this.repo.findOne({
        where: {
          id: id as any,
        },
      });
      console.log(userold);
      if (!userold) return 'Delete user successfully';
      const status = await this.repo.softDelete(id);
      return status;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFocreById(id: number): Promise<any> {
    try {
      const userold = await this.repo.findOne({
        where: {
          id: id as any,
        },
        withDeleted: true,
      });
      console.log(userold);
      if (!userold) return 'Delete user force successfully';
      const status = await this.repo.delete(id);
      return status;
    } catch (err) {
      console.log(err);
    }
  }

  async restoreById(id: number): Promise<any> {
    try {
      const userold = await this.repo.findOne({
        where: {
          id: id as any,
        },
        withDeleted: true,
      });
      if (!userold) return 'Restore user soft successfully';
      const status = await this.repo.restore(id);
      return status;
    } catch (err) {
      console.log(err);
    }
  }
}
