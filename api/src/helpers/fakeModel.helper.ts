import { randomUUID } from 'crypto';

export class FakeModel<T = any> {
  private entities: (T & { _id: string })[] = [];

  create(data: T & { _id?: string }) {
    const newEntity = {
      ...data,
      _id: data._id || randomUUID(),
    };

    this.entities.push(newEntity);

    return newEntity;
  }

  updateOne(findOptions: Partial<T>, data: Partial<T>) {
    const entityIndex = this.entities.findIndex((entity) => {
      return Object.keys(findOptions).reduce((acc, cur) => {
        return acc && findOptions[cur] === entity[cur];
      }, true);
    });

    this.entities[entityIndex] = {
      ...this.entities[entityIndex],
      ...data,
    };

    return this.entities[entityIndex];
  }

  deleteOne(findOptions: Partial<T>) {
    const entityIndex = this.entities.findIndex((entity) => {
      return Object.keys(findOptions).reduce((acc, cur) => {
        return acc && findOptions[cur] === entity[cur];
      }, true);
    });

    this.entities.splice(entityIndex, 1);
  }

  deleteMany(findOptions: Partial<T>) {
    if (!findOptions || Object.keys(findOptions).length === 0) {
      this.entities = [];
    }

    this.entities = this.entities.filter((entity) => {
      return Object.keys(findOptions).reduce((acc, cur) => {
        return acc && findOptions[cur] !== entity[cur];
      }, true);
    });
  }

  find(findOptions?: Partial<T>) {
    if (!findOptions || Object.keys(findOptions).length === 0) {
      return this.entities;
    }

    return this.entities.filter((entity) => {
      return Object.keys(findOptions).reduce((acc, cur) => {
        return acc && findOptions[cur] === entity[cur];
      }, true);
    });
  }

  findOne(findOptions: Partial<T>) {
    return this.entities.find((entity) => {
      return Object.keys(findOptions).reduce((acc, cur) => {
        return acc && findOptions[cur] === entity[cur];
      }, true);
    });
  }
}
